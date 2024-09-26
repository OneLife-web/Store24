import { NextResponse } from "next/server";
import Stripe from "stripe";
import getRawBody from "raw-body";
import { connectToDb } from "@/utils/config/mongodb";
import Order from "@/utils/models/Order"; // Assuming you have an Order model for MongoDB
import { Readable } from "stream";

// Helper function to convert a Web stream (ReadableStream) to a Node.js stream
function convertToNodeReadable(webStream: ReadableStream<Uint8Array>): Readable {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(Buffer.from(value));
      }
    },
  });
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// Webhook handler
export async function POST(req: Request) {
  if (!req.body) {
    return new NextResponse(JSON.stringify({ error: "Request body is missing" }), { status: 400 });
  }

  // Convert the Web stream to Node.js stream
  const nodeStream = convertToNodeReadable(req.body);

  // Ensure content-length is valid and fallback to 0 if not provided
  const contentLength = req.headers.get("content-length");
  const length = contentLength ? parseInt(contentLength, 10) : 0;

  // Extract raw body using getRawBody and pass the correct options
  const payload = await getRawBody(nodeStream, {
    length, // Safely pass the content length
    encoding: 'utf-8', // Assuming you're working with a UTF-8 encoded payload
  });

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, webhookSecret!);
  } catch (err) {
    console.error("Error verifying webhook signature", err);
    return new NextResponse(JSON.stringify({ error: "Webhook verification failed" }), { status: 400 });
  }

  // Handle the `checkout.session.completed` event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve line items using Stripe's API
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Connect to the database
    await connectToDb();

    // Create an order in your database
    const order = await Order.create({
      userId: session.metadata?.userId,
      items: lineItems.data, // Save the line items
      total: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents to dollars
      paymentStatus: session.payment_status,
      stripeSessionId: session.id,
      createdAt: new Date(),
      orderStatus: "processing", // Default status to "processing"
    });

    console.log("Order created successfully:", order);
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
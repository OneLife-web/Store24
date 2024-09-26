import { NextResponse } from "next/server";
import Stripe from "stripe";
import getRawBody from "raw-body";
import { connectToDb } from "@/utils/config/mongodb";
import Order from "@/utils/models/Order"; // Assuming you have an Order model for MongoDB

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// Webhook handler
export async function POST(req: Request) {  // Change to `Request` type
  const payload = await getRawBody(req.body); // Use req.body instead of rawBody(req)
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
// Webhook handler (app/api/webhook/route.ts)
import { NextResponse } from "next/server";
import Stripe from "stripe";
import getRawBody from "raw-body";
import { connectToDb } from "@/utils/config/mongodb";
import Order from "@/utils/models/Order";
import { Readable } from "stream";

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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  console.log("Webhook received");

  if (!req.body) {
    console.error("Request body is missing");
    return new NextResponse(JSON.stringify({ error: "Request body is missing" }), { status: 400 });
  }

  const nodeStream = convertToNodeReadable(req.body);
  const contentLength = req.headers.get("content-length");
  const length = contentLength ? parseInt(contentLength, 10) : 0;

  try {
    const payload = await getRawBody(nodeStream, {
      length,
      encoding: 'utf-8',
    });

    console.log("Payload received:", payload.toString());

    const sig = req.headers.get("stripe-signature");
    console.log("Stripe signature:", sig);

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log("Webhook secret available:", !!webhookSecret);

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig!, webhookSecret!);
      console.log("Event constructed successfully:", event.type);
    } catch (err) {
      console.error("Error verifying webhook signature", err);
      return new NextResponse(JSON.stringify({ error: "Webhook verification failed" }), { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      console.log("Checkout session completed event received");
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Session ID:", session.id);

      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log("Line items retrieved:", lineItems.data.length);

        await connectToDb();
        console.log("Connected to database");

        const order = await Order.create({
          userId: session.metadata?.userId,
          items: lineItems.data,
          total: session.amount_total ? session.amount_total / 100 : 0,
          paymentStatus: session.payment_status,
          stripeSessionId: session.id,
          createdAt: new Date(),
          orderStatus: "processing",
        });

        console.log("Order created successfully:", order);
      } catch (error) {
        console.error("Error processing checkout session:", error);
      }
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// Rest of the code remains unchanged...
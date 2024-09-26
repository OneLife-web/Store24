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
  if (!req.body) {
    return new NextResponse(JSON.stringify({ error: "Request body is missing" }), { status: 400 });
  }

  const nodeStream = convertToNodeReadable(req.body);
  const contentLength = req.headers.get("content-length");
  const length = contentLength ? parseInt(contentLength, 10) : 0;

  const payload = await getRawBody(nodeStream, {
    length,
    encoding: 'utf-8',
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    await connectToDb();

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
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
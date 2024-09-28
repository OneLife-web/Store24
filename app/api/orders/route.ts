import { connectToDb } from "@/utils/config/mongodb";
import OrderModel from "@/utils/models/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDb();

  try {
    const orderData = await req.json();
    const order = new OrderModel(orderData);
    await order.save();

    return NextResponse.json({ order, status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order", status: 500 });
  }
}

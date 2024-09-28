import { connectToDb } from "@/utils/config/mongodb";
import OrderModel from "@/utils/models/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDb();

  try {
    const orderData = await req.json();
    const order = new OrderModel(orderData);
    const savedOrder = await order.save();

    // Check if savedOrder is successful
    if (savedOrder) {
      return NextResponse.json({ order: savedOrder, status: 200 });
    } else {
      return NextResponse.json({ error: "Order not saved", status: 400 });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order", status: 500 });
  }
}
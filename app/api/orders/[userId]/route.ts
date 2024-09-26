// app/api/orders/[userId]/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/config/mongodb";
import Order from "@/utils/models/Order";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  await connectToDb();
  
  try {
    const orders = await Order.find({ userId: params.userId }).populate('items.productId');
    if (!orders.length) {
      return new NextResponse(JSON.stringify({ message: "No orders found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
  }
}
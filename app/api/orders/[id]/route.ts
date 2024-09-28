import { NextResponse } from "next/server";
import mongoose from "mongoose";
import OrderModel from "@/utils/models/Order";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Assuming you have a way to retrieve the userId, e.g., from the session or token
    const userId = req.headers.get("user-id"); // Example: User ID from headers (modify based on your auth strategy)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await OrderModel.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if the order belongs to the current user
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this order" },
        { status: 403 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { status } = await req.json();
    const userId = req.headers.get("user-id"); // Example: User ID from headers (modify based on your auth strategy)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await OrderModel.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if the order belongs to the current user
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this order" },
        { status: 403 }
      );
    }

    // Update the order status
    order.status = status;
    const updatedOrder = await order.save();

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { connectToDb } from "@/utils/config/mongodb";
import Cart from "@/utils/models/Cart";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await connectToDb();

  try {
    const userId = params.userId;

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "UserId is required" }), {
        status: 400,
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return new NextResponse(
        JSON.stringify({ message: "Cart is empty or does not exist" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch cart" }), {
      status: 500,
    });
  }
}

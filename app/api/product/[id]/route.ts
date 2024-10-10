import { connectToDb } from "@/utils/config/mongodb";
import { Product } from "@/utils/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDb();
    const product = await Product.findById(id).populate({
      path: "reviews",
      populate: { path: "user", select: "name" },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Convert the Mongoose document to a plain JavaScript object
    const plainProduct = JSON.parse(JSON.stringify(product));

    return NextResponse.json({ product: plainProduct }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

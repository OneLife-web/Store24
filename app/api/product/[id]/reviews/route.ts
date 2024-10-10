import { connectToDb } from "@/utils/config/mongodb";
import { Product } from "@/utils/models/Product";
import { Review } from "@/utils/models/Review";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  await connectToDb();

  try {
    const product = await Product.findById(productId).populate("reviews");

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const reviews = await Review.find({ _id: { $in: product.reviews } });

    return NextResponse.json({ reviews });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Fallback for non-standard errors
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

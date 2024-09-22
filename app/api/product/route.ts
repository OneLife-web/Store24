import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/config/mongodb";
import { Product } from "@/utils/models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDb();
    const products = await Product.find({});

    if (!products) {
      return NextResponse.json({ error: "No product found" }, { status: 404 });
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

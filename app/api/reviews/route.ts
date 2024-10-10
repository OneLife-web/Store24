import { connectToDb } from "@/utils/config/mongodb";
import { Product } from "@/utils/models/Product";
import { Review } from "@/utils/models/Review";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { productId, userId, rating, comment } = await request.json();

  // Connect to the database
  await connectToDb();

  try {
    // Create a new review
    const review = new Review({
      user: userId,
      rating,
      comment,
    });

    // Save review
    await review.save();

    // Find the product and add the review to the product
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.reviews.push(review._id);
    product.totalReviews = product.reviews.length;

    // Calculate new average rating
    const totalRatings = await Review.aggregate([
      { $match: { _id: { $in: product.reviews } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    product.averageRating = totalRatings[0]?.avgRating || 0;

    // Save updated product
    await product.save();

    return NextResponse.json({ message: "Review added successfully", product });
  } catch (error) {
    // Typecasting the error as an instance of Error
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

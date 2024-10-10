import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

const productSchema = new Schema(
  {
    images: [
      {
        url: { type: String, required: true }, // Ensure URL is required
        caption: { type: String, required: true }, // Ensure caption is required
      },
    ],
    videos: [
      {
        url: { type: String }, // Ensure URL is required
        caption: { type: String }, // Ensure caption is required
      },
    ], // Add this line
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    features: [String],
    whyNeedThis: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    characteristics: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // references to reviews
    averageRating: { type: Number, default: 0 }, // average product rating
    totalReviews: { type: Number, default: 0 }, // total number of reviews
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

import { Schema, model, models } from "mongoose";

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

const Product = models.Product || model("Product", productSchema);

// Define the schemas for banner and promotion
const BannerSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
});

const PromotionSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to the Product model
});

// Define the Settings schema that includes banner and promotion
const SettingsSchema = new Schema({
  banner: {
    type: BannerSchema,
    required: true,
  },
  promotion: {
    type: PromotionSchema,
    required: true,
  },
});

// Create the model
export const Settings = models.Settings || model("Settings", SettingsSchema);

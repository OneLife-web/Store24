import { Schema, model, models, Document } from "mongoose";

// Define the interface for banner
export interface IBanner extends Document {
  title: string;
  link: string;
}

// Define the interface for the Settings document
export interface ISettings extends Document {
  banner: IBanner;
  promotion: IPromotion;
}

// Define the interface for promotion
export interface IPromotion extends Document {
  productId: Schema.Types.ObjectId; // Reference to the Product
}

// Define the schemas for banner and promotion
const BannerSchema = new Schema<IBanner>({
  title: { type: String, required: true },
  link: { type: String, required: true },
});

const productSchema = new Schema(
  {
    images: [String],
    title: { type: String, required: true },
    price: { type: Number, required: true },
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
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

const PromotionSchema = new Schema<IPromotion>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to the Product model
});

// Define the Settings schema that includes banner and promotion
const SettingsSchema = new Schema<ISettings>({
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
export const Settings =
  models.Settings || model<ISettings>("Settings", SettingsSchema);
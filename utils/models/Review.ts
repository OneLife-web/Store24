import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // reference to User schema
    rating: { type: Number, required: true, min: 1, max: 5 }, // rating between 1 and 5
    comment: { type: String, required: true }, // review comment
    date: { type: Date, default: Date.now }, // review date
  },
  { timestamps: true }
);

export const Review = models.Review || model("Review", reviewSchema);

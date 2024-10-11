import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  color: {
    type: String,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartItemSchema], // Array of CartItem
  totalPrice: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);

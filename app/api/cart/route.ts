import { connectToDb } from "@/utils/config/mongodb";
import Cart from "@/utils/models/Cart";
import { NextResponse } from "next/server";

interface CartItem {
  productId: string;
  productImage: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartRequest {
  userId: string;
  productId?: string;
  productImage: string;
  name?: string;
  price?: number;
  quantity?: number;
}

// Add item to cart
export async function POST(req: Request) {
  await connectToDb();

  try {
    const {
      userId,
      productId,
      productImage,
      name,
      price,
      quantity,
    }: CartRequest = await req.json();

    // Ensure a valid quantity (default to 1 if not provided)
    const itemQuantity = quantity ?? 1;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        items: [{ productId, productImage, name, price, quantity: itemQuantity }],
        totalPrice: price! * itemQuantity,
      });
    } else {
      // Check if the product is already in the cart
      const existingItem = cart.items.find(
        (item: CartItem) => item.productId.toString() === productId
      );

      if (existingItem) {
        // Update quantity if the product exists
        existingItem.quantity += itemQuantity;
      } else {
        // Add the new item to the cart
        cart.items.push({ productId, name, price, quantity: itemQuantity });
      }

      // Update total price
      cart.totalPrice = cart.items.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );
    }

    await cart.save();
    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error); // Log the error
    return new NextResponse(
      JSON.stringify({ error: "Failed to add item to cart" }),
      { status: 500 }
    );
  }
}

// Update item in cart
export async function PUT(req: Request) {
  await connectToDb();

  try {
    const { userId, productId, quantity }: CartRequest = await req.json();

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const item = cart.items.find(
        (item: CartItem) => item.productId.toString() === productId
      );
      if (item) {
        item.quantity = quantity!;

        // Update total price
        cart.totalPrice = cart.items.reduce(
          (total: number, item: CartItem) => total + item.price * item.quantity,
          0
        );

        await cart.save();
        return new NextResponse(JSON.stringify(cart), { status: 200 });
      }
    }

    return new NextResponse(
      JSON.stringify({ error: "Item not found in cart" }),
      { status: 404 }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({ error: "Failed to update cart" }),
      { status: 500 }
    );
  }
}

// Delete item from cart
export async function DELETE(req: Request) {
  await connectToDb();

  try {
    const { userId, productId }: CartRequest = await req.json();

    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(
        (item: CartItem) => item.productId.toString() !== productId
      );

      // Update total price
      cart.totalPrice = cart.items.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );

      await cart.save();
      return new NextResponse(JSON.stringify(cart), { status: 200 });
    }

    return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
      status: 404,
    });
  } catch {
    return new NextResponse(
      JSON.stringify({ error: "Failed to remove item from cart" }),
      { status: 500 }
    );
  }
}

"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  totalPrice: number;
  addItemToCart: (item: CartItem, userId: string) => Promise<void>;
  updateItemInCart: (
    productId: string,
    quantity: number,
    userId: string
  ) => Promise<void>;
  removeItemFromCart: (productId: string, userId: string) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const userId = session?.id;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fetch cart and cart total from the API
  const fetchCart = async (userId: string) => {
    try {
      const response = await fetch(`/api/cart/${userId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.items || []); // Update cart state
      setTotalPrice(data.totalPrice || 0); // Update total price state
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addItemToCart = async (item: CartItem, userId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, userId }), // Include userId in the body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.items); // Sync cart state with response
      setTotalPrice(data.totalPrice); // Sync total price with response
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const updateItemInCart = async (
    productId: string,
    quantity: number,
    userId: string
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity, userId }), // Include userId in the body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.items); // Sync cart state with response
      setTotalPrice(data.totalPrice); // Sync total price with response
    } catch (error) {
      console.error("Failed to update cart", error);
    }
  };

  const removeItemFromCart = async (productId: string, userId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId }), // Include userId in the body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.items); // Sync cart state with response
      setTotalPrice(data.totalPrice); // Sync total price with response
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  useEffect(() => {
    if (userId) fetchCart(userId);
  }, [userId]); // Fetch cart on initial mount

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
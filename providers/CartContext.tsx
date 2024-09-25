"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface CartItem {
  productId: string;
  productImage: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  totalPrice: number;
  loadingIndex: number | null; // Track the index of the loading card
  loading: boolean; // New loading state
  addItemToCart: (item: CartItem, userId: string) => Promise<void>;
  updateItemInCart: (
    productId: string,
    quantity: number,
    userId: string
  ) => Promise<void>;
  removeItemFromCart: (
    productId: string,
    userId: string,
    index: number
  ) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const userId = session?.id;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

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
    setLoading(true); // Start loading
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

      // If operation was successful
      toast.success("Item added to cart successfully!"); // Trigger success toast
    } catch (error) {
      // Error toast
      toast.error("Failed to add item to cart.");
      console.error("Failed to add item to cart", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const updateItemInCart = async (
    productId: string,
    quantity: number,
    userId: string
  ) => {
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // End loading
    }
  };

  const removeItemFromCart = async (
    productId: string,
    userId: string,
    index: number
  ) => {
    setLoadingIndex(index); // Start loading for the specific card
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

      // Success toast
      toast.success("Item removed from cart!");
    } catch (error) {
      // Error toast
      toast.error("Failed to remove item from cart.");
      console.error("Failed to remove item from cart", error);
    } finally {
      setLoadingIndex(null); // End loading
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
        loadingIndex,
        loading, // Provide the loading state to the context
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

"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

// Define the types for order details and cart items
interface CartItem {
  name: string;
  quantity: number;
}

interface OrderDetails {
  firstName: string;
  lastName: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  orderId: string;
  cart: CartItem[];
}

const SuccessPage = () => {
  const { data: session } = useSession();
  const id = session?.id;
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    const storedOrderId = localStorage.getItem("orderId");
    if (storedOrderDetails && storedOrderId) {
      const details = JSON.parse(storedOrderDetails);
      setOrderDetails(details);
      setOrderId(storedOrderId); // Save orderId from localStorage
    }
  }, []);

  useEffect(() => {
    const updateOrderStatus = async () => {
      if (orderId && id) {
        try {
          const userId = id; // Ensure this is the correct user ID
          const response = await fetch(`/api/orders/${orderId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "user-id": userId, // Send the userId in headers
            },
            body: JSON.stringify({ status: "processing" }), // Update status to 'processing'
          });

          if (!response.ok) {
            throw new Error("Failed to update order status");
          }

          // Successfully updated order, remove localStorage data
          localStorage.removeItem("orderDetails");
          localStorage.removeItem("orderId");

          // Delete the cart
          const res = await fetch(`/api/cart/${userId}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete cart");
          }
        } catch (error) {
          console.error("Error updating order status or deleting cart:", error);
        }
      }
    };

    updateOrderStatus();
  }, [orderId, id]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {orderDetails && (
        <div>
          <h2>Order Summary:</h2>
          <p>
            Name: {orderDetails.firstName} {orderDetails.lastName}
          </p>
          <p>
            Address: {orderDetails.street} {orderDetails.apt},{" "}
            {orderDetails.city}, {orderDetails.state}, {orderDetails.zip},{" "}
            {orderDetails.country}
          </p>
          <p>Phone: {orderDetails.phone}</p>
          <h3>Items:</h3>
          <ul>
            {orderDetails.cart.map((item: CartItem, index: number) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;

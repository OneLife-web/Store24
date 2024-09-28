"use client";
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
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      const details = JSON.parse(storedOrderDetails);
      setOrderDetails(details);
      setOrderId(details.orderId); // Ensure the orderId is saved in localStorage when creating the order
      localStorage.removeItem("orderDetails");
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      const updateOrderStatus = async () => {
        const userId = "some-user-id"; // Fetch this from your session or auth state
        const response = await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "user-id": userId, // Send the userId in headers
          },
          body: JSON.stringify({ status: "processing" }), // Update status to 'processing'
        });

        if (!response.ok) {
          console.error("Failed to update order status");
        }
      };

      updateOrderStatus();
    }
  }, [orderId]);

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
            {orderDetails.cart.map((item: any, index: number) => (
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

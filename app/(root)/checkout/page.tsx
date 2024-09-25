// app/checkout/page.tsx
'use client';
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            name: "Product Name",
            image: "https://example.com/image.jpg", // Replace with your product image URL
            price: 20.0, // Product price in dollars
            quantity: 1,
          },
        ],
      }),
    });

    const session = await response.json();

    if (response.ok) {
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error(session.error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;

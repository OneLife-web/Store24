"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { SelectCountry } from "./CountrySelect";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, Lock } from "lucide-react";
import Input from "../Input";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutMainContainter = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isShowAccount, setisShowAccount] = useState(false);

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
            image: "https://example.com/image.jpg",
            price: 20.0,
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

  const handlechange = () => {};

  return (
    <section>
      <div className="text-sm grid gap-2 py-3 border-b">
        <div className="flex items-center justify-between">
          <p className="opacity-80">Account</p>
          <button
            onClick={() => setisShowAccount(!isShowAccount)}
            className="bg-secondary flex items-center justify-center cursor-pointer rounded-md size-6"
          >
            <ChevronDown
              size={17}
              strokeWidth={1.2}
              className="text-secondaryBg"
            />
          </button>
        </div>
        <p>{session?.user?.email}</p>
        {isShowAccount && (
          <button
            className="w-fit underline text-secondaryBg"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            Log out
          </button>
        )}
      </div>
      <div className="py-10">
        <h2 className="heading2">Delivery</h2>
        <form className="grid gap-4 mt-4">
          <SelectCountry />
          <div className="grid grid-cols-2 gap-3">
            <Input
              value=""
              className="border h-16 placeholder:text-black placeholder:font-normal"
              placeholder="First name"
              onChange={handlechange}
            />
            <Input
              value=""
              className="border h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Last name"
              onChange={handlechange}
            />
          </div>
          <Input
            value=""
            className="border h-16 placeholder:text-black placeholder:font-normal"
            placeholder="Address"
            onChange={handlechange}
          />
          <div className="grid grid-cols-3 gap-3">
            <Input
              value=""
              className="border h-16 placeholder:text-black placeholder:font-normal"
              placeholder="City"
              onChange={handlechange}
            />
            <Input
              value=""
              className="border h-16 placeholder:text-black placeholder:font-normal"
              placeholder="State"
              onChange={handlechange}
            />
            <Input
              value=""
              className="border h-16 placeholder:text-black placeholder:font-normal"
              placeholder="ZIP code"
              onChange={handlechange}
            />
          </div>
          <Input
            value=""
            className="border h-16 placeholder:text-black placeholder:font-normal"
            placeholder="Phone"
            onChange={handlechange}
          />
        </form>
      </div>

      <button
        className="bg-secondaryBg font-semibold rounded-lg w-full h-16"
        type="submit"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <p className="text-xs text-center w-fit flex items-center mx-auto gap-2 mt-3">
        <span>
          <Lock strokeWidth={1.2} size={15} />
        </span>
        Secure and encrypted
      </p>
    </section>
  );
};

export default CheckoutMainContainter;

"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { SelectCountry } from "./CountrySelect";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, CircleHelp, Lock } from "lucide-react";
import Input from "../Input";
import { useCart } from "@/providers/CartContext";
import Image from "next/image";
import PhoneNumberInput from "../PhoneInput";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutMainContainter = () => {
  const { cart, totalPrice } = useCart();
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
      console.log(stripe); // Check if this outputs a Stripe object

      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error(session.error);
    }
    setLoading(false);
  };

  const handlechange = () => {};

  return (
    <section className="bg-gray-50">
      <div className="text-sm grid gap-2 px-[3%] py-3 border-b bg-white">
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
      <div className="mt-3">
        <form className="grid gap-4 mt-4">
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Country/region</h2>
            <SelectCountry />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Contact information</h2>
            <Input
              value=""
              className="border h-14 mb-2 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="First name"
              onChange={handlechange}
            />
            <Input
              value=""
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Last name"
              onChange={handlechange}
            />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Address</h2>
            <Input
              value=""
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Street"
              onChange={handlechange}
            />
            <p className="text-xs opacity-80 mb-2">
              Enter an address with 5 - 50 characters including building or
              house number
            </p>
            <div className="grid gap-4">
              <Input
                value=""
                className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
                placeholder="Apt, suite, unit, etc (optional)"
                onChange={handlechange}
              />
              <Input
                value=""
                className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
                placeholder="State"
                onChange={handlechange}
              />
              <Input
                value=""
                className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
                placeholder="City"
                onChange={handlechange}
              />
              <Input
                value=""
                className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
                placeholder="Zip code"
                onChange={handlechange}
              />
              <Input
                value=""
                className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
                placeholder="Delivery Instructions"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Mobile number</h2>
            <PhoneNumberInput />
          </div>
        </form>
      </div>

      <div className="mt-3 px-[3%] bg-white py-7">
        <h2 className="heading2">Order Summary</h2>
        <div className="mt-10">
          <ul className="grid gap-5">
            {cart.map((item) => (
              <li key={item.productId}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-fit">
                      <Image
                        src={item.productImage}
                        width={70}
                        height={70}
                        alt="product Image"
                        className="size-[70px] object-cover rounded-xl object-center"
                      />
                      <div className="text-xs -top-2 -right-2 bg-gray-800 flex items-center justify-center text-white size-[22px] rounded-full absolute">
                        {item.quantity}
                      </div>
                    </div>
                    <p className="text-sm">{item.name}</p>
                  </div>
                  <p className="text-sm">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 mt-3">
          <div className="flex opacity-80 items-center justify-between text-sm">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex opacity-80 items-center justify-between text-sm">
            <p className="flex items-center gap-1">
              Shipping{" "}
              <span>
                <CircleHelp size={14} />
              </span>
            </p>
            <p>Free</p>
          </div>
          <div className="flex mt-2 items-center justify-between heading2">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
        </div>
      </div>
      <div className="bg-white px-[3%]">
        <button
          className="bg-secondaryBg font-semibold rounded-lg w-full h-14 lg:h-16 mt-10"
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
      </div>
    </section>
  );
};

export default CheckoutMainContainter;

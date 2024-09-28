"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { SelectCountry } from "./CountrySelect";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, CircleHelp, Loader2, Lock } from "lucide-react";
import Input from "../Input";
import { useCart } from "@/providers/CartContext";
import Image from "next/image";
import PhoneNumberInput from "../PhoneInput";

const CheckoutMainContainter = () => {
  const { cart, totalPrice } = useCart();
  const { data: userSession } = useSession();

  const [loading, setLoading] = useState(false);
  const [isShowAccount, setisShowAccount] = useState(false);

  // Form input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState("");

  const handleCheckout = async () => {
    setLoading(true);

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            firstName,
            lastName,
            street,
            apt,
            city,
            state,
            zip,
            country,
            phone,
            deliveryInstructions,
            cart,
            totalPrice,
          })
        );
      }

      // Create order before sending checkout session request
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            name: item.name,
            image: item.productImage,
            price: item.price,
            quantity: item.quantity,
          })),
          customerDetails: {
            firstName,
            lastName,
            street,
            apt,
            city,
            state,
            zip,
            country,
            phone,
            deliveryInstructions,
            email: userSession?.user?.email,
          },
          userId: userSession?.id,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        console.error("Failed to create order:", orderData.error);
        throw new Error(orderData.error || "Order creation failed");
      }

      // Save order ID to localStorage
      localStorage.setItem("orderId", orderData.order._id); // Ensure orderId is saved

      // Now send request to create checkout session
      const sessionResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            name: item.name,
            image: item.productImage,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const sessionData = await sessionResponse.json();
      if (!sessionResponse.ok) {
        console.error("Failed to create Stripe session:", sessionData.error);
        throw new Error(sessionData.error || "Stripe session creation failed");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      await stripe.redirectToCheckout({ sessionId: sessionData.id });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="text-sm grid gap-2 px-[3%] py-3 bg-white">
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
        <p>{userSession?.user?.email}</p>
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
            <SelectCountry
              selectedCountry={country} // Pass selectedCountry
              setSelectedCountry={setCountry} // Pass the setter function
            />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Contact information</h2>
            <Input
              value={firstName}
              className="border h-14 mb-2 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              value={lastName}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Address</h2>
            <Input
              value={street}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Street"
              onChange={(e) => setStreet(e.target.value)}
            />
            <Input
              value={apt}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Apt, suite, unit, etc (optional)"
              onChange={(e) => setApt(e.target.value)}
            />
            <Input
              value={state}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
            <Input
              value={city}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              value={zip}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Zip code"
              onChange={(e) => setZip(e.target.value)}
            />
            <Input
              value={deliveryInstructions}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Delivery Instructions"
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Mobile number</h2>
            <PhoneNumberInput phone={phone} setPhone={setPhone} />
          </div>
        </form>
      </div>
      {cart.length > 0 ? (
        <div className="mt-3 px-[3%] bg-white py-7">
          <h2 className="heading2">Order Summary</h2>
          {/* Render cart items here */}
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
      ) : (
        <div className="min-h-[300px] mt-3 w-full bg-white flex items-center justify-center">
          <Loader2 size={36} className="animate-spin text-secondaryBg" />
        </div>
      )}
    </section>
  );
};

export default CheckoutMainContainter;

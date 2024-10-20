"use client";
//import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
//import { loadStripe } from "@stripe/stripe-js";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import {
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Loader,
  Loader2,
  Lock,
} from "lucide-react";
import Input from "../Input";
import { useCart } from "@/providers/CartContext";
import Image from "next/image";
import PhoneNumberInput from "../PhoneInput";
import { ComboboxDemo } from "../ComboBox";
import { useRouter } from "next/navigation";
//import PayPalButton from "./PayPalButton";
import { generateOrderId } from "@/utils/helper";

// Dynamically import PaystackButton with ssr option set to false
/* const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
); */

const CheckoutMainContainter = () => {
  const [isClient, setIsClient] = useState(false);
  const { cart, totalPrice, clearCart } = useCart();
  const { data: userSession } = useSession();
  const router = useRouter();
  const id = userSession?.id;
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customerDetailsRef = useRef({
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
  });

  useEffect(() => {
    setIsClient(true);
    // Update the ref whenever the form fields change
    customerDetailsRef.current = {
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
    };
  }, [
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
    userSession?.user?.email,
  ]);

  /* const handleCheckout = async () => {
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
          total: totalPrice,
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
  }; */

  const isFormValid = () => {
    return (
      firstName !== "" &&
      lastName !== "" &&
      street !== "" &&
      city !== "" &&
      state !== "" &&
      zip !== "" &&
      deliveryInstructions !== "" &&
      country !== undefined &&
      phone !== ""
    );
  };

  const handleClearCart = () => {
    if (id) {
      clearCart(id);
    }
  };

  // Paystack public key and other options
  //const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
  const publicKey2 = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!;
  const email = userSession?.user?.email || "";
  //const amount = totalPrice * 100; // Amount in kobo (Naira is multiplied by 100)
  const amount2 = totalPrice; // Amount in kobo (Naira is multiplied by 100)
  // const reference = `order_${Math.floor(Math.random() * 1000000000 + 1)}`;
  const fullName = `${firstName} ${lastName}`;

  const config = {
    public_key: publicKey2,
    tx_ref: Date.now().toString(),
    amount: amount2, // Amount in USD or your preferred currency
    currency: "USD",
    payment_options:
      "card, banktransfer, banktransfer_ng, ussd, mobilemoneyghana, bank, wallet, applepay, googlepay, enaira, nqr",
    customer: {
      email: email,
      phone_number: phone,
      name: fullName,
    },
    customizations: {
      title: "Payment for Goods",
      description: "Flutterwave and PayPal integration",
      logo: "https://ik.imagekit.io/krr3p3joi/WhatsApp_Image_2024-09-17_at_9.36.42_PM__1_-removebg-preview.png?updatedAt=1728162862298",
    },
  };

  const fwConfig = {
    ...config,
    callback: async () => {
      closePaymentModal();
      await handleOrderConfirmation();
    },
    onClose: () => {
      //alert("Payment was not completed");
    },
  };

  /*   const paystackProps = {
    email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: async () => {
      await handleOrderConfirmation();
    },
    onClose: () => {
      alert("Payment was not completed");
    },
    reference,
  };
 */
  const handleOrderConfirmation = async () => {
    setLoading(true);

    try {
      const orderDetails = customerDetailsRef.current;
      const orderId = generateOrderId(); // Generate a custom order ID

      if (isClient && typeof window.localStorage !== "undefined") {
        window.localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            ...orderDetails,
            cart,
            totalPrice,
          })
        );
      }
      // Create an order in the backend
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
            productImage: item.productImage,
            color: item.color,
          })),
          customerDetails: orderDetails,
          userId: userSession?.id,
          total: totalPrice,
          orderId: orderId,
          packageInfo: deliveryInstructions,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        console.error("Failed to create order:", orderData.error);
        throw new Error(orderData.error || "Order creation failed");
      }
      if (isClient && typeof window !== "undefined") {
        window.localStorage.setItem("orderId", orderId);
      }
      router.push("/checkout/success");
      handleClearCart();
    } catch (error) {
      console.error("Order confirmation error:", error);
      alert("There was an error confirming your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-sm:bg-gray-100">
      {loading && (
        <div className="fixed z-[1000] top-0 bg-black/70 bottom-0 text-white right-0 left-0 h-screen flex items-center justify-center">
          <Loader className="animate-spin" size={30} />
        </div>
      )}
      <div className="text-sm grid gap-2 px-[3%] py-3 bg-white">
        <div className="flex items-center justify-between">
          <p className="opacity-80">Account</p>
          <button
            onClick={() => setisShowAccount(!isShowAccount)}
            className="bg-secondary flex items-center justify-center cursor-pointer rounded-md size-6"
          >
            {isShowAccount ? (
              <ChevronUp
                size={19}
                strokeWidth={1.2}
                className="text-secondaryBg"
              />
            ) : (
              <ChevronDown
                size={19}
                strokeWidth={1.2}
                className="text-secondaryBg"
              />
            )}
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
      <div className="max-sm:mt-3">
        <form className="grid max-sm:gap-4 max-sm:mt-4">
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Country/region</h2>
            <ComboboxDemo
              selectedCountry={country}
              setSelectedCountry={setCountry}
              required
            />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Contact information</h2>
            <Input
              required
              value={firstName}
              className="border h-14 mb-2 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              required
              value={lastName}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="bg-white px-[3%] py-3 pt-5 grid gap-2">
            <h2 className="heading2">Address</h2>
            <Input
              required
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
              required
              value={state}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
            <Input
              required
              value={city}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              required
              value={zip}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Zip code"
              onChange={(e) => setZip(e.target.value)}
            />
            <Input
              required
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
      <div className="lg:hidden">
        {cart.length > 0 ? (
          <div className="mt-3 px-[3%] bg-white py-7">
            <h2 className="heading2">Order Summary</h2>
            {/* Render cart items here */}
            <div className="mt-10">
              <ul className="grid gap-5">
                {cart.map((item) => (
                  <li key={item.productId}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 max-w-[250px]">
                        <div className="relative w-fit">
                          <Image
                            src={item.productImage}
                            width={70}
                            height={70}
                            alt="product Image"
                            className="size-[70px] min-w-[70px] object-contain rounded-xl object-center"
                          />
                          <div className="text-xs -top-2 -right-2 bg-gray-800 flex items-center justify-center text-white size-[22px] rounded-full absolute">
                            {item.quantity}
                          </div>
                        </div>
                        <p className="text-sm truncate-two-lines">
                          {item.name} - {item.color}
                        </p>
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
            {/* Paystack Button */}
            {/*  <PaystackButton
              {...paystackProps}
              disabled={!isFormValid()}
              className="paystack-button"
            /> */}
            <FlutterWaveButton
              text="Pay Online"
              disabled={!isFormValid()}
              className="paystack-button"
              {...fwConfig}
            />
            {/* <div className="my-10 relative h-[0.5px] bg-gray-300 w-full">
              <p className="text-sm bg-white px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                or Pay with
              </p>
            </div>
            <PayPalButton
              totalPrice={amount2}
              cart={cart}
              handleOrderConfirmation={handleOrderConfirmation}
              disabled={!isFormValid()}
              getCustomerDetails={() => customerDetailsRef.current}
            /> */}
            {/* <button
              className="bg-secondaryBg font-semibold rounded-lg w-full h-14 lg:h-16 mt-10"
              type="submit"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button> */}
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
      </div>
      <div className="max-lg:hidden px-[2.8%]">
        {/* Paystack Button */}
        {/* <PaystackButton
          {...paystackProps}
          disabled={!isFormValid()}
          className="paystack-button"
        /> */}
        <FlutterWaveButton
          text="Pay Online"
          disabled={!isFormValid()}
          className="paystack-button"
          {...fwConfig}
        />
        <div className="my-10 relative h-[0.5px] bg-gray-300 w-full hidden">
          <p className="text-sm bg-white px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            or Pay with
          </p>
        </div>
        {/* <PayPalButton
          totalPrice={amount2}
          cart={cart}
          handleOrderConfirmation={handleOrderConfirmation}
          disabled={!isFormValid()}
          getCustomerDetails={() => customerDetailsRef.current}
        /> */}
        {/*  <button
          className="bg-secondaryBg font-semibold rounded-lg w-full h-14 lg:h-16 mt-10"
          type="submit"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button> */}
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

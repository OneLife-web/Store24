"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the types for order details and cart items
interface CartItem {
  name: string;
  quantity: number;
  productImage: string;
  price: number;
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
  cart: CartItem[];
  totalPrice: number;
}

export default function OrderConfirm() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    const storedId = localStorage.getItem("orderId");

    if (storedOrderDetails && storedId) {
      const details = JSON.parse(storedOrderDetails);
      setOrderDetails(details);
      setOrderId(storedId);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-5 py-8 px-[3%] lg:gap-10">
        <div className="mt-20 grid justify-items-center text-center">
          <Image
            src="/confetti.png"
            alt="Logo"
            width={76}
            height={76}
            loading="lazy"
          />
          <h2 className="mb-2 mt-4 text-center font-medium text-sm lg:text-[39px]">
            Order Placed Successfully!
          </h2>
          {orderId && (
            <p className="text-center text-[10px] text-[#979797] lg:text-base lg:text-myGray">
              Order ID: #{orderId}
            </p>
          )}
        </div>
        <div className="min-w-full lg:mb-10 lg:mt-10">
          <OrderSummary
            amount={orderDetails?.totalPrice}
            orderItems={orderDetails?.cart}
          />
        </div>
        <Link
          href="/"
          className="mb-3 min-w-full bg-secondaryBg flex items-center justify-center rounded-xl border-0 p-3 font-medium text-base shadow-none lg:min-w-[600px] lg:p-5"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

const OrderSummary = ({
  amount,
  orderItems,
}: {
  amount?: number;
  orderItems?: CartItem[];
}) => {
  return (
    <div className="w-full pb-5 pt-12 lg:rounded-[20px] lg:border lg:border-[#E4E7EC] lg:px-10">
      <div className="w-full rounded-2xl border border-[#F4F4F4] lg:border-0">
        <div className="mb-3 flex items-center justify-center gap-2 pt-6 lg:block lg:pl-4 lg:pt-0">
          <p className="font-medium text-xs lg:text-base lg:text-myGray">
            Order Summary
          </p>
        </div>
        {orderItems && (
          <div className="grid gap-3 border-[#F4F4F4] p-2 lg:block lg:rounded-2xl lg:border lg:p-3 lg:px-5">
            {orderItems.map((item: CartItem) => (
              <OrderItem
                name={item.name}
                key={item.name}
                price={item.price}
                images={item.productImage}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-5 w-full rounded-[10px] border border-[#F4F4F4] p-5 px-5 lg:rounded-2xl lg:border-[#E4E7EC]">
        <div className="mb-4 flex items-center justify-between text-[10px] text-myGray lg:text-base">
          <span>Amount:</span>
          <p className="font-medium text-sm lg:text-base">${amount}</p>
        </div>
        <div className="flex items-center justify-between text-[10px] text-myGray lg:text-base">
          <span>Payment method:</span>
          <span className="font-medium">Online payment</span>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({
  name,
  images,
  price,
}: {
  name: string;
  images: string;
  price: number;
}) => {
  return (
    <div className="grid gap-3 rounded-[7.33px] border-[0.46px] border-[#F4F4F4] px-3 py-5 lg:border-0 lg:border-b lg:px-0 lg:last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 lg:max-w-[583px] lg:items-start lg:gap-5">
          <div>
            <Image
              src={images}
              alt="product image"
              width={95}
              height={95}
              loading="lazy"
              className="h-[43.5px] w-[43.52px] rounded-[10px] lg:h-[95px] lg:w-[95px] lg:rounded-3xl"
            />
          </div>
          <div className="grid gap-1">
            <p className="max-w-[194px] font-medium text-[10px] text-myGray lg:max-w-full lg:text-base">
              {name}
            </p>
          </div>
        </div>
        <div className="min-w-fit">
          <p className="font-medium text-sm text-black lg:text-[20px] lg:text-[#989898]">
            ${price}
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartSideNav from "../Navigations/CartSideNav";
import { useCart } from "@/providers/CartContext";
import { CircleHelp } from "lucide-react";

const CheckoutSideNav = () => {
  const { cart, totalPrice } = useCart();
  return (
    <aside className="max-lg:hidden max-w-xl h-screen w-full bg-secondary py-10 pl-7 lg:pr-[10%]">
      <div className="w-full flex items-center justify-center relative">
        <Link href="/" className="w-fit">
          <Image src="/logo2.png" width={130} height={130} alt="logo" />
        </Link>
        <div className="w-fit absolute right-0">
          <CartSideNav />
        </div>
      </div>
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
    </aside>
  );
};

export default CheckoutSideNav;

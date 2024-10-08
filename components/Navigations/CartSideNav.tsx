"use client";
import { useCart } from "@/providers/CartContext";
import CartContainer from "../Cart/CartContainer";
import Slider from "./Slider";
import { useState } from "react";

const CartSideNav = () => {
  const {
    cart,
    totalPrice,
    updateItemInCart,
    removeItemFromCart,
    loadingIndex,
  } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Slider
        trigger={
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="#121212"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {cart.length > 0 && (
              <div className="bg-primary text-white rounded-full flex items-center justify-center text-[10px] size-5 absolute -top-2 -right-2">
                {cart.length}
              </div>
            )}
          </div>
        }
        open={open}
        setOpen={setOpen}
      >
        <CartContainer
          cart={cart}
          totalPrice={totalPrice}
          updateItemInCart={updateItemInCart}
          removeItemFromCart={removeItemFromCart}
          loadingIndex={loadingIndex}
          setOpen={setOpen}
        />
      </Slider>
    </div>
  );
};

export default CartSideNav;

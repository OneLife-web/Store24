import { CartItem } from "@/providers/CartContext";
import { Trash2 } from "lucide-react";
import React from "react";

const CartCard = ({ item }: { item: CartItem }) => {
  const singleTotal = item.price + item.quantity;
  return (
    <div className="flex gap-4">
      <div className="flex gap-3 w-full basis-[80%]">
        <div className="size-20 bg-gray-100"></div>
        <div className="flex-grow">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="bodyText !opacity-90">${item.price}</p>
          <div className="flex items-center justify-between gap-1">
            <div className="border mt-2 border-primary w-full flex items-center gap-1 justify-between">
              <button className="basis-[33.3%] h-10 flex items-center justify-center">
                -
              </button>
              <div className="basis-[33.3%] flex items-center justify-center">
                <p className="font-semibold">{item.quantity}</p>
              </div>
              <button className="basis-[33.3%] h-10 flex items-center justify-center">
                +
              </button>
            </div>
            <button className="flex items-center justify-center px-3">
              <Trash2 strokeWidth={1.2} size={17} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold">${singleTotal}</p>
      </div>
    </div>
  );
};

export default CartCard;

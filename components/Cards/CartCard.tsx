import { CartItem } from "@/providers/CartContext";
import { Trash2 } from "lucide-react";
import React from "react";

const CartCard = ({
  item,
  userId,
  removeItem,
  increaseItem,
  decreaseItem,
}: {
  item: CartItem;
  userId: string;
  removeItem: (productId: string, userId: string) => void;
  increaseItem: (productId: string, quantity: number) => void;
  decreaseItem: (productId: string, quantity: number) => void;
}) => {
  const singleTotal = item.price * item.quantity;
  return (
    <div className="flex gap-4">
      <div className="flex gap-3 w-full basis-[80%]">
        <div className="size-20 bg-gray-100"></div>
        <div className="flex-grow">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="bodyText !opacity-90">${item.price}</p>
          <div className="flex items-center justify-between gap-1">
            <div className="border mt-2 border-primary w-full flex items-center gap-1 justify-between">
              <button
                onClick={() => decreaseItem(item.productId, item.quantity)}
                disabled={item.quantity === 1}
                className="basis-[33.3%] h-10 flex items-center justify-center"
              >
                -
              </button>
              <div className="basis-[33.3%] flex items-center justify-center">
                <p className="font-semibold">{item.quantity}</p>
              </div>
              <button
                onClick={() => increaseItem(item.productId, item.quantity)}
                className="basis-[33.3%] h-10 flex items-center justify-center"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.productId, userId)}
              className="flex items-center justify-center px-3"
            >
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

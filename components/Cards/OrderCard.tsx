import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const OrderCard = ({
  items,
  status,
  total,
}: {
  items: { name: string; image: string; price: number; quantity: number }[];
  status: "pending" | "processing" | "completed" | "failed";
  total: number;
}) => {
  return (
    <div className="bg-gray-100/80 lg:min-w-[500px] relative rounded-2xl min-h-[110px] flex items-center pl-3">
      <div className="flex items-center gap-3">
        <Image
          src={items[0].image}
          alt="product image"
          width={80}
          height={80}
          className="rounded-xl"
        />
        <div className="grid gap-1">
          {items.map((item) => (
            <div>
              <p className="max-sm:text-sm">
                {item.quantity} &times; {item.name}
              </p>
            </div>
          ))}
          <p className="font-semibold">${total}</p>
        </div>
      </div>
      <div className="w-fit absolute right-3 bottom-3">
        <p
          className={cn("w-fit rounded-full px-[10px] py-[5px]", {
            "bg-[#F8BCBC] font-clashmd text-[8px] text-[#8B1A1A]":
              status === "failed" || status === "completed", // 'failed' was corrected here
            "bg-[#BAD9F7] font-clashmd text-[8px] text-[#1673CC]":
              status === "pending",
            "bg-[#BAF7BA] font-clashmd text-[8px] text-[#1B691B]":
              status === "processing",
          })}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;

"use client";
import { updateData } from "@/types";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";

const ProductCard = ({ item }: { item: updateData }) => {
  return (
    <Link href={`/products/${item?._id}`} className="group cursor-pointer">
      <Image
        src={item?.images.length > 0 ? item?.images[0]?.url : "/google.svg"}
        alt="image"
        width={200}
        height={150}
        className="min-w-[150px] object-contain md:min-w-[200px] h-[150px]"
        unoptimized={item?.images[0]?.url?.endsWith(".webp")}
      ></Image>
      <p className="text-sm font-semibold my-2 w-fit border-b border-transparent group-hover:border-primary transition-all duration-300">
        {item?.title}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <StarFilledIcon className="text-secondaryBg size-6" />
          <p className="max-sm:text-sm">{item.averageRating.toFixed(1)}</p>
        </div>
        <p className="border-l pl-3 max-sm:text-sm">100+ Sold</p>
      </div>
      <div className="flex mt-1 gap-1 items-center">
        <p className="font-semibold text-lg">${item?.price}</p>
        <p className="line-through opacity-70 font-normal text-sm">
          ${item?.discountPrice}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

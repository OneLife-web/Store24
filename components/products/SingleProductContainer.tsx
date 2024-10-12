"use client";

import { Rating } from "react-simple-star-rating";
import { updateData } from "@/types";
import Carousel from "../Carousel";
import Image from "next/image";
import { CartItem, useCart } from "@/providers/CartContext";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ScrollspyTabs from "../ScrollableTabs";
import ShippingInfo from "../ShippingInfo";
import { Truck } from "lucide-react";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  //const [color, setColor] = useState("");
  const router = useRouter();
  const { images } = data;
  const { addItemToCart, loading } = useCart();
  const { data: session } = useSession();
  const userId = session?.id;

  const handleAddToCart = async () => {
    if (!userId) {
      router.push(
        `/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    let item: CartItem | undefined;

    if (data?._id && data?.price !== undefined) {
      item = {
        productId: data._id,
        productImage: data?.images[0]?.url || "/mydemo.jpg",
        name: data.title,
        price: data.price,
        quantity: 1, // Default to 1 when adding to cart
        //color: color,
      };

      if (item && userId) {
        await addItemToCart(item, userId); // Await if addItemToCart is a Promise
      }
    } else {
      console.error("Product ID or Price is missing");
    }
  };
  return (
    <div className="relative">
      <section className="lg:flex bg-white lg:gap-9 md:pt-10 pb-7">
        <div className="lg:min-w-[40%]">
          <Carousel images={images} />
        </div>
        <div className="w-full max-sm:px-[3%] lg:flex justify-center flex-col max-sm:mt-10">
          <div>
            <h1 className="heading1">{data?.title}</h1>
            <div className="flex items-center">
              <Rating
                initialValue={data.averageRating}
                readonly
                fillColor=""
                className="mt-[-4px] pr-1 text-secondaryBg"
                SVGclassName="inline"
                size={16}
                allowFraction
              />
              <p className="max-sm:text-base font-medium whitespace-nowrap">
                {data.averageRating.toFixed(1)}
              </p>
              <p className="max-sm:text-base ml-3 pl-3 border-l font-medium whitespace-nowrap">
                {data.quantitySold}+ <span className="ml-[2px]">Sold</span>
              </p>
            </div>
            <div className="flex gap-2 items-center mt-3">
              <p className="text-xl font-semibold">${data?.price}</p>
              <p className="text-base opacity-70 line-through">
                ${data?.discountPrice}
              </p>
              {data?.price && data?.discountPrice && (
                <div className="flex items-center gap-1 ml-2 text-sm font-semibold bg-secondaryBg rounded-lg text-white px-2 py-1">
                  <Image
                    src="/tag.svg"
                    width={22}
                    height={22}
                    alt="price tag"
                  />
                  <span className="">SAVE</span>
                  {Math.abs(
                    Math.round(
                      ((data.discountPrice - data.price) / data.discountPrice) *
                        100
                    )
                  )}
                  %
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 px-[3%] pt-7 pb-3">
            <Truck strokeWidth={1.2} size={22} />
            <p className="font-medium max-sm:text-xs">Free shipping</p>
          </div>
          <ShippingInfo />
        </div>
      </section>
      <section>
        <ScrollspyTabs data={data} />
      </section>
      <div className="fixed border-t z-50 bottom-0 bg-white right-0 left-0 px-[3%] py-5">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="bg-secondaryBg rounded-full flex items-center justify-center w-full py-3 font-semibold my-4 transform transition-transform hover:scale-105"
        >
          {loading ? <Loader2 className="animate-spin" /> : "BUY NOW"}
        </button>
      </div>
    </div>
  );
};

export default SingleProductContainer;

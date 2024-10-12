"use client";

import { Rating } from "react-simple-star-rating";
import { updateData } from "@/types";
import Carousel from "../Carousel";
import Image from "next/image";
//import { useCart } from "@/providers/CartContext";
//import { useSession } from "next-auth/react";
//import { Loader2, Truck } from "lucide-react";
//import { useRouter } from "next/navigation";
//import { cn } from "@/lib/utils";
//import { useState } from "react";
//import toast from "react-hot-toast";
import ScrollspyTabs from "../ScrollableTabs";
import ShippingInfo from "../ShippingInfo";
import { Truck } from "lucide-react";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  //const [color, setColor] = useState("");
  //const router = useRouter();
  const { images } = data;
  // const { addItemToCart, loading } = useCart();
  // const { data: session } = useSession();
  //const userId = session?.id;

  /*  const handleAddToCart = async () => {
    if (!userId) {
      router.push(
        `/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    if (!color) {
      toast.error("Select your preferred color");
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
        color: color,
      };

      if (item && userId) {
        await addItemToCart(item, userId); // Await if addItemToCart is a Promise
      }
    } else {
      console.error("Product ID or Price is missing");
    }
  }; */
  return (
    <div>
      <section className="lg:flex bg-white lg:gap-9 pb-7">
        <div className="lg:min-w-[40%]">
          <Carousel images={images} />
        </div>
        <div className="w-full max-sm:px-[3%] lg:flex flex-col items-center max-sm:mt-10">
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
            <Truck strokeWidth={1.2} size={28} />
            <p className="font-medium max-sm:text-xs">Free shipping</p>
          </div>
          <ShippingInfo />
        </div>
      </section>
      <section>
        <ScrollspyTabs data={data} />
      </section>
    </div>
  );
};

export default SingleProductContainer;

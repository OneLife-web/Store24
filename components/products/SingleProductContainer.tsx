"use client";

import { Rating } from "react-simple-star-rating";
import ReactPlayer from "react-player";
import { updateData } from "@/types";
import Carousel from "../Carousel";
import Image from "next/image";
import { CartItem, useCart } from "@/providers/CartContext";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AccordionDemo from "../Accordion";
import { formatDate } from "@/utils/helper";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import ScrollspyTabs from "../ScrollableTabs";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  const [color, setColor] = useState("");
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
  };
  return (
    <div className="pb-20">
      <section className="lg:flex lg:gap-9 pb-10">
        <div className="lg:min-w-[40%]">
          <Carousel images={images} />
        </div>
        <div className="w-full max-sm:px-[3%] lg:flex items-center max-sm:mt-10">
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
        </div>
      </section>
      <ScrollspyTabs />
      <section className="py-10 max-sm:px-[3%] border-t">
        <h2 className="heading3">Why You Need This</h2>
        <ul className="grid gap-4 py-5 list-disc pl-8 bodyText !opacity-100">
          {data.whyNeedThis.map((item, index) => (
            <li key={index}>
              <span className="font-semibold">{item.title}:</span>
              <p className="opacity-85">{item.content}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="py-10 max-sm:px-[3%]">
        <h2 className="heading3">Characteristics</h2>
        <ul className="grid gap-4 py-5 list-disc pl-8 bodyText !opacity-100">
          {data.characteristics.map((item, index) => (
            <li key={index}>
              <span className="font-semibold">{item.title}:</span>
              <p className="opacity-85">{item.content}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="py-10 max-sm:px-[3%]">
        <h2 className="heading3">Product Reviews and Ratings</h2>
        <div className="flex gap-3 items-center py-3">
          <h1 className="heading1 !font-normal">
            {data.averageRating.toFixed(1)}
          </h1>
          <Rating
            initialValue={data.averageRating}
            readonly
            fillColor=""
            className="text-secondaryBg"
            SVGclassName="inline"
            size={30}
            allowFraction
          />
        </div>
        <div>
          {data.reviews && data.reviews.length > 0 && (
            <div>
              {data.reviews.map((review) => (
                <div
                  key={review._id}
                  className="lg:max-w-[450px] grid gap-2 border-b border-black/25 py-8"
                >
                  <div className="flex text-sm opacity-70 items-center justify-between">
                    <p>{review?.user?.name}</p>
                    <p>{formatDate(new Date(review?.date))}</p>
                  </div>
                  <Rating
                    initialValue={review.rating}
                    readonly
                    fillColor=""
                    className="text-secondaryBg"
                    SVGclassName="inline"
                    size={16}
                    allowFraction
                  />
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-14 max-sm:px-[3%]">
        <AccordionDemo faqs={data.faqs} />
      </section>
    </div>
  );
};

export default SingleProductContainer;

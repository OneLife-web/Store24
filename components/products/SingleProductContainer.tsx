"use client";

import { Rating } from "react-simple-star-rating";
import { updateData } from "@/types";
import Carousel from "../Carousel";
import Image from "next/image";
import { CartItem, useCart } from "@/providers/CartContext";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AccordionDemo from "../Accordion";

const SingleProductContainer = ({ data }: { data: updateData }) => {
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
      };

      if (item && userId) {
        await addItemToCart(item, userId); // Await if addItemToCart is a Promise
      }
    } else {
      console.error("Product ID or Price is missing");
    }
  };
  return (
    <div className="max-sm:px-[3%] pt-7 pb-20">
      <section className="lg:flex lg:gap-9 pb-10">
        <div className="lg:min-w-[60%]">
          <Carousel images={images} />
        </div>
        <div className="w-full lg:flex items-center max-sm:mt-10">
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
                100+ <span className="ml-[2px]">Sold</span>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-xl font-semibold mt-3">${data?.price}</p>
              <p className="text-base opacity-70 line-through mt-3">
                ${data?.discountPrice}
              </p>
              {data?.price && data?.discountPrice && (
                <p className="text-green-600 text-xl mt-3">
                  {Math.round(
                    ((data?.price - data?.discountPrice) / data?.price) * 100
                  )}
                  % saved
                </p>
              )}
            </div>

            <div className="basis-1/2">
              <div className="grid gap-4">
                <ul className="grid gap-4 bodyText !opacity-85 mt-3">
                  {data?.features.map((item, index) => (
                    <li key={index}>- {item}</li>
                  ))}
                </ul>
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="bg-secondaryBg rounded-lg flex items-center justify-center w-full py-3 font-semibold my-4 transform transition-transform hover:scale-105"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "BUY NOW"}
                </button>
                <div>
                  <p className="text-center">
                    We accept these payment methods and more..
                  </p>
                  <div className="mx-auto mt-2 flex items-center gap-3 flex-wrap justify-center">
                    <Image
                      src="/payment-logos/visa.svg"
                      width={43}
                      height={43}
                      alt="logo"
                    />
                    <Image
                      src="/payment-logos/mastercard.svg"
                      width={43}
                      height={43}
                      alt="logo"
                    />
                    <Image
                      src="/payment-logos/amex.svg"
                      width={43}
                      height={43}
                      alt="logo"
                    />
                    <Image
                      src="/payment-logos/apple.svg"
                      width={43}
                      height={43}
                      alt="logo"
                    />
                    <Image
                      src="/payment-logos/google.svg"
                      width={43}
                      height={43}
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 border-t">
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
      <section className="py-10">
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
      <section className="py-14">
        <AccordionDemo faqs={data.faqs} />
      </section>
    </div>
  );
};

export default SingleProductContainer;

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
    <div className="pb-20">
      <section className="lg:flex lg:gap-9 pb-10">
        <div className="lg:min-w-[60%]">
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
                100+ <span className="ml-[2px]">Sold</span>
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
                      ((data.price - data.discountPrice) / data.price) * 100
                    )
                  )}
                  %
                </div>
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
      <section className="py-10 max-sm:px-[3%] border-t">
        {data.videos && data.videos?.length > 0 && (
          <div className="video-container">
            {data.videos.map((videoUrl, index) => (
              <ReactPlayer
                key={index}
                url={videoUrl.url}
                controls
                width="400"
              />
            ))}
          </div>
        )}
        <h2 className="heading1 leading-7 pt-3">
          Seemless Glow, Infinite Wonder
        </h2>
        <p className="opacity-85 mt-2">{data?.description}</p>
      </section>
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

          {data.reviews && data.reviews.length > 0 && (
            <div>
              {data.reviews.map((review) => (
                <div>
                  <p>{review?.user}</p>
                  <Rating
                    initialValue={review.rating}
                    readonly
                    fillColor=""
                    className="text-secondaryBg"
                    SVGclassName="inline"
                    size={16}
                    allowFraction
                  />
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

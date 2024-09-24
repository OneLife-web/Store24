"use client";
import { updateData } from "@/types";
import React from "react";
import Carousel from "../Carousel";
import Image from "next/image";
import { CartItem, useCart } from "@/providers/CartContext";
import { useSession } from "next-auth/react";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  const { images } = data;
  const { addItemToCart } = useCart();
  const { data: session } = useSession();
  const userId = session?.id;

  const handleAddToCart = async () => {
    let item: CartItem | undefined;

    if (data?._id && data?.price !== undefined) {
      item = {
        productId: data._id,
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
    <section className="max-sm:px-[3%] py-7">
      <div className="lg:flex lg:gap-9">
        <div className="lg:min-w-[60%]">
          <Carousel images={images} />
        </div>
        <div className="w-full max-sm:mt-10">
          <h1 className="heading1">{data?.title}</h1>
          <p className="bodyText !font-semibold my-3 !opacity-100 !max-sm:text-base text-lg">
            ${data?.price} USD
          </p>
          <div className="basis-1/2">
            <div>
              <ul className="bodyText grid gap-3 mt-3">
                {data?.features.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white block w-full py-3 font-medium my-4 transform transition-transform hover:scale-105"
              >
                BUY NOW
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
  );
};

export default SingleProductContainer;

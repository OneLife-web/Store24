import { updateData } from "@/types";
import React from "react";
import Carousel from "../Carousel";
import Image from "next/image";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  const { images } = data;
  return (
    <section className="max-sm:px-[3%] py-7">
      <div className="lg:flex">
        <div className="lg:max-w-[60%]">
          <Carousel images={images} />
        </div>
        <div className="w-full">
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
              <div>
                <p className="text-center">
                  We accept these payment methods and more..
                </p>
                <div className="max-w-[70%] mx-auto mt-2 flex items-center gap-3 flex-wrap justify-center">
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
              <button className="bg-primary text-white block w-full py-3 font-medium mt-10 transform transition-transform hover:scale-105">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductContainer;

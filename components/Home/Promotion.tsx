import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Promotion = () => {
  return (
    <section className="py-10 max-sm:px-[3%]">
      <h1 className="font-bold text-xl md:text-2xl text-center mb-5">
        Welcome to Store45. See what&apos;s new
      </h1>
      <p className="text-center bodyText">
        Our newest release is deserving of fascination
      </p>
      <div className="flex max-sm:flex-col mt-16">
        <div className="bg-gray-500 md:basis-1/2 max-sm:h-[450px] max-h-[495px] w-full"></div>
        <div className="basis-1/2">
          <div className="lg:max-w-[60%] mx-auto">
            <h1 className="heading1">DynaGrip 2.0™</h1>
            <ul className="bodyText grid gap-3 mt-3">
              <li>- Builds forearm muscle & strengthens grip</li>
              <li>- Counts repetitions automatically</li>
              <li>- Large weight selection</li>
            </ul>
            <p className="bodyText my-3 !opacity-100 !max-sm:text-base text-lg">
              $19.94 USD
            </p>
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
            <Link
              href="/"
              className="text-sm w-fit mt-7 font-semibold flex items-center gap-2 group"
            >
              <span className="border-b border-transparent group-hover:border-black transition-all duration-300">
                View full details
              </span>

              <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                <MoveRight strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;

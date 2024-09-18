import Image from "next/image";
import Link from "next/link";
import React from "react";

const Promotion = () => {
  return (
    <section className="py-10">
      <h1 className="font-bold text-xl md:text-2xl text-center mb-5">
        Welcome to Store45. See what&apos;s new
      </h1>
      <p className="opacity-70 max-sm:text-sm text-center font-semibold">
        Our newest release is deserving of fascination
      </p>
      <div className="flex max-sm:flex-col mt-16">
        <div className="bg-gray-500 md:basis-1/2 h-[495px] w-full"></div>
        <div>
          <h1>DynaGrip 2.0™</h1>
          <ul>
            <li>- Builds forearm muscle & strengthens grip</li>
            <li>- Counts repetitions automatically</li>
            <li>- Large weight selection</li>
          </ul>
          <p>$19.94 USD</p>
          <div>
            <p>We accept these payment methods and more..</p>
            <div>
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
          <button>BUY NOW</button>
          <Link href="/">View full details</Link>
        </div>
      </div>
    </section>
  );
};

export default Promotion;

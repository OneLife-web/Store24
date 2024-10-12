"use client";
//import { cn } from "@/lib/utils";
import { CartItem, useCart } from "@/providers/CartContext";
import { Settings } from "@/types";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Loader2, MoveRight, Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShippingInfo from "../ShippingInfo";
//import { useState } from "react";
//import toast from "react-hot-toast";

const Promotion = ({ data }: { data: Settings }) => {
  const router = useRouter();
  const { addItemToCart, loading } = useCart();
  const { data: session } = useSession();
  const userId = session?.id;
  //const [color, setColor] = useState("");

  const handleAddToCart = async () => {
    if (!userId) {
      router.push(
        `/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    /* if (!color) {
      toast.error("Select your preferred color");
      return;
    } */

    let item: CartItem | undefined;

    if (
      data?.promotion?.productId?._id &&
      data?.promotion?.productId?.price !== undefined
    ) {
      item = {
        productId: data.promotion.productId._id,
        productImage: data.promotion.productId.images[0].url,
        name: data.promotion.productId.title,
        price: data.promotion.productId.price,
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
    <section className="py-10 max-lg:px-[3%]">
      <h1 className="heading3 text-center mb-5 mx-auto max-sm:w-[80%]">
        Welcome to Store45co. See what&apos;s new
      </h1>
      <p className="text-center bodyText">
        Our newest release is deserving of fascination
      </p>
      <div className="flex max-lg:flex-col max-lg:gap-7 mt-16">
        <Image
          src={data?.promotion?.productId?.images[0]?.url}
          alt="image"
          width={300}
          height={450}
          loading="eager"
          className="object-contain lg:basis-1/2 max-lg:h-[450px] max-h-[495px] w-full"
        />
        <div className="basis-1/2">
          <div className="lg:max-w-[60%] mx-auto">
            <h1 className="heading1">{data?.promotion?.productId?.title}</h1>
            {/* <ul className="bodyText grid gap-3 mt-3">
              {data?.promotion?.productId?.features.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul> */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                <StarFilledIcon className="text-secondaryBg size-6" />
                <p className="lg:text-lg">
                  {data.promotion.productId.averageRating.toFixed(1)}
                </p>
              </div>
              <p className="border-l pl-3 lg:text-lg">
                {data.promotion.productId.quantitySold}+ Sold
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <p className="font-semibold my-3 text-lg">
                ${data?.promotion?.productId?.price}
              </p>
              <p className="bodyText line-through !max-sm:text-sm text-base">
                ${data?.promotion?.productId?.discountPrice}
              </p>
              {data?.promotion.productId.price &&
                data?.promotion.productId.discountPrice && (
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
                        ((data.promotion.productId.discountPrice -
                          data.promotion.productId.price) /
                          data.promotion.productId.discountPrice) *
                          100
                      )
                    )}
                    %
                  </div>
                )}
            </div>
            <div className="flex items-center gap-2 px-[3%] pt-7 pb-3">
              <Truck strokeWidth={1.2} size={22} />
              <p className="font-medium max-sm:text-xs">Free shipping</p>
            </div>
            <ShippingInfo />
            <div className="mt-4">
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
            {/* <div className="flex gap-3 flex-wrap pt-7">
              {data.promotion.productId.colors &&
                data.promotion.productId.colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setColor(col)}
                    className={cn(
                      "border border-primary rounded-full px-6 py-2",
                      {
                        "bg-primary text-white": col === color,
                      }
                    )}
                  >
                    {col}
                  </button>
                ))}
            </div> */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="bg-secondaryBg rounded-lg flex items-center justify-center w-full py-3 font-semibold mt-10 transform transition-transform hover:scale-105"
            >
              {loading ? <Loader2 className="animate-spin" /> : "BUY NOW"}
            </button>
            <Link
              href={`/products/${data?.promotion?.productId?._id}`}
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

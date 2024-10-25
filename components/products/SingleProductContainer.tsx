"use client";

import { Rating } from "react-simple-star-rating";
import { ImageProps, updateData } from "@/types";
import Carousel from "../Carousel";
import Image from "next/image";
import { CartItem, useCart } from "@/providers/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ScrollspyTabs from "../ScrollableTabs";
import ShippingInfo from "../ShippingInfo";
import { Loader2, Truck } from "lucide-react";
import { useState } from "react";
import { AddtoCartDialog } from "../AddtoCartDialog";
import toast from "react-hot-toast";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  const averageRating =
    data?.reviews && data.reviews.length > 0
      ? data.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        data.reviews.length
      : 0; // Default to 0 if no reviews

  const [isBuy, setIsBuy] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ImageProps[]>([]);
  const router = useRouter();
  const { images } = data;
  const imagesWithCaptions = images.filter(
    (image) =>
      image.caption !== null &&
      image.caption !== undefined &&
      image.caption.trim() !== ""
  );
  const hasMultipleImagesWithCaptions = imagesWithCaptions.length > 1;
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

    /* if (!selectedItems.length) {
      toast.error("Please select at least one item.");
      return;
    } */

    // Ensure productId and price are available
    if (data?._id && data?.price !== undefined) {
      try {
        if (hasMultipleImagesWithCaptions) {
          for (const selectedItem of selectedItems) {
            // For each selected item, dynamically set image and color based on selection
            const item: CartItem = {
              productId: data._id, // Using the product ID from the data
              productImage: selectedItem.url || "/mydemo.jpg", // Image from the selected item
              name: data.title, // Product title from data
              price: data.price, // Base price from data
              quantity: 1, // Default quantity set to 1
              color: selectedItem.caption, // Color or description from the selected item
            };

            // Add each selected item to the cart
            await addItemToCart(item, userId!);
          }

          toast.success("Items added to cart");
          setSelectedItems([]); // Reset selection after adding
          setIsBuy(false); // Close dialog
        } else {
          const item: CartItem = {
            productId: data._id, // Using the product ID from the data
            productImage: images[0]?.url || "/mydemo.jpg", // Image from the selected item
            name: data.title, // Product title from data
            price: data.price, // Base price from data
            quantity: 1, // Default quantity set to 1
            color: images[0]?.caption, // Color or description from the selected item
          };

          // Add each selected item to the cart
          await addItemToCart(item, userId!);

          toast.success("Item added to cart");
        }
      } catch (error) {
        // Error toast
        toast.error("Failed to add item to cart.");
        console.error("Error adding to cart:", error);
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
            <h1 className="max-sm:text-sm font-semibold mb-2">{data?.title}</h1>
            <div className="flex items-center">
              <Rating
                initialValue={averageRating}
                readonly
                fillColor=""
                className="mt-[-4px] pr-1 text-secondaryBg"
                SVGclassName="inline"
                size={16}
                allowFraction
              />
              <p className="max-sm:text-base font-medium whitespace-nowrap">
                {averageRating.toFixed(1)}
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
      <div className="fixed z-10 bottom-0 bg-white right-0 left-0 px-[3%] py-5">
        {hasMultipleImagesWithCaptions ? (
          <AddtoCartDialog
            handleAddToCart={handleAddToCart}
            images={imagesWithCaptions}
            loading={loading}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            isBuy={isBuy}
            setIsBuy={setIsBuy}
          />
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="bg-secondaryBg rounded-full flex items-center justify-center w-full py-3 font-semibold my-4 transform transition-transform hover:scale-105"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProductContainer;

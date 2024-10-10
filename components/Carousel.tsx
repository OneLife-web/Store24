"use client";

import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ImageProps } from "@/types";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";

const Carousel = ({ images }: { images: ImageProps[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const handleOnSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper); // Now this should work
  };

  return (
    <>
      {images.length > 0 && (
        <>
          <Swiper
            style={
              {
                // Use a type assertion here
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as React.CSSProperties
            }
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 relative"
          >
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <Image
                  src={image.url}
                  alt="slide image"
                  width={400}
                  height={450}
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute font-medium py-1 whitespace-nowrap text-sm bg-opacity-95 px-4 rounded-full bottom-5 left-1/2 -translate-x-1/2 bg-white text-black">
                  <span className="opacity-70">Item</span>
                  <span className="px-2 opacity-70">|</span>
                  <span className="">{image.caption}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-5 px-[3%]">
            <Swiper
              onSwiper={handleOnSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {images.map((image) => (
                <SwiperSlide key={image.url}>
                  <Image
                    src={image.url}
                    alt="slide image"
                    width={200}
                    height={100}
                    className="w-full rounded-lg h-[80px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default Carousel;

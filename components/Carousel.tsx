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
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <Image
                  src={image.url}
                  alt="slide image"
                  width={400}
                  height={450}
                  className="w-full h-[450px] object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={handleOnSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <Image
                  src={image.url}
                  alt="slide image"
                  width={400}
                  height={450}
                  className="w-full h-[450px] object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default Carousel;

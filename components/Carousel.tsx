"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const Carousel = ({ images }: { images: string[] }) => {
  return (
    <>
      {images.length > 0 && (
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <Image src={image} alt="slide image" width={400} height={450} className="w-full h-[450px] object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Carousel;

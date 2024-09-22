import { updateData } from "@/types";
import React from "react";
import Carousel from "../Carousel";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  const { images } = data;
  return (
    <section className="max-sm:px-[3%] py-7">
      <div className="flex">
        <div className="lg:max-w-[60%]">
          <Carousel images={images} />
        </div>
        <div className="">
          <div>{data?.title}</div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductContainer;

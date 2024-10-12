import { updateData } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductDescription = ({ data }: { data: updateData }) => {
  return (
    <div>
      <h2 className="heading4">Product details</h2>
      <h3 className="heading3 pt-4 flex items-center gap-1 !font-medium">
        Specifications{" "}
        <span>
          <ChevronRight />
        </span>
      </h3>
      {data.whyNeedThis && (
        <div className="mt-3">
          {data.whyNeedThis.map((info, i) => (
            <div key={i} className="flex">
              <div className="basis-[40%] flex items-center bg-gray-100 text-primary/70 py-2 px-4">
                {info.title}
              </div>
              <div className="basis-[60%] py-2 px-4">{info.content}</div>
            </div>
          ))}
        </div>
      )}
      {data.characteristics && (
        <div className="mt-4 grid gap-5">
          {data.characteristics.map((info, i) => (
            <div key={i} className="grid gap-3">
              <div className="heading3 !font-medium opacity-70">
                {info.title}
              </div>
              <div className="bodyText">{info.content}</div>
            </div>
          ))}
        </div>
      )}
      {data.features && (
        <div className="mt-7">
          <h2 className="heading3 !font-medium">Features:</h2>
          <ul className="mt-4 grid gap-3 list-decimal pl-[3%]">
            {data.features.map((info, i) => (
              <li key={i} className="bodyText">
                {info}
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.descriptionImages && (
        <div className="mt-7 grid gap-4">
          {data.descriptionImages.map((info, i) => (
            <Image
              key={i}
              src={info}
              width={400}
              height={400}
              alt="product image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

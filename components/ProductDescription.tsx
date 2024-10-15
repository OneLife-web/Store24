import { updateData } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductDescription = ({ data }: { data: updateData }) => {
  return (
    <div className="bg-white">
      <h2 className="heading4 px-[3%]">Product details</h2>
      {data.description && (
        <p className="bodyText px-[3%] !font-normal mt-3">{data.description}</p>
      )}
      {data.whyNeedThis && (
        <div className="py-7 px-[3%]">
          <h3 className="heading3 flex items-center gap-1 !font-medium">
            Specifications{" "}
            <span>
              <ChevronRight strokeWidth={1.2} size={17} />
            </span>
          </h3>
          <div className="mt-3 max-sm:text-sm">
            {data.whyNeedThis.map((info, i) => (
              <div key={i} className="flex">
                <div className="basis-[40%] flex items-center bg-gray-100 text-primary/90 py-2 px-4">
                  {info.title}
                </div>
                <div className="basis-[60%] py-2 px-4">{info.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.characteristics && (
        <div className="py-7 px-[3%] grid gap-5">
          {data.characteristics.map((info, i) => (
            <div key={i} className="grid gap-3">
              <div className="heading3 !font-medium">{info.title}</div>
              <div className="bodyText !font-normal">{info.content}</div>
            </div>
          ))}
        </div>
      )}
      {data.features && data.features.length > 0 && (
        <div className="py-7 px-[3%]">
          <h2 className="heading3 !font-medium">Features:</h2>
          <ul className="mt-4 grid gap-5 list-decimal pl-[3%]">
            {data.features.map((info, i) => (
              <li key={i} className="bodyText !font-normal">
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
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

import { updateData } from "@/types";
import Image from "next/image";

const ProductCard = ({ item }: { item: updateData }) => {
  return (
    <div className="group cursor-pointer">
      <Image
        src={item?.images[0]}
        alt="image"
        width={200}
        height={150}
        className="min-w-[150px] md:min-w-[200px] h-[150px] bg-gray-200"
      ></Image>
      <p className="text-sm font-semibold my-2 w-fit border-b border-transparent group-hover:border-primary transition-all duration-300">
        {item?.title}
      </p>
      <p className="bodyText !font-semibold !opacity-100 !max-sm:text-base text-lg">
        ${item?.price} USD
      </p>
    </div>
  );
};

export default ProductCard;

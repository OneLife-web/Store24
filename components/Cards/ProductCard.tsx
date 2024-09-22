import { updateData } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ item }: { item: updateData }) => {
  return (
    <Link href={`/products/${item?._id}`} className="group cursor-pointer">
      <Image
        src={item?.images[0]}
        alt="image"
        width={200}
        height={150}
        className="min-w-[150px] object-cover md:min-w-[200px] h-[150px] bg-gray-200"
      ></Image>
      <p className="text-sm font-semibold my-2 w-fit border-b border-transparent group-hover:border-primary transition-all duration-300">
        {item?.title}
      </p>
      <p className="bodyText !font-semibold !opacity-100 !max-sm:text-base text-lg">
        ${item?.price} USD
      </p>
    </Link>
  );
};

export default ProductCard;

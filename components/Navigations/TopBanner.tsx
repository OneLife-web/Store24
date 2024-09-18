import { ArrowBigRight, ArrowRightIcon, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="min-h-[45px] text-white bg-primary w-full flex items-center justify-center">
      <Link
        href="/"
        className="font-semibold text-sm max-sm:text-xs flex items-center w-fit gap-2 justify-center"
      >
        30% OFF Today Only <span>|</span>+1000 Happy Customers{" "}
        <span className="inline-block">
          <MoveRight strokeWidth={1.5} />
        </span>
      </Link>
    </div>
  );
};

export default TopBanner;

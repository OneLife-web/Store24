"use client";
import { getSettings } from "@/lib/PowerHouse";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface BannerType {
  title: string;
  link: string;
}

const TopBanner = () => {
  const [topBanner, setTopBanner] = useState<BannerType | null>(null);
  const fetchBanner = async () => {
    try {
      const res = await getSettings();
      if (res.status === 200) {
        setTopBanner(res?.banner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div className="min-h-[45px] text-white bg-primary w-full flex items-center justify-center">
      {topBanner && (
        <Link
          href={topBanner.link}
          className="font-semibold text-sm max-sm:text-xs flex items-center w-fit gap-2 justify-center"
        >
          {topBanner.title}
          <span className="inline-block">
            <MoveRight strokeWidth={1.5} />
          </span>
        </Link>
      )}
    </div>
  );
};

export default TopBanner;

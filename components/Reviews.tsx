import { updateData } from "@/types";
import { formatDate } from "@/utils/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

// Define an interface for the country data
interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
}

const Reviews = ({ data }: { data: updateData }) => {
  const [countryFlags, setCountryFlags] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCountryFlags = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries: Country[] = await response.json();
      const flags: Record<string, string> = {};
      countries.forEach((country) => {
        flags[country.name.common] = country.flags.svg;
      });
      setCountryFlags(flags);
    };

    fetchCountryFlags();
  }, []);

  return (
    <div className="py-10 bg-white max-sm:mt-4 max-sm:px-[3%]">
      <h2 className="heading4">Reviews</h2>
      <div className="flex gap-2 items-end py-3">
        <h1 className="heading1 !font-medium">
          {data.averageRating.toFixed(1)}
        </h1>
        <Rating
          initialValue={data.averageRating}
          readonly
          className="text-secondaryBg mb-[6px]"
          SVGclassName="inline"
          size={20}
          allowFraction
        />
        <p className="bodyText mb-1 ml-2">
          {data.totalReviews} {data.totalReviews <= 1 ? "Review" : "Reviews"}
        </p>
      </div>
      <div>
        {data.reviews && data.reviews.length > 0 && (
          <div>
            {data.reviews.map((review) => (
              <div
                key={review._id}
                className="lg:max-w-[450px] grid gap-2 border-b border-black/25 py-8"
              >
                <div className="flex text-sm opacity-70 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p>{review?.user?.name}</p>
                    {review.country && countryFlags[review.country] && (
                      <Image
                        src={countryFlags[review.country]}
                        alt={`${review.country} flag`}
                        width={24}
                        height={16}
                      />
                    )}
                  </div>

                  <p>{formatDate(new Date(review?.date))}</p>
                </div>
                <Rating
                  initialValue={review.rating}
                  readonly
                  fillColor=""
                  className="text-secondaryBg"
                  SVGclassName="inline"
                  size={16}
                  allowFraction
                />
                <p className="max-sm:text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;

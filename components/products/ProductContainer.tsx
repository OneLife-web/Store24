"use client";
import { updateData } from "@/types";
import React, { useState, useEffect } from "react";
import ProductCard from "../Cards/ProductCard";

const ProductContainer = ({ data }: { data: updateData[] }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortOption, setSortOption] = useState("");

  // Effect to handle sorting whenever sortOption changes
  useEffect(() => {
    const sortedData = [...data]; // Create a copy of the original data

    switch (sortOption) {
      case "price-low-high":
        sortedData.sort((a, b) => {
          const priceA = a.price ?? 0; // Use 0 if undefined
          const priceB = b.price ?? 0; // Use 0 if undefined
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        sortedData.sort((a, b) => {
          const priceA = a.price ?? 0; // Use 0 if undefined
          const priceB = b.price ?? 0; // Use 0 if undefined
          return priceB - priceA;
        });
        break;
      case "date-new-old":
        sortedData.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0; // Fallback to 0 if undefined
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0; // Fallback to 0 if undefined
          return dateB - dateA; // New to Old
        });
        break;

      case "date-old-new":
        sortedData.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0; // Fallback to 0 if undefined
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0; // Fallback to 0 if undefined
          return dateA - dateB; // Old to New
        });
        break;

      case "title-a-z":
        sortedData.sort((a, b) => {
          const titleA = a.title ?? ""; // Fallback to empty string if undefined
          const titleB = b.title ?? ""; // Fallback to empty string if undefined
          return titleA.localeCompare(titleB);
        });
        break;

      case "title-z-a":
        sortedData.sort((a, b) => {
          const titleA = a.title ?? ""; // Fallback to empty string if undefined
          const titleB = b.title ?? ""; // Fallback to empty string if undefined
          return titleB.localeCompare(titleA);
        });
        break;
      default:
        break;
    }

    setFilteredData(sortedData); // Update filtered data with sorted data
  }, [sortOption, data]); // Run effect when sortOption or data changes

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <section className="py-10 px-[3%]">
      <h1 className="heading1">Strong Grip Collection</h1>
      <div className="my-7 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="w-6"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0Zm11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0ZM13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2Z"
              fill="black"
            ></path>
          </svg>
          <p className="bodyText">Filter and sort</p>
        </div>
        <div className="max-sm:hidden">
          <label htmlFor="sort" className="font-semibold">
            Sort by:
          </label>
          <select
            className="bodyText"
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="date-new-old">Date: New to Old</option>
            <option value="date-old-new">Date: Old to New</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="title-a-z">Title: A-Z</option>
            <option value="title-z-a">Title: Z-A</option>
          </select>
        </div>
        <div className="flex items-center gap-5">
          <div className="max-sm:hidden">
            <label htmlFor="sort" className="font-semibold">
              Sort by:
            </label>
            <select
              className="bodyText"
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="date-new-old">Date: New to Old</option>
              <option value="date-old-new">Date: Old to New</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="title-a-z">Title: A-Z</option>
              <option value="title-z-a">Title: Z-A</option>
            </select>
          </div>
          <div className="bodyText">{data.length} products</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductContainer;

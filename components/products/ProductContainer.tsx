"use client";
import { updateData } from "@/types";
import React, { useState, useEffect } from "react";
import ProductCard from "../Cards/ProductCard";

const ProductContainer = ({ data }: { data: updateData[] }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [sortOption, setSortOption] = useState("");

  // Effect to handle sorting whenever sortOption changes
  useEffect(() => {
    let sortedData = [...data]; // Create a copy of the original data

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
    <section className="py-10">
      <h1 className="heading1">Strong Grip Collection</h1>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="date-new-old">Date: New to Old</option>
          <option value="date-old-new">Date: Old to New</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="title-a-z">Title: A-Z</option>
          <option value="title-z-a">Title: Z-A</option>
        </select>
      </div>
      {filteredData.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </section>
  );
};

export default ProductContainer;

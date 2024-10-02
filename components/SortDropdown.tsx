"use client";
import React from "react";

interface SortDropdownProps {
  sortOption: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  onChange,
}) => {
  return (
    <div className="max-sm:flex max-sm:items-center max-sm:justify-between">
      <label htmlFor="sort" className="font-semibold">
        Sort by:
      </label>
      <select
        className="bodyText focus:outline-none bg-white"
        id="sort"
        value={sortOption}
        onChange={onChange}
      >
        <option value="date-new-old">Date: New to Old</option>
        <option value="date-old-new">Date: Old to New</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="title-a-z">Title: A-Z</option>
        <option value="title-z-a">Title: Z-A</option>
      </select>
    </div>
  );
};

export default SortDropdown;

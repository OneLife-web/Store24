"use client";
import React, { useState } from "react";
import Input from "./Input";

const TrackingContainer = () => {
  const [trackNo, setTrackNo] = useState("");
  return (
    <section>
      <h1 className="heading1 text-center py-10">Track Your Order</h1>
      <div className="grid gap-2">
        <label className="max-sm:text-sm font-medium">Tracking Number</label>
        <Input
          value={trackNo}
          className="border h-14 mb-2 lg:h-16 placeholder:text-black placeholder:font-normal"
          onChange={(e) => setTrackNo(e.target.value)}
        />
      </div>
      <button
        className="bg-secondaryBg font-semibold rounded-lg w-full h-14 lg:h-16 mt-10"
        type="submit"
      >
        Track
      </button>
    </section>
  );
};

export default TrackingContainer;

import CheckoutSideNav from "@/components/checkout/CheckoutSideNav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      {children}
      <CheckoutSideNav />
    </div>
  );
};

export default layout;

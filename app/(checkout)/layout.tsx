import CheckoutSideNav from "@/components/checkout/CheckoutSideNav";
import MobileCheckoutNav from "@/components/checkout/MobileCheckoutNav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex lg:justify-between">
      <MobileCheckoutNav />
      {children}
      <CheckoutSideNav />
    </div>
  );
};

export default layout;

import Footer from "@/components/Navigations/Footer";
import Header from "@/components/Navigations/Header";
import TopBanner from "@/components/Navigations/TopBanner";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBanner />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default layout;

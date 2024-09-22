import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

const Slider = ({
  trigger,
  children,
}: {
  trigger: React.ReactNode | string;
  children: React.ReactNode;
}) => {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="cursor-pointer hover:scale-105 transition-all duration-200"
      >
        {trigger}
      </SheetTrigger>
      <SheetContent className="bg-white w-[90%]">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Slider;

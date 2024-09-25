import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

const Slider = ({
  trigger,
  children,
  open,
  setOpen,
}: {
  trigger: React.ReactNode | string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        asChild
        className="cursor-pointer hover:scale-105 transition-all duration-200"
      >
        {trigger}
      </SheetTrigger>
      <SheetContent className="bg-white w-[90%] px-0">{children}</SheetContent>
    </Sheet>
  );
};

export default Slider;

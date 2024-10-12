import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const ShippingInfo = () => {
  return (
    <div className="px-[3%]">
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>SHIPPING & DELIVERY?</AccordionTrigger>
            <AccordionContent className="bodyText">
              <p>Enjoy FREE Express Shipping on most orders ✨</p>
              <br />
              <p>
                Please allow 3-6 business days for your order to be processed
                and shipped
              </p>
              <br />
              <p>
                The estimated arrival time may vary depending on your location,
                you can find more details on our{" "}
                <Link className="underline" href="/shipping">Shipping page</Link>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ShippingInfo;

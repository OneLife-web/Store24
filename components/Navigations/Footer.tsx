"use client";
import { usePathname } from "next/navigation";
import { NavLinks2 } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathName = usePathname();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary py-10 text-white">
      <div className="lg:max-w-4xl mx-auto xl:max-w-5xl w-full">
        <h1 className="heading1 text-center">Stay in the know!</h1>
        <div className="grid md:grid-cols-2 pb-10 max-lg:px-[3%] mt-14 w-fit mx-auto gap-10 md:gap-20">
          <div className="max-sm:text-center">
            <h2 className="font-bold text-xl md:text-2xl mb-5">WHAT YOU GET</h2>
            <ul className="opacity-85 text-sm grid gap-3 md:list-disc md:pl-8">
              <li>Satisfaction Assured</li>
              <li>Customer Support Available</li>
              <li>High-Quality Product Offers</li>
              <li>Transactions secured</li>
            </ul>
          </div>
          <div className="max-sm:text-center">
            <h2 className="font-bold text-xl md:text-2xl mb-5">MENU</h2>
            <div className="max-sm:text-sm grid gap-3">
              {NavLinks2.map((nav) => (
                <Link
                  key={nav.title}
                  href={nav.link}
                  className={cn(
                    "font-medium text-center md:w-fit opacity-85 text-sm capitalize",
                    {
                      "!opacity-100 underline": pathName === nav.link,
                    }
                  )}
                >
                  {nav.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="py-8 max-lg:px-[3%] border-t">
          <div>&copy; {currentYear}, store45</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

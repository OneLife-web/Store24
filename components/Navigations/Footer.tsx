"use client";
import { usePathname } from "next/navigation";
import { FooterLinks, NavLinks2 } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Footer = () => {
  const pathName = usePathname();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary pt-10 text-white">
      <div className="">
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
          <div className="max-w-[70%] mx-auto mt-2 flex items-center gap-3 flex-wrap justify-center">
            <Image
              src="/payment-logos/visa.svg"
              width={30}
              height={30}
              alt="logo"
            />
            <Image
              src="/payment-logos/mastercard.svg"
              width={30}
              height={30}
              alt="logo"
            />
            <Image
              src="/payment-logos/amex.svg"
              width={30}
              height={30}
              alt="logo"
            />
            <Image
              src="/payment-logos/apple.svg"
              width={30}
              height={30}
              alt="logo"
            />
            <Image
              src="/payment-logos/google.svg"
              width={30}
              height={30}
              alt="logo"
            />
          </div>
          <div className="text-xs pt-7 max-lg:px-[3%] text-center md:text-sm opacity-85 whitespace-nowrap">
            <ul className="flex justify-center flex-wrap list-disc gap-3">
              {FooterLinks.map((link) => (
                <li className="mr-4">
                  <Link href={link.link}>{link.title}</Link>
                </li>
              ))}
            </ul>
            <p className="pt-9">
              {" "}
              &copy; {currentYear}, store45. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

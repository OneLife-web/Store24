"use client";
import Logo from "./Logo";
import { MenuIcon, SearchIcon, UserRound, X } from "lucide-react";
import Link from "next/link";
import { NavLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CartSideNav from "./CartSideNav";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const pathName = usePathname();

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenu) {
      document.body.style.overflow = "hidden";
      setMenuVisible(true); // Show menu immediately when isMenu is true
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => setMenuVisible(false), 200); // Delay hiding to allow animation to play
    }
  }, [isMenu]);

  return (
    <nav className="bg-secondary min-h-[150px] relative w-full flex items-center justify-center max-lg:px-[5%]">
      {menuVisible && (
        <div
          className={`absolute grid top-[150px] left-0 right-0 bottom-0 bg-white z-50 transition-all ${
            isMenu ? "animate-slide-in" : "animate-slide-out"
          }`}
          style={{ height: "calc(100vh - 150px)" }}
        >
          {NavLinks.map((nav) => (
            <Link
              key={nav.title}
              href={nav.link}
              className={cn(
                "text-primary transition-colors text-sm font-medium opacity-90 hover:opacity-100 hover:border-b border-primary",
                {
                  "opacity-100 border-b border-primary hover:border-b-2":
                    pathName === nav.link,
                }
              )}
            >
              {nav.title}
            </Link>
          ))}
        </div>
      )}
      <div className="lg:max-w-4xl xl:max-w-5xl w-full flex items-center justify-between">
        <div onClick={() => setIsMenu(!isMenu)} className="lg:hidden">
          {!menuVisible ? (
            <MenuIcon strokeWidth={1} size={28} color="#121212" />
          ) : (
            <X strokeWidth={1} size={32} color="#121212" />
          )}
        </div>
        <div className="max-lg:absolute max-lg:top-[50%] max-lg:translate-y-[-50%] max-lg:left-[50%] max-lg:translate-x-[-50%]">
          <Logo />
        </div>
        <div className="flex items-center justify-between gap-4 max-lg:hidden">
          {NavLinks.map((nav) => (
            <Link
              key={nav.title}
              href={nav.link}
              className={cn(
                "text-primary transition-colors text-sm font-medium opacity-90 hover:opacity-100 hover:border-b border-primary",
                {
                  "opacity-100 border-b border-primary hover:border-b-2":
                    pathName === nav.link,
                }
              )}
            >
              {nav.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center w-fit gap-5">
          <div className="cursor-pointer hover:scale-110 transition-all duration-150">
            <SearchIcon strokeWidth={1} color="#121212" />
          </div>
          <Link
            href="/"
            className="hover:scale-110 transition-all duration-150 max-lg:hidden"
          >
            <UserRound strokeWidth={1} color="#121212" />
          </Link>

          <CartSideNav />
        </div>
      </div>
    </nav>
  );
};

export default Header;

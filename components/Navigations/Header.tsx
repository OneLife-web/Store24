"use client";
import Logo from "./Logo";
import { MenuIcon, SearchIcon, UserRound, X } from "lucide-react";
import Link from "next/link";
import { NavLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
          <div className="cursor-pointer hover:scale-105 transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="#121212"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

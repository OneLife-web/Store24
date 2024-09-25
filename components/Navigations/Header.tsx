"use client";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import { MenuIcon, SearchIcon, UserRound, X } from "lucide-react";
import Link from "next/link";
import { NavLinks } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CartSideNav from "./CartSideNav";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const pathName = usePathname();

  const { status } = useSession(); // `session` contains the user data
  const router = useRouter();

  const handleProfile = () => {
    if (status === "authenticated") {
      // Redirect to the user profile page
      setIsMenu(false);
      router.push("/profile");
    } else {
      // Optionally, redirect to the sign-in page or show a message
      setIsMenu(false);
      router.push("/sign-in");
    }
  };

  const handleCart = () => {
    if (status === "unauthenticated") {
      // Redirect to the user profile page
      router.push("/sign-in");
    }
  };

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
          className={`absolute flex flex-col justify-between top-[150px] left-0 right-0 bottom-0 bg-white z-50 transition-all ${
            isMenu ? "animate-slide-in" : "animate-slide-out"
          }`}
          style={{ height: "calc(90vh - 150px)" }}
        >
          <div className="mt-7 flex flex-col gap-3">
            {NavLinks.map((nav) => (
              <Link
                key={nav.title}
                href={nav.link}
                onClick={() => setIsMenu(false)}
                className={cn("py-2 px-[5%] font-medium", {
                  "bg-secondary": pathName === nav.link,
                })}
              >
                {nav.title}
              </Link>
            ))}
          </div>
          <div className="bg-secondary text-sm font-semibold py-10 pb-20 px-[5%]">
            <button
              disabled={status === "loading"}
              onClick={handleProfile}
              className="flex gap-2 items-center w-fit"
            >
              <UserRound strokeWidth={1.2} />
              {status === "authenticated" ? "Account" : "Log in"}
            </button>
          </div>
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
          <button
            onClick={handleProfile}
            className="hover:scale-110 transition-all duration-150 max-lg:hidden"
          >
            <UserRound strokeWidth={1} color="#121212" />
          </button>
          {status === "authenticated" ? (
            <CartSideNav />
          ) : (
            <button onClick={handleCart} disabled={status === "loading"}>
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
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import CartSideNav from "../Navigations/CartSideNav";

const MobileCheckoutNav = () => {
  return (
    <div className="w-full z-30 lg:hidden bg-white sticky top-0 ">
      <div className="relative w-full py-5 flex items-center justify-center">
        <Link href="/" className="w-fit">
          <Image src="/logo2.png" width={130} height={130} alt="logo" />
        </Link>
        <div className="w-fit absolute right-[7%]">
          <CartSideNav />
        </div>
      </div>
    </div>
  );
};

export default MobileCheckoutNav;

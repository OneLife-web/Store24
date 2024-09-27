import Image from "next/image";
import Link from "next/link";
import CartSideNav from "../Navigations/CartSideNav";

const MobileCheckoutNav = () => {
  return (
    <div className="w-full py-5 flex items-center justify-center relative">
      <Link href="/" className="w-fit">
        <Image src="/logo2.png" width={130} height={130} alt="logo" />
      </Link>
      <div className="w-fit absolute right-[7%]">
        <CartSideNav />
      </div>
    </div>
  );
};

export default MobileCheckoutNav;

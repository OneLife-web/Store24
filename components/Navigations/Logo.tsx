import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo.jpeg" width={150} height={200} alt="logo" />
    </Link>
  );
};

export default Logo;

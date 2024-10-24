import { Loader2 } from "lucide-react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-fit relative">
        <Loader2
          size={150}
          strokeWidth={1.1}
          className="text-secondaryBg animate-spin"
        />
        <Image
          src="/logo2.png"
          width={100}
          height={100}
          alt="logo"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      </div>
    </div>
  );
};

export default Loader;

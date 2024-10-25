import { Loader2 } from "lucide-react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 h-screen flex items-center justify-center bg-black/75">
      <div className="w-fit relative">
        <Loader2
          size={32}
          strokeWidth={1.1}
          className="text-secondaryBg animate-spin"
        />
        {/* <Image
          src="/logo2.png"
          width={100}
          height={100}
          alt="logo"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        /> */}
      </div>
    </div>
  );
};

export default Loader;

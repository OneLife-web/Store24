import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageProps } from "@/types";
import { CheckCheck, Loader2 } from "lucide-react";
import Image from "next/image";

export function AddtoCartDialog({
  handleAddToCart,
  images,
  loading,
  selectedItem,
  setSelectedItem,
  isBuy,
  setIsBuy,
}: {
  handleAddToCart: () => void;
  images: ImageProps[];
  loading: boolean;
  selectedItem: ImageProps | null;
  setSelectedItem: (item: ImageProps) => void;
  isBuy: boolean;
  setIsBuy: (isBuy: boolean) => void;
}) {
  return (
    <Dialog open={isBuy} onOpenChange={setIsBuy}>
      <DialogTrigger asChild>
        <button
          disabled={loading}
          className="bg-secondaryBg rounded-full md:max-w-[400px] mx-auto flex items-center justify-center w-full py-3 font-semibold my-4 transform transition-transform hover:scale-105"
        >
          {loading ? <Loader2 className="animate-spin" /> : "BUY NOW"}
        </button>
      </DialogTrigger>
      <DialogContent className="border-none max-sm:px-[3%]">
        <div className="border rounded-xl bg-white px-4 py-7">
          <DialogHeader>
            <DialogTitle className="heading4 pb-3">
              Select your preferred item
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 max-h-[350px] custom-scrollbar overflow-y-scroll py-4">
            <div className="grid items-center gap-4">
              {images.map((image) => (
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => setSelectedItem(image)}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={image.url}
                      className="rounded-lg"
                      width={80}
                      height={100}
                      alt="image"
                    />
                    <p>{image.caption}</p>
                  </div>
                  {selectedItem?.caption === image.caption && (
                    <CheckCheck
                      strokeWidth={1.2}
                      className="mr-5 text-secondaryBg"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <DialogFooter>
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="bg-secondaryBg rounded-full flex items-center justify-center w-full py-3 font-semibold my-4 transform transition-transform hover:scale-105"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add To Cart"}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

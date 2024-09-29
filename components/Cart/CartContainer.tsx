"use client";
import { CartItem } from "@/providers/CartContext";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import CartCard from "../Cards/CartCard";
import { useRouter } from "next/navigation";

const CartContainer = ({
  cart,
  totalPrice,
  updateItemInCart,
  removeItemFromCart,
  loadingIndex,
  setOpen,
}: {
  cart: CartItem[];
  totalPrice: number;
  updateItemInCart: (
    productId: string,
    quantity: number,
    userId: string
  ) => void;
  removeItemFromCart: (
    productId: string,
    userId: string,
    index: number
  ) => void;
  loadingIndex: number | null;
  setOpen: (open: boolean) => void;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.id;

  if (!userId)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );

  const handleContinueShopping = () => {
    setOpen(false);
    router.push("/");
  };

  const handleToCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  const handleIncrease = (productId: string, currentQuantity: number) => {
    updateItemInCart(productId, currentQuantity + 1, userId);
  };

  const handleDecrease = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateItemInCart(productId, currentQuantity - 1, userId);
    }
  };

  if (cart.length < 1) {
    return (
      <div className="mt-[80%]">
        <h2 className="font-bold text-xl md:text-2xl text-center mb-10 mx-auto max-sm:w-[80%]">
          Your cart is empty
        </h2>
        <button
          onClick={handleContinueShopping}
          className="bg-secondaryBg rounded-lg block px-8 py-3 mx-auto font-semibold transform transition-transform hover:scale-105"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="px-[3%]">
      <h1 className="font-bold text-xl md:text-2xl">Your Cart</h1>
      <div className="py-4 flex border-b items-center justify-between">
        <p className="bodyText max-sm:text-xs text-sm">PRODUCT</p>
        <p className="bodyText max-sm:text-xs text-sm">TOTAL</p>
      </div>
      <div className="py-4">
        <ul className="grid gap-5">
          {cart.map((item, index) => (
            <li key={item.productId}>
              <CartCard
                item={item}
                userId={userId}
                index={index}
                removeItem={removeItemFromCart}
                increaseItem={handleIncrease}
                decreaseItem={handleDecrease}
                loading={loadingIndex === index}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute grid gap-3 border-t pb-5 pt-9 bottom-0 right-[3%] left-[3%]">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Estimated Total</p>
          <p className="font-semibold text-lg opacity-90">${totalPrice} USD</p>
        </div>
        <button
          onClick={handleToCheckout}
          className="bg-secondaryBg rounded-lg w-full block py-3 mx-auto font-semibold transform transition-transform hover:scale-105"
        >
          Check out
        </button>
      </div>
    </div>
  );
};

export default CartContainer;

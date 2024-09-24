"use client";
import { useCart } from "@/providers/CartContext";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import CartCard from "../Cards/CartCard";
//import { useRouter } from "next/navigation";

const CartContainer = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  const { cart, totalPrice, updateItemInCart, removeItemFromCart } = useCart();

  if (!userId)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );

  // Call fetchCart to load the cart when needed (e.g., in useEffect or manually)

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
        <h2 className="font-bold text-xl md:text-2xl text-center mb-5 mx-auto max-sm:w-[80%]">
          Your cart is empty
        </h2>
        <button className="bg-primary text-white block px-6 py-3 mx-auto font-medium transform transition-transform hover:scale-105">
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
      <div className="grid gap-2 py-4">
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              <CartCard
                item={item}
                userId={userId}
                removeItem={removeItemFromCart}
                increaseItem={handleIncrease}
                decreaseItem={handleDecrease}
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
        <button className="bg-primary w-full text-white block py-3 mx-auto font-medium transform transition-transform hover:scale-105">
          Check out
        </button>
      </div>
    </div>
  );
};

export default CartContainer;

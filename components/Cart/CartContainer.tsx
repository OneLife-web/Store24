"use client";
import { useCart } from "@/providers/CartContext";
import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";

const CartContainer = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  if (!userId) return;
  const { cart, totalPrice, updateItemInCart, removeItemFromCart } = useCart();

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
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.name} - ${item.price} x {item.quantity}
            <div>
              <button
                onClick={() => handleDecrease(item.productId, item.quantity)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item.productId, item.quantity)}
              >
                +
              </button>
            </div>
            <button onClick={() => removeItemFromCart(item.productId, userId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice}</h2>
    </div>
  );
};

export default CartContainer;

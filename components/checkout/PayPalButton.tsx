import { CartItem } from "@/providers/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  OnApproveData,
  OnApproveActions,
  CreateOrderActions,
  CreateOrderData,
} from "@paypal/paypal-js";

const PayPalButton = ({
  totalPrice,
  cart,
  handleOrderConfirmation,
  disabled,
}: {
  totalPrice: number;
  cart: CartItem[];
  handleOrderConfirmation: () => void;
  disabled: boolean;
}) => {
  const publicKey3 = process.env.NEXT_PUBLIC_PAYPAL_PUBLIC_KEY!;

  const createOrder = (_data: CreateOrderData, actions: CreateOrderActions) => {
    if (totalPrice <= 0) {
      throw new Error("Total price must be greater than zero.");
    }

    const itemTotal = cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2); // Ensures two decimal places

    return actions.order.create({
      intent: "CAPTURE", // Add this property
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPrice.toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemTotal,
              },
            },
          },
          description: "Order from our store",
          items: cart.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD", // Add this property
              value: item.price.toString(),
            },
            quantity: item.quantity.toString(), // Convert to string for consistency
          })),
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING", // Optional: Set to `GET_FROM_FILE` for physical goods
      },
    });
  };

  const onApprove = (_data: OnApproveData, actions: OnApproveActions) => {
    return actions!.order!.capture().then(() => {
      handleOrderConfirmation();
    });
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal Checkout Error: ", err);
  };

  return (
    <div>
      {totalPrice > 0 && (
        <PayPalScriptProvider options={{ clientId: publicKey3 }}>
          <PayPalButtons
            disabled={disabled}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{
              layout: "horizontal",
              color: "blue",
              shape: "rect",
              label: "paypal",
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PayPalButton;

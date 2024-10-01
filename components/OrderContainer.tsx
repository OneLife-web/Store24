"use client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OrderCard from "./Cards/OrderCard";

interface Order {
  _id: string;
  items: { name: string; image: string; price: number; quantity: number }[];
  status: "pending" | "processing" | "completed" | "failed";
  total: number;
}

const OrderContainer = () => {
  const { data: session } = useSession();
  const id = session?.id;

  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const fetchOrders = async () => {
    if (id) {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state before fetching

        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          setError(data.error || "Failed to fetch orders");
        }
      } catch (error) {
        setError("Failed to fetch orders due to a network error");
        console.log(error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[85vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-secondaryBg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        {error === "No orders found for this user" ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="font-semibold text-lg">No orders yet</p>
            <p>Go to store to place an order.</p>
          </div>
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:flex justify-center lg:mx-auto">
      {orders && orders.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">No Orders Found</div>
      ) : (
        <div className="py-7 px-[3%]">
          <h2 className="text-center font-semibold text-lg pb-8">My Orders</h2>
          <div className="grid gap-6">
            {orders.reverse()?.map((order) => (
              <OrderCard
                items={order.items}
                status={order.status}
                key={order._id}
                total={order.total}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderContainer;

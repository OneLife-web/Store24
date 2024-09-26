// app/my-orders/page.tsx
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  /*  useEffect(() => {
    async function fetchOrders() {
      const userId = "your-user-id"; // Replace with the logged-in user's ID
      const res = await axios.get(`/api/orders/${userId}`);
      setOrders(res.data);
    }
    
    fetchOrders();
  }, []); */

  return (
    <div>
      <h1>My Orders</h1>
      {/* {orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Status: {order.orderStatus}</p>
          <p>Total: ${order.total}</p>
          <p>Payment Status: {order.paymentStatus}</p>
        </div>
      ))} */}
    </div>
  );
};

export default MyOrders;

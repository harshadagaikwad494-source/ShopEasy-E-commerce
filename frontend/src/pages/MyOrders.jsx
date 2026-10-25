import { useEffect, useState } from "react";
import { request } from "../api";
import { useAuth } from "../context/AuthContext";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    request("/orders/my", { token: user.token }).then(setOrders).catch((e) => setError(e.message));
  }, [user.token]);

  return (
    <div className="page">
      <h2>My Orders</h2>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !error && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div className="order" key={o._id}>
          <p><b>Order</b> {o._id.slice(-6)} | <span className={`status ${o.status}`}>{o.status}</span></p>
          {o.items.map((i, idx) => <p key={idx}>{i.name} x {i.qty} - ₹{i.price * i.qty}</p>)}
          <p><b>Total: ₹{o.totalPrice}</b></p>
          <p className="muted">{new Date(o.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
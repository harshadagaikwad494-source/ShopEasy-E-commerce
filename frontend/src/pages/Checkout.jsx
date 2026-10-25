import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      await request("/orders", {
        method: "POST",
        token: user.token,
        body: { address, items: cart.map((i) => ({ product: i._id, qty: i.qty })) },
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.message);
    }
  };

  if (cart.length === 0) return <p className="page">Your cart is empty.</p>;

  return (
    <form className="page form" onSubmit={placeOrder}>
      <h2>Checkout</h2>
      <p>Items: {cart.length} | Total: <b>₹{total}</b></p>
      <textarea placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button type="submit">Place order</button>
    </form>
  );
}
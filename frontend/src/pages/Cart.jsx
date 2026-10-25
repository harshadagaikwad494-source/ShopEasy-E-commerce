import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, changeQty, removeFromCart, total } = useCart();

  if (cart.length === 0)
    return (
      <div className="page">
        <h2>Your cart is empty</h2>
        <Link to="/">Go shopping</Link>
      </div>
    );

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {cart.map((i) => (
        <div className="cart-item" key={i._id}>
          <img src={i.image} alt={i.name} />
          <div className="grow"><b>{i.name}</b><p>₹{i.price}</p></div>
          <input type="number" min="1" value={i.qty} onChange={(e) => changeQty(i._id, Number(e.target.value))} />
          <button onClick={() => removeFromCart(i._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <Link to="/checkout"><button>Proceed to checkout</button></Link>
    </div>
  );
}
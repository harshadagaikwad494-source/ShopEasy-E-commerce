import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">ShopEasy</Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({count})</Link>
        {user && <Link to="/orders">My Orders</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <span className="hello">Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const fallback = `https://placehold.co/400x400/e5e7eb/374151?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="card">
      <div className="img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
        />
        {product.stock < 1 && <span className="badge out">Sold out</span>}
        {product.stock > 0 && product.stock <= 10 && (
          <span className="badge low">Only {product.stock} left</span>
        )}
      </div>
      <p className="muted">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>
      <div className="row">
        <Link to={`/product/${product._id}`}>Details</Link>
        <button disabled={product.stock < 1} onClick={() => addToCart(product)}>
          {product.stock < 1 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
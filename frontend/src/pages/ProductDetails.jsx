import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    request(`/products/${id}`).then(setProduct).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="error page">{error}</p>;
  if (!product) return <p className="page">Loading...</p>;

  return (
    <div className="page details">
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>
        <p className="muted">Category: {product.category} | In stock: {product.stock}</p>
        <button disabled={product.stock < 1} onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
}
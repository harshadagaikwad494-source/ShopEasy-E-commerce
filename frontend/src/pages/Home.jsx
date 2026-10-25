import { useEffect, useState } from "react";
import { request } from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [error, setError] = useState("");

  useEffect(() => {
    request("/products").then(setProducts).catch((e) => setError(e.message));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let shown = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "low") shown = [...shown].sort((a, b) => a.price - b.price);
  if (sort === "high") shown = [...shown].sort((a, b) => b.price - a.price);
  if (sort === "name") shown = [...shown].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="hero">
        <h1>Shop smart with ShopEasy</h1>
        <p>Quality products, easy checkout and automatic billing.</p>
      </div>
      <div className="page">
        <div className="toolbar">
          <input className="search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className={`chip ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <p className="muted">{shown.length} products</p>
        <div className="grid">
          {shown.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>
    </>
  );
}
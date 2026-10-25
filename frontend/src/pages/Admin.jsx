import { useEffect, useState } from "react";
import { request } from "../api";
import { useAuth } from "../context/AuthContext";

const empty = { name: "", price: "", description: "", image: "", category: "", stock: "" };

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setProducts(await request("/products"));
      setOrders(await request("/orders", { token: user.token }));
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => { load(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    try {
      const body = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editId) await request(`/products/${editId}`, { method: "PUT", body, token: user.token });
      else await request("/products", { method: "POST", body, token: user.token });
      setForm(empty); setEditId(null); setError(""); load();
    } catch (err) {
      setError(err.message);
    }
  };

  const edit = (p) => {
    setEditId(p._id);
    setForm({ name: p.name, price: p.price, description: p.description, image: p.image, category: p.category, stock: p.stock });
    window.scrollTo(0, 0);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await request(`/products/${id}`, { method: "DELETE", token: user.token }); load(); }
    catch (err) { setError(err.message); }
  };

  const setStatus = async (id, status) => {
    try { await request(`/orders/${id}/status`, { method: "PUT", body: { status }, token: user.token }); load(); }
    catch (err) { setError(err.message); }
  };

  return (
    <div className="page">
      <h2>Admin Panel</h2>
      {error && <p className="error">{error}</p>}

      <h3>{editId ? "Edit product" : "Add product"}</h3>
      <form className="admin-form" onSubmit={save}>
        <input name="name" placeholder="Name" value={form.name} onChange={change} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={change} required />
        <input name="category" placeholder="Category" value={form.category} onChange={change} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={change} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={change} />
        <input name="description" placeholder="Description" value={form.description} onChange={change} />
        <button type="submit">{editId ? "Update" : "Add"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
      </form>

      <h3>Products</h3>
      {products.map((p) => (
        <div className="admin-row" key={p._id}>
          <img src={p.image} alt={p.name} />
          <div className="grow"><b>{p.name}</b> - ₹{p.price} (stock {p.stock})</div>
          <button onClick={() => edit(p)}>Edit</button>
          <button onClick={() => remove(p._id)}>Delete</button>
        </div>
      ))}

      <h3>Orders</h3>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div className="order" key={o._id}>
          <p><b>{o.user?.name}</b> ({o.user?.email}) - ₹{o.totalPrice}</p>
          {o.items.map((i, idx) => <p key={idx}>{i.name} x {i.qty}</p>)}
          <p className="muted">{o.address}</p>
          <select value={o.status} onChange={(e) => setStatus(o._id, e.target.value)}>
            {["Pending", "Shipped", "Delivered", "Cancelled"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}
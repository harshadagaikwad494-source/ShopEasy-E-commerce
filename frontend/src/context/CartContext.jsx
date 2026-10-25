import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);

  const addToCart = (p) =>
    setCart((c) => {
      const found = c.find((i) => i._id === p._id);
      if (found) return c.map((i) => (i._id === p._id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { _id: p._id, name: p.name, price: p.price, image: p.image, qty: 1 }];
    });
  const changeQty = (id, qty) =>
    setCart((c) => c.map((i) => (i._id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i._id !== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQty, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
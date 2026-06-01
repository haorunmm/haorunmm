"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("haorun_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("haorun_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const found = prev.find((x) => x.SKU === item.SKU);
      if (found) return prev.map((x) => x.SKU === item.SKU ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (sku: string) => setCart((prev) => prev.filter((x) => x.SKU !== sku));
  const clearCart = () => setCart([]);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

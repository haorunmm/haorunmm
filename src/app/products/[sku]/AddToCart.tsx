"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function AddToCart({ product }: { product: any }) {
  const { addToCart } = useCart();
  return (
    <div className="mt-8 space-y-3">
      <button onClick={() => addToCart(product)} className="w-full rounded-full bg-amber-400 py-4 text-lg font-bold text-slate-950">Add to Cart</button>
      <Link href="/cart" className="block w-full rounded-full bg-orange-500 py-4 text-center text-lg font-bold text-white">Go to Cart</Link>
    </div>
  );
}

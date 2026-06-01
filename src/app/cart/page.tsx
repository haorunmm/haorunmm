"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const subtotal = cart.reduce((s: number, x: any) => s + Number(x["Selling Price"] || 0) * x.qty, 0);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((x: any) => (
              <div key={x.SKU} className="rounded-3xl bg-white text-slate-950 p-6 text-slate-950 shadow-sm">
                <h2 className="text-2xl font-bold">{x["Variant Name"]}</h2>
                <p className="mt-2 text-slate-500">SKU: {x.SKU}</p>
                <p className="mt-3 text-2xl font-bold">{Number(x["Selling Price"]).toLocaleString()} MMK × {x.qty}</p>
                <button onClick={() => removeFromCart(x.SKU)} className="mt-4 rounded-full bg-red-500 px-4 py-2 text-white">Remove</button>
              </div>
            ))}
          </div>
          <aside className="rounded-3xl bg-white text-slate-950 p-6 text-slate-950 shadow-sm">
            <h3 className="text-2xl font-bold">Order Summary</h3>
            <div className="mt-6 flex justify-between"><span>Subtotal</span><b>{subtotal.toLocaleString()} MMK</b></div>
            <div className="mt-3 flex justify-between"><span>Delivery</span><b>3,000 MMK</b></div>
            <div className="mt-4 border-t pt-4 flex justify-between text-xl font-bold"><span>Total</span><span>{(subtotal + 3000).toLocaleString()} MMK</span></div>
            <Link href="/checkout" className="mt-6 block rounded-2xl bg-amber-400 py-4 text-center font-bold">Proceed to Checkout</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

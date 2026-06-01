"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const subtotal = cart.reduce((s: number, x: any) => s + Number(x["Selling Price"] || 0) * Number(x.qty || 1), 0);
  const delivery = cart.length > 0 ? 3000 : 0;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="text-blue-600">← Continue shopping</Link>
        <h1 className="mt-6 text-4xl font-bold">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">Cart is empty.</div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((x: any) => (
                <div key={x.SKU} className="rounded-3xl bg-white p-6 text-slate-950 shadow-sm">
                  <h2 className="text-2xl font-bold">{x["Variant Name"] || x.SKU}</h2>
                  <p className="mt-2 text-slate-500">SKU: {x.SKU}</p>
                  <p className="mt-3 text-2xl font-bold">
                    {Number(x["Selling Price"] || 0).toLocaleString()} MMK × {x.qty || 1}
                  </p>
                  <button onClick={() => removeFromCart(x.SKU)} className="mt-4 rounded-full bg-red-500 px-4 py-2 text-white">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <aside className="rounded-3xl bg-white p-6 text-slate-950 shadow-sm">
              <h3 className="text-2xl font-bold">Order Summary</h3>
              <div className="mt-6 flex justify-between"><span>Subtotal</span><b>{subtotal.toLocaleString()} MMK</b></div>
              <div className="mt-3 flex justify-between"><span>Delivery</span><b>{delivery.toLocaleString()} MMK</b></div>
              <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold">
                <span>Total</span>
                <span>{(subtotal + delivery).toLocaleString()} MMK</span>
              </div>
              <Link href="/checkout" className="mt-6 block rounded-2xl bg-amber-400 py-4 text-center font-bold text-slate-950">
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

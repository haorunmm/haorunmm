"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { erpApi } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const subtotal = cart.reduce((s: number, x: any) => s + Number(x["Selling Price"] || 0) * Number(x.qty || 1), 0);
  const delivery = cart.length > 0 ? 3000 : 0;

  async function placeOrder() {
    setError("");

    if (!name || !phone || !email || !address || cart.length === 0) {
      setError("Please fill name, phone, email, address and cart.");
      return;
    }

    const res = await erpApi.createOrder({
      "Customer Name": name,
      "Phone": phone,
      "Email": email,
      "Address": address,
      "Township": "Hlaing",
      "City": "Yangon",
      "Payment Method": "KBZPay",
      "Items": cart.map((x: any) => ({ SKU: x.SKU, Qty: Number(x.qty || 1) })),
      "Notes": "Website order",
    });

    if (!res?.success) {
      setError(res?.error || "Order failed");
      return;
    }

    clearCart();
    router.push(`/order-success/${encodeURIComponent(res.data["Order ID"])}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold">Checkout</h1>
          <input className="mt-6 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="mt-4 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="mt-4 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Email for order confirmation" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea className="mt-4 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <p className="mt-6 text-3xl font-bold">{(subtotal + delivery).toLocaleString()} MMK</p>
          {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-600">{error}</p>}
          <button onClick={placeOrder} className="mt-6 w-full rounded-full bg-amber-400 py-4 font-bold text-slate-950">
            Place Order
          </button>
        </div>
      </section>
    </main>
  );
}

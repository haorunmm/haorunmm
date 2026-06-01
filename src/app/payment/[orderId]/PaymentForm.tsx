"use client";

import { useState } from "react";
import { erpApi } from "@/lib/api";

export default function PaymentForm({ orderId }: { orderId: string }) {
  const [amount, setAmount] = useState("");
  const [ref, setRef] = useState("");
  const [shot, setShot] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    const res = await erpApi.createPayment({
      "Order ID": orderId,
      "Payment Method": "KBZPay",
      "Amount": Number(amount),
      "Transaction Reference": ref,
      "Screenshot URL": shot,
      "Notes": "Website payment",
    });

    setMsg(res?.success ? "Payment submitted. Admin will verify soon." : res?.error || "Payment failed.");
  }

  return (
    <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold">Submit Payment</h1>
      <p className="mt-3 text-slate-700">Order ID: <b>{orderId}</b></p>
      <input className="mt-6 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input className="mt-4 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Transaction Reference" value={ref} onChange={(e) => setRef(e.target.value)} />
      <input className="mt-4 w-full rounded-xl border bg-white p-4 text-slate-950 placeholder:text-slate-400" placeholder="Screenshot URL" value={shot} onChange={(e) => setShot(e.target.value)} />
      <button onClick={submit} className="mt-6 w-full rounded-full bg-amber-400 py-4 font-bold text-slate-950">Submit Payment</button>
      {msg && <p className="mt-4 rounded-xl bg-slate-100 p-4">{msg}</p>}
    </section>
  );
}

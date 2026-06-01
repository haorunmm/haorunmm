"use client";

import { useEffect, useState } from "react";
import { erpApi } from "@/lib/api";

export default function PaymentsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await erpApi.payments();
    setRows(res?.data || []);
  }

  async function verify(id: string) {
    const res = await erpApi.verifyPayment(id);
    setMsg(res?.success ? "Payment verified successfully." : res?.error || "Verification failed.");
    await load();
  }

  async function reject(id: string) {
    const res = await erpApi.rejectPayment(id);
    setMsg(res?.success ? "Payment rejected." : res?.error || "Reject failed.");
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-slate-950">
      <h1 className="text-4xl font-bold">Admin Payments</h1>
      <p className="mt-2 text-slate-600">Verify customer payment submissions.</p>

      {msg && <p className="mt-4 rounded-xl bg-amber-50 p-4 text-amber-700">{msg}</p>}

      <div className="mt-8 overflow-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-sm text-slate-950">
          <thead className="bg-slate-100">
            <tr>{["Payment ID", "Order ID", "Customer", "Amount", "Status", "Proof", "Action"].map((h) => <th className="p-4 text-left" key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((p: any) => (
              <tr className="border-t border-slate-200" key={p["Payment ID"]}>
                <td className="p-4">{p["Payment ID"]}</td>
                <td className="p-4">{p["Order ID"]}</td>
                <td className="p-4">{p["Customer Name"]}</td>
                <td className="p-4">{Number(p.Amount || 0).toLocaleString()} MMK</td>
                <td className="p-4">{p["Verification Status"]}</td>
                <td className="p-4">{p["Screenshot URL"] ? <a className="text-blue-600 underline" href={p["Screenshot URL"]} target="_blank">Open</a> : "-"}</td>
                <td className="p-4">
                  {p["Verification Status"] === "Pending" ? (
                    <div className="flex gap-2">
                      <button onClick={() => verify(p["Payment ID"])} className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white">Verify</button>
                      <button onClick={() => reject(p["Payment ID"])} className="rounded-full bg-red-600 px-4 py-2 font-bold text-white">Reject</button>
                    </div>
                  ) : "Done"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

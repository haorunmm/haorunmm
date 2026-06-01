"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { apiGet, erpApi } from "@/lib/api";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadPayments() {
    const res = await apiGet("getPayments");
    setPayments(res?.data || []);
  }

  async function verify(paymentId: string) {
    const res = await erpApi.verifyPayment(paymentId);

    if (res?.success) {
      setMessage("Payment verified successfully.");
      loadPayments();
    } else {
      setMessage(res?.error || "Verification failed.");
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <Layout>
      <div className="space-y-6 text-slate-950">
        <div>
          <h1 className="text-4xl font-bold text-slate-950">
            Payments
          </h1>

          <p className="mt-2 text-slate-600">
            Verify customer payment submissions.
          </p>
        </div>

        {message && (
          <div className="rounded-xl bg-amber-50 p-4 text-amber-700">
            {message}
          </div>
        )}

        <div className="overflow-auto rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm text-slate-950">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Payment ID</th>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Proof</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p: any) => (
                <tr
                  key={p["Payment ID"]}
                  className="border-t border-slate-200"
                >
                  <td className="p-4">{p["Payment ID"]}</td>
                  <td className="p-4">{p["Order ID"]}</td>
                  <td className="p-4">{p["Customer Name"]}</td>
                  <td className="p-4">{p["Payment Method"]}</td>
                  <td className="p-4">
                    {Number(p.Amount || 0).toLocaleString()} MMK
                  </td>
                  <td className="p-4">
                    {p["Verification Status"]}
                  </td>

                  <td className="p-4">
                    {p["Screenshot URL"] ? (
                      <a
                        href={p["Screenshot URL"]}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Open
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    {p["Verification Status"] === "Pending" ? (
                      <button
                        onClick={() =>
                          verify(p["Payment ID"])
                        }
                        className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white"
                      >
                        Verify
                      </button>
                    ) : (
                      <span className="text-slate-500">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

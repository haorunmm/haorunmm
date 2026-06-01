"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { apiGet, apiPost } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadOrders() {
    const res = await apiGet("getOrders");
    setOrders(res?.data || []);
  }

  async function updateStatus(
    orderId: string,
    status: string
  ) {
    const res = await apiPost("updateOrderStatus", {
      orderId,
      status,
    });

    if (res?.success) {
      setMessage(`Order ${orderId} updated to ${status}`);
      loadOrders();
    } else {
      setMessage(res?.error || "Update failed");
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">
          Order Management
        </h1>

        {message && (
          <div className="rounded-xl bg-emerald-50 p-4 text-emerald-700">
            {message}
          </div>
        )}

        <div className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o: any) => (
                <tr key={o["Order ID"]} className="border-t">
                  <td className="p-4">{o["Order ID"]}</td>
                  <td className="p-4">{o["Customer Name"]}</td>
                  <td className="p-4">{o["Phone"]}</td>
                  <td className="p-4">
                    {Number(o["Grand Total"] || 0).toLocaleString()} MMK
                  </td>
                  <td className="p-4">
                    {o["Payment Status"]}
                  </td>
                  <td className="p-4">
                    {o["Order Status"]}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            o["Order ID"],
                            "Processing"
                          )
                        }
                        className="rounded-lg bg-blue-500 px-3 py-2 text-white"
                      >
                        Process
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            o["Order ID"],
                            "Shipped"
                          )
                        }
                        className="rounded-lg bg-amber-500 px-3 py-2 text-white"
                      >
                        Ship
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            o["Order ID"],
                            "Delivered"
                          )
                        }
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-white"
                      >
                        Deliver
                      </button>

                    </div>
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

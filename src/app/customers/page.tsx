"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await apiGet("getCustomers");
      setCustomers(res?.data || []);
    }

    load();
  }, []);

  const activeCustomers = customers.filter(
    (c) => Number(c["Lifetime Orders"] || 0) > 0
  );

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Customer Management
          </h1>

          <p className="mt-2 text-slate-600">
            Customer CRM, order history and lifetime value tracking.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total Customers" value={customers.length} />
          <Card title="Active Customers" value={activeCustomers.length} />
          <Card
            title="VIP Customers"
            value={
              customers.filter(
                (c) =>
                  Number(c["Lifetime Sales"] || 0) >= 500000
              ).length
            }
          />
          <Card
            title="Total Revenue"
            value={`${customers
              .reduce(
                (sum, c) =>
                  sum +
                  Number(c["Lifetime Sales"] || 0),
                0
              )
              .toLocaleString()} MMK`}
          />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Customer ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Orders</th>
                <th className="p-4 text-left">Lifetime Sales</th>
                <th className="p-4 text-left">Last Order</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr
                  key={c["Customer ID"]}
                  className="border-t"
                >
                  <td className="p-4 font-semibold">
                    {c["Customer ID"]}
                  </td>

                  <td className="p-4">
                    {c["Customer Name"]}
                  </td>

                  <td className="p-4">
                    {c["Phone"]}
                  </td>

                  <td className="p-4">
                    {c["Email"]}
                  </td>

                  <td className="p-4">
                    {c["Lifetime Orders"]}
                  </td>

                  <td className="p-4">
                    {Number(
                      c["Lifetime Sales"] || 0
                    ).toLocaleString()} MMK
                  </td>

                  <td className="p-4">
                    {c["Last Order Date"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </Layout>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

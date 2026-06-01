"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await apiGet("getProductVariants");
      const rows = res?.data || [];

      setItems(rows);

      setLowStock(
        rows.filter(
          (x: any) =>
            Number(x["Available Stock"] || 0) <=
            Number(x["Reorder Level"] || 0)
        )
      );
    }

    load();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Inventory Management
          </h1>

          <p className="mt-2 text-slate-600">
            Real-time inventory monitoring.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <Card
            title="Total SKUs"
            value={items.length}
          />

          <Card
            title="Low Stock"
            value={lowStock.length}
          />

          <Card
            title="In Stock"
            value={
              items.filter(
                (x) =>
                  Number(
                    x["Available Stock"] || 0
                  ) > 0
              ).length
            }
          />

          <Card
            title="Out Of Stock"
            value={
              items.filter(
                (x) =>
                  Number(
                    x["Available Stock"] || 0
                  ) === 0
              ).length
            }
          />

        </div>

        <section className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Low Stock Alerts
          </h2>

          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">
                    SKU
                  </th>

                  <th className="p-3 text-left">
                    Product
                  </th>

                  <th className="p-3 text-left">
                    Available
                  </th>

                  <th className="p-3 text-left">
                    Reorder
                  </th>
                </tr>
              </thead>

              <tbody>
                {lowStock.map((item: any) => (
                  <tr
                    key={item.SKU}
                    className="border-b"
                  >
                    <td className="p-3">
                      {item.SKU}
                    </td>

                    <td className="p-3">
                      {item["Variant Name"]}
                    </td>

                    <td className="p-3 text-red-600 font-bold">
                      {item["Available Stock"]}
                    </td>

                    <td className="p-3">
                      {item["Reorder Level"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

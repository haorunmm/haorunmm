"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await apiGet("getReports");
      setReports(res?.data || []);
    }

    load();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Reports & Analytics</h1>
          <p className="mt-2 text-slate-600">
            Executive sales, profit, inventory, customer and partner reports.
          </p>
        </div>

        <section className="grid gap-5 md:grid-cols-4">
          <Card title="Report Rows" value={reports.length} />
          <Card title="Sales Reports" value={reports.filter((r) => String(r["Report Section"] || "").includes("Sales")).length} />
          <Card title="Profit Reports" value={reports.filter((r) => String(r["Report Section"] || "").includes("Profit")).length} />
          <Card title="Partner Reports" value={reports.filter((r) => String(r["Report Section"] || "").includes("Partner")).length} />
        </section>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Section</th>
                <th className="p-4 text-left">Metric</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Period</th>
                <th className="p-4 text-left">Updated</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-semibold">{r["Report Section"]}</td>
                  <td className="p-4">{r["Metric"]}</td>
                  <td className="p-4">{r["Value"]}</td>
                  <td className="p-4">{r["Period"]}</td>
                  <td className="p-4">{r["Last Updated"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

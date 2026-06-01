import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function FinancePage() {
  const res = await apiGet("getDashboard");
  const rows = res?.data || [];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Finance Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Revenue, cost, profit and business finance overview.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {rows.slice(0, 8).map((item: any, i: number) => (
            <div key={i} className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
              <p className="text-sm text-slate-500">{item.Metric}</p>
              <p className="mt-3 text-2xl font-bold">{item.Value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Profit Formula</h2>
          <p className="mt-4 text-lg text-slate-700">
            Revenue - Product Cost - Expenses - Refunds = Net Profit
          </p>
        </section>
      </div>
    </Layout>
  );
}

import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function AdminPage() {
  let rows: any[] = [];

  try {
    const res = await apiGet("getDashboard");
    rows = res?.data || [];
  } catch {
    rows = [];
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-500">
            HAORUN ERP
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Executive overview for orders, payments, inventory, finance and partners.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {rows.length === 0 ? (
            <>
              <Card title="Revenue" value="0 MMK" />
              <Card title="Orders" value="0" />
              <Card title="Payments" value="0" />
              <Card title="Inventory" value="0" />
            </>
          ) : (
            rows.slice(0, 8).map((item: any, i: number) => (
              <Card
                key={i}
                title={item.Metric || item.metric || "Metric"}
                value={item.Value || item.value || 0}
              />
            ))
          )}
        </div>

        <section className="rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
          <h2 className="text-2xl font-bold">System Status</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {["Orders", "Payments", "Inventory", "Partners"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">{item}</p>
                <p className="mt-2 font-bold text-emerald-600">Online</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

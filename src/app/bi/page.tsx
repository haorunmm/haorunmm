import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function BusinessIntelligencePage() {
  let dashboard: any = {};

  try {
    const res = await apiGet("getDashboard");
    dashboard = res?.data || {};
  } catch {
    dashboard = {};
  }

  const cards = [
    ["Revenue", dashboard["Revenue"] || "0 MMK"],
    ["Net Profit", dashboard["Net Profit"] || "0 MMK"],
    ["Orders", dashboard["Orders"] || 0],
    ["Customers", dashboard["Customers"] || 0],
    ["Inventory Value", dashboard["Inventory Value"] || "0 MMK"],
    ["Refunds", dashboard["Refunds"] || "0 MMK"],
    ["Expenses", dashboard["Expenses"] || "0 MMK"],
    ["Partners", dashboard["Partners"] || 0],
  ];

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <p className="text-sm uppercase tracking-widest text-slate-500">
            Executive Analytics
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Business Intelligence
          </h1>

          <p className="mt-3 text-slate-600">
            Executive decision dashboard and company-wide KPI center.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(([title, value]) => (
            <div
              key={title}
              className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">
                {title}
              </p>

              <p className="mt-4 text-3xl font-bold">
                {value}
              </p>
            </div>
          ))}
        </div>

        <section className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
            <h2 className="text-2xl font-bold">
              Revenue Analysis
            </h2>

            <div className="mt-6 space-y-3">
              <Row label="Revenue" value={dashboard["Revenue"]} />
              <Row label="Expenses" value={dashboard["Expenses"]} />
              <Row label="Refunds" value={dashboard["Refunds"]} />
              <Row label="Net Profit" value={dashboard["Net Profit"]} />
            </div>
          </div>

          <div className="rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
            <h2 className="text-2xl font-bold">
              Operations Analysis
            </h2>

            <div className="mt-6 space-y-3">
              <Row label="Orders" value={dashboard["Orders"]} />
              <Row label="Customers" value={dashboard["Customers"]} />
              <Row label="Partners" value={dashboard["Partners"]} />
              <Row label="Low Stock" value={dashboard["Low Stock"]} />
            </div>
          </div>

        </section>

      </div>
    </Layout>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span>{label}</span>
      <span className="font-bold">{value || 0}</span>
    </div>
  );
}

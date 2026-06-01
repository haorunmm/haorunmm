import Layout from "@/components/layout/Layout";
import { erpApi } from "@/lib/api";

type MetricRow = {
  Metric: string;
  Value: number | string;
  Section: string;
  "Last Updated": string;
};

function getValue(rows: MetricRow[], metric: string) {
  return rows.find((row) => row.Metric === metric)?.Value ?? 0;
}

function money(value: number | string) {
  return `${Number(value || 0).toLocaleString()} MMK`;
}

export default async function DashboardPage() {
  const res = await erpApi.dashboard();
  const rows: MetricRow[] = res?.data || [];

  const cards = [
    ["Total Revenue", money(getValue(rows, "Total Revenue"))],
    ["Net Profit", money(getValue(rows, "Net Profit"))],
    ["Total Orders", getValue(rows, "Total Orders")],
    ["Paid Orders", getValue(rows, "Paid Orders")],
    ["Inventory Value", money(getValue(rows, "Inventory Value"))],
    ["Current Stock Qty", getValue(rows, "Current Stock Qty")],
    ["Total Customers", getValue(rows, "Total Customers")],
    ["Active Partners", getValue(rows, "Active Partners")],
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Live ERP data from Google Sheets and Apps Script.
          </p>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(([title, value]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white text-slate-950 p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{title}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {["Sales", "Profit", "Inventory", "Customers", "Partners"].map((section) => (
            <div key={section} className="rounded-2xl border border-slate-200 bg-white text-slate-950 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">{section}</h2>

              <div className="space-y-3">
                {rows
                  .filter((row) => row.Section === section)
                  .map((row) => (
                    <div key={row.Metric} className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">{row.Metric}</span>
                      <span className="font-semibold text-slate-900">
                        {typeof row.Value === "number"
                          ? row.Value.toLocaleString()
                          : row.Value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}

import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function RefundsPage() {
  let rows: any[] = [];

  try {
    const res = await apiGet("getRefunds");
    rows = res?.data || [];
  } catch {
    rows = [];
  }

  const totalRefunds = rows.reduce(
    (sum, item) => sum + Number(item["Refund Amount"] || 0),
    0
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Refunds & Returns</h1>
          <p className="mt-2 text-slate-600">
            Manage refund requests, approvals, completed refunds and customer returns.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Refund Records" value={rows.length} />
          <Card title="Total Refunds" value={`${totalRefunds.toLocaleString()} MMK`} />
          <Card title="Pending" value={rows.filter((x) => x["Refund Status"] === "Pending").length} />
          <Card title="Completed" value={rows.filter((x) => x["Refund Status"] === "Completed").length} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Refund ID</th>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Reason</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Approval</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((x, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-semibold">{x["Refund ID"]}</td>
                  <td className="p-4">{x["Order ID"]}</td>
                  <td className="p-4">{x["Customer Name"]}</td>
                  <td className="p-4">{x["Refund Reason"]}</td>
                  <td className="p-4">{Number(x["Refund Amount"] || 0).toLocaleString()} MMK</td>
                  <td className="p-4">{x["Approval Status"]}</td>
                  <td className="p-4">{x["Refund Status"]}</td>
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

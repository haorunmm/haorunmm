import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function SettlementsPage() {
  const reports = await apiGet("getReports");
  const rows = reports?.data || [];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Partner Settlements</h1>
          <p className="mt-2 text-slate-600">
            Commission, payout and settlement monitoring.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Pending Settlement" value="0 MMK" />
          <Card title="HAORUN Commission" value="0 MMK" />
          <Card title="Partner Payout" value="0 MMK" />
          <Card title="Settlement Status" value="Ready" />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Section</th>
                <th className="p-4 text-left">Metric</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Period</th>
              </tr>
            </thead>

            <tbody>
              {rows
                .filter((r: any) =>
                  String(r["Report Section"] || "")
                    .toLowerCase()
                    .includes("partner")
                )
                .map((r: any, i: number) => (
                  <tr key={i} className="border-t">
                    <td className="p-4 font-semibold">{r["Report Section"]}</td>
                    <td className="p-4">{r["Metric"]}</td>
                    <td className="p-4">{r["Value"]}</td>
                    <td className="p-4">{r["Period"]}</td>
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

import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function AuditPage() {
  let rows: any[] = [];

  try {
    const res = await apiGet("getAuditLogs");
    rows = res?.data || [];
  } catch {
    rows = [];
  }

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Audit Logs
          </h1>

          <p className="mt-2 text-slate-600">
            Complete system activity history and security audit trail.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total Logs" value={rows.length} />
          <Card title="Today" value={rows.filter(x => String(x.Date || "").includes(String(new Date().getFullYear()))).length} />
          <Card title="Users" value={[...new Set(rows.map(x => x.User))].length} />
          <Card title="Modules" value={[...new Set(rows.map(x => x.Module))].length} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Module</th>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Entity</th>
                <th className="p-4 text-left">Entity ID</th>
                <th className="p-4 text-left">Old Value</th>
                <th className="p-4 text-left">New Value</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((x, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4">{x.Date}</td>
                  <td className="p-4">{x.User}</td>
                  <td className="p-4">{x.Module}</td>
                  <td className="p-4 font-semibold">{x.Action}</td>
                  <td className="p-4">{x["Entity Type"]}</td>
                  <td className="p-4">{x["Entity ID"]}</td>
                  <td className="p-4">{x["Old Value"]}</td>
                  <td className="p-4">{x["New Value"]}</td>
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

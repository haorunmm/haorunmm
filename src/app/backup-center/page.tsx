import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function BackupCenterPage() {
  let health: any = {};
  let backups: any[] = [];

  try {
    const h = await apiGet("getSystemHealth");
    health = h?.data || {};
  } catch {}

  try {
    const b = await apiGet("getBackups");
    backups = b?.data || [];
  } catch {}

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Backup Center</h1>
          <p className="mt-2 text-slate-600">
            System health, database backups and restore monitoring.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Missing Tabs" value={health.missingTabs?.length || 0} />
          <Card title="Low Stock Items" value={health.lowStockItems || 0} />
          <Card title="Pending Payments" value={health.pendingPayments || 0} />
          <Card title="Backups" value={backups.length} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold">Backup History</h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Backup ID</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Records</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Restore Tested</th>
                <th className="p-4 text-left">Link</th>
              </tr>
            </thead>

            <tbody>
              {backups.map((x, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-semibold">{x["Backup ID"]}</td>
                  <td className="p-4">{x["Backup DateTime"]}</td>
                  <td className="p-4">{x["Backup Type"]}</td>
                  <td className="p-4">{x["Record Count"]}</td>
                  <td className="p-4">{x["Backup Status"]}</td>
                  <td className="p-4">{x["Restore Tested"]}</td>
                  <td className="p-4">
                    {x["Storage Location"] ? (
                      <a href={x["Storage Location"]} target="_blank" className="text-blue-600 underline">
                        Open
                      </a>
                    ) : "-"}
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

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

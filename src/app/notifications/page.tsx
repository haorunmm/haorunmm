import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function NotificationsPage() {
  let rows: any[] = [];

  try {
    const res = await apiGet("getNotifications");
    rows = res?.data || [];
  } catch {
    rows = [];
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Notification Center</h1>
          <p className="mt-2 text-slate-600">
            System alerts, low stock, payments, settlements and security notifications.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total" value={rows.length} />
          <Card title="Unread" value={rows.filter((x) => x.Status === "Unread").length} />
          <Card title="High Priority" value={rows.filter((x) => x.Priority === "High").length} />
          <Card title="Critical" value={rows.filter((x) => x.Priority === "Critical").length} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((x, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4">{x.Date}</td>
                  <td className="p-4">{x.Type}</td>
                  <td className="p-4 font-semibold">{x.Priority}</td>
                  <td className="p-4 font-semibold">{x.Title}</td>
                  <td className="p-4">{x.Message}</td>
                  <td className="p-4">{x.Status}</td>
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

import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function SystemSettingsPage() {
  let settings: any[] = [];
  let payments: any[] = [];

  try {
    const s = await apiGet("getSettings");
    settings = s?.data || [];
  } catch {}

  try {
    const p = await apiGet("getPaymentMethods");
    payments = p?.data || [];
  } catch {}

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">System Settings</h1>
          <p className="mt-2 text-slate-600">
            Business settings, payment methods, delivery fees and ERP configuration.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Settings" value={settings.length} />
          <Card title="Payment Methods" value={payments.length} />
          <Card title="Currency" value="MMK" />
          <Card title="Status" value="Online" />
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-2xl font-bold">Business Settings</h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">Key</th>
                  <th className="p-4 text-left">Value</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {settings.map((x, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4 font-semibold">{x.Key}</td>
                    <td className="p-4">{x.Value}</td>
                    <td className="p-4">{x.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">Method</th>
                  <th className="p-4 text-left">Account</th>
                  <th className="p-4 text-left">Number</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((x, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4 font-semibold">{x["Method Name"]}</td>
                    <td className="p-4">{x["Account Name"]}</td>
                    <td className="p-4">{x["Account Number"]}</td>
                    <td className="p-4">{x.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

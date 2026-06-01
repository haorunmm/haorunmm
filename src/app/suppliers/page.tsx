import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function SuppliersPage() {
  let partners: any[] = [];

  try {
    const res = await apiGet("getPartners");
    partners = res?.data || [];
  } catch {
    partners = [];
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Supplier Management</h1>
          <p className="mt-2 text-slate-600">
            Manage suppliers, partner shops, sourcing contacts and payment terms.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total Suppliers" value={partners.length} />
          <Card title="Active" value={partners.filter((x) => x.Status === "Active").length} />
          <Card title="Weekly Settlement" value={partners.filter((x) => x["Settlement Cycle"] === "Weekly").length} />
          <Card title="Avg Commission" value="20%" />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Supplier ID</th>
                <th className="p-4 text-left">Supplier Name</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Payment Terms</th>
                <th className="p-4 text-left">Commission</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {partners.map((p) => (
                <tr key={p["Partner ID"]} className="border-t">
                  <td className="p-4 font-semibold">{p["Partner ID"]}</td>
                  <td className="p-4">{p["Partner Name"]}</td>
                  <td className="p-4">{p["Contact Person"]}</td>
                  <td className="p-4">{p.Phone}</td>
                  <td className="p-4">{p.Email}</td>
                  <td className="p-4">{p["Settlement Cycle"]}</td>
                  <td className="p-4">{p["Commission Rate"]}%</td>
                  <td className="p-4">{p.Status}</td>
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

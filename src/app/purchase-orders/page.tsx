import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function PurchaseOrdersPage() {
  let rows: any[] = [];

  try {
    const res = await apiGet("getPurchaseOrders");
    rows = res?.data || [];
  } catch {
    rows = [];
  }

  const totalValue = rows.reduce(
    (sum, x) => sum + Number(x["Total Amount"] || 0),
    0
  );

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Purchase Orders
          </h1>

          <p className="mt-2 text-slate-600">
            Procurement, supplier purchasing and inventory replenishment.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total POs" value={rows.length} />
          <Card
            title="Pending"
            value={rows.filter(x => x.Status === "Pending").length}
          />
          <Card
            title="Received"
            value={rows.filter(x => x.Status === "Received").length}
          />
          <Card
            title="PO Value"
            value={`${totalValue.toLocaleString()} MMK`}
          />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">PO ID</th>
                <th className="p-4 text-left">Supplier</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Items</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Expected</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((x, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-semibold">
                    {x["PO ID"]}
                  </td>

                  <td className="p-4">
                    {x["Supplier Name"]}
                  </td>

                  <td className="p-4">
                    {x["PO Date"]}
                  </td>

                  <td className="p-4">
                    {x["Item Count"]}
                  </td>

                  <td className="p-4">
                    {Number(
                      x["Total Amount"] || 0
                    ).toLocaleString()} MMK
                  </td>

                  <td className="p-4">
                    {x.Status}
                  </td>

                  <td className="p-4">
                    {x["Expected Date"]}
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

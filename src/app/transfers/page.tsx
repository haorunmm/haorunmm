import Layout from "@/components/layout/Layout";

const transfers = [
  {
    id: "TRF-000001",
    from: "Main Warehouse",
    to: "Yangon Branch",
    sku: "P000001-XL-BLA",
    qty: 50,
    status: "In Transit",
    date: "2026-05-30",
  },
];

export default function TransfersPage() {
  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Warehouse Transfers
          </h1>

          <p className="mt-2 text-slate-600">
            Manage stock movement between warehouses and branches.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Transfers" value={transfers.length} />
          <Card
            title="In Transit"
            value={
              transfers.filter(
                (x) => x.status === "In Transit"
              ).length
            }
          />
          <Card
            title="Completed"
            value={
              transfers.filter(
                (x) => x.status === "Completed"
              ).length
            }
          />
          <Card title="Warehouses" value="2" />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Transfer ID</th>
                <th className="p-4 text-left">From</th>
                <th className="p-4 text-left">To</th>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Qty</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {transfers.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-4 font-semibold">
                    {t.id}
                  </td>

                  <td className="p-4">
                    {t.from}
                  </td>

                  <td className="p-4">
                    {t.to}
                  </td>

                  <td className="p-4">
                    {t.sku}
                  </td>

                  <td className="p-4">
                    {t.qty}
                  </td>

                  <td className="p-4">
                    {t.date}
                  </td>

                  <td className="p-4">
                    {t.status}
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

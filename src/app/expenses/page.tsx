import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function ExpensesPage() {
  let rows: any[] = [];

  try {
    const res = await apiGet("getExpenses");
    rows = res?.data || [];
  } catch {
    rows = [];
  }

  const total = rows.reduce(
    (sum, item) => sum + Number(item.Amount || 0),
    0
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Expense Management</h1>
          <p className="mt-2 text-slate-600">
            Track business expenses, receipts and approval status.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total Expenses" value={`${total.toLocaleString()} MMK`} />
          <Card title="Records" value={rows.length} />
          <Card title="Approved" value={rows.filter((x) => x.Status === "Approved").length} />
          <Card title="Pending" value={rows.filter((x) => x.Status === "Pending").length} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Expense ID</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((x, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-semibold">{x["Expense ID"]}</td>
                  <td className="p-4">{x["Expense Date"]}</td>
                  <td className="p-4">{x["Expense Category"]}</td>
                  <td className="p-4">{x["Expense Name"]}</td>
                  <td className="p-4">{Number(x.Amount || 0).toLocaleString()} MMK</td>
                  <td className="p-4">{x["Payment Method"]}</td>
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

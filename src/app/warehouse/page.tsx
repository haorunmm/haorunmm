import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function WarehousePage() {
  let inventory: any[] = [];

  try {
    const res = await apiGet("getProductVariants");
    inventory = res?.data || [];
  } catch {
    inventory = [];
  }

  const totalStock = inventory.reduce(
    (sum, item) => sum + Number(item["Stock"] || 0),
    0
  );

  const reservedStock = inventory.reduce(
    (sum, item) => sum + Number(item["Reserved Stock"] || 0),
    0
  );

  const availableStock = inventory.reduce(
    (sum, item) => sum + Number(item["Available Stock"] || 0),
    0
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Warehouse Management</h1>
          <p className="mt-2 text-slate-600">
            Stock locations, available stock, reserved stock and warehouse control.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total SKUs" value={inventory.length} />
          <Card title="Total Stock" value={totalStock} />
          <Card title="Reserved Stock" value={reservedStock} />
          <Card title="Available Stock" value={availableStock} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Reserved</th>
                <th className="p-4 text-left">Available</th>
                <th className="p-4 text-left">Reorder Level</th>
                <th className="p-4 text-left">Warehouse</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.SKU} className="border-t">
                  <td className="p-4 font-semibold">{item.SKU}</td>
                  <td className="p-4">{item["Variant Name"]}</td>
                  <td className="p-4">{item["Stock"]}</td>
                  <td className="p-4">{item["Reserved Stock"]}</td>
                  <td className="p-4 font-semibold">{item["Available Stock"]}</td>
                  <td className="p-4">{item["Reorder Level"]}</td>
                  <td className="p-4">Main Warehouse</td>
                  <td className="p-4">{item.Status}</td>
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

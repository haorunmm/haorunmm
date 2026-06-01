import Layout from "@/components/layout/Layout";
import { erpApi } from "@/lib/api";

export default async function ProductsPage() {
  const res = await erpApi.variants();
  const products = res?.data || [];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="mt-2 text-slate-600">Live products from Google Sheets ERP.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Available</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item: any) => (
                <tr key={item.SKU} className="border-t">
                  <td className="p-4 font-medium">{item.SKU}</td>
                  <td className="p-4">{item["Variant Name"]}</td>
                  <td className="p-4">{item["Selling Price"]} MMK</td>
                  <td className="p-4">{item.Stock}</td>
                  <td className="p-4">{item["Available Stock"]}</td>
                  <td className="p-4">{item.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

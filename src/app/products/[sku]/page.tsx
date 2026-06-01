import Link from "next/link";
import { erpApi } from "@/lib/api";
import AddToCart from "./AddToCart";

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const res = await erpApi.variants();
  const product = (res?.data || []).find((x: any) => x.SKU === decodeURIComponent(sku));

  if (!product) return <main className="p-10">Product not found</main>;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="flex min-h-[480px] items-center justify-center rounded-3xl bg-white text-slate-950 shadow-sm">
          <div className="flex h-80 w-80 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">Product Image</div>
        </div>
        <div className="rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
          <Link href="/" className="text-blue-600">← Back</Link>
          <p className="mt-6 text-sm text-slate-500">SKU: {product.SKU}</p>
          <h1 className="mt-3 text-4xl font-bold">{product["Variant Name"]}</h1>
          <p className="mt-4 text-yellow-500">★★★★★</p>
          <p className="mt-6 text-4xl font-bold">{Number(product["Selling Price"]).toLocaleString()} MMK</p>
          <p className="mt-4 text-slate-600">Available: {product["Available Stock"]}</p>
          <AddToCart product={product} />
        </div>
      </section>
    </main>
  );
}

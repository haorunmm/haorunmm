import Link from "next/link";
import { erpApi } from "@/lib/api";

export default async function HomePage() {
  const res = await erpApi.variants();
  const products = res?.success ? res.data : [];

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 bg-slate-900 text-white">
        <div className="flex items-center gap-4 px-6 py-4">
          <Link href="/" className="text-2xl font-bold">HAORUN</Link>
          <input className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-400" placeholder="Search HAORUN products" />
          <Link href="/track" className="text-sm">Orders</Link>
          <Link href="/cart" className="font-bold">Cart</Link>
        </div>
        <nav className="flex gap-6 overflow-x-auto bg-slate-800 px-6 py-3 text-sm">
          {["Home","T-Shirts","Bags","Keychains","Accessories","Best Sellers"].map((x) => <span key={x}>{x}</span>)}
        </nav>
      </header>

      <section className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-amber-300">HAORUN 浩润</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold">Premium Everyday Products</h1>
          <p className="mt-4 text-slate-200">Simple ordering, fast delivery, ERP-powered stock control.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p: any) => (
            <div key={p.SKU} className="overflow-hidden rounded-2xl bg-white text-slate-950 shadow-sm">
              <div className="flex h-60 items-center justify-center bg-slate-200 text-slate-500">
  Product Image
</div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-slate-950">
  {p["Variant Name"] || p.SKU}
</h3>
                <p className="mt-2 text-sm text-slate-500">SKU: {p.SKU}</p>
                <p className="mt-2 text-yellow-500">★★★★★</p>
                <p className="mt-3 text-2xl font-bold text-slate-950">
  {Number(p["Selling Price"] || 0).toLocaleString()} MMK
</p>
                <p className="mt-1 text-sm text-slate-500">Available: {p["Available Stock"]}</p>
                <Link href={`/products/${encodeURIComponent(p.SKU)}`} className="mt-4 block rounded-full bg-amber-400 py-3 text-center font-bold text-slate-950">See options</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

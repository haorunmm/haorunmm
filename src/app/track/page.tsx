import Link from "next/link";
import { apiGet } from "@/lib/api";

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  let order: any = null;
  let error = "";

  if (orderId) {
    try {
      const res = await apiGet("getOrder", { orderId });
      order = res?.data;
      if (!order) error = "Order not found.";
    } catch (e: any) {
      error = e.message || "Tracking failed.";
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
        <Link href="/" className="text-sm text-blue-600">← Back to shop</Link>

        <h1 className="mt-6 text-4xl font-bold">Track Order</h1>

        <form className="mt-6 flex gap-3">
          <input
            name="orderId"
            defaultValue={orderId || ""}
            placeholder="Enter Order ID"
            className="flex-1 rounded-xl border px-4 py-3"
          />
          <button className="rounded-xl bg-amber-400 px-6 font-semibold">
            Track
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Order ID</p>
              <p className="text-xl font-bold">{order["Order ID"]}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Info label="Customer" value={order["Customer Name"]} />
              <Info label="Phone" value={order["Phone"]} />
              <Info label="Payment Status" value={order["Payment Status"]} />
              <Info label="Order Status" value={order["Order Status"]} />
              <Info label="Grand Total" value={`${order["Grand Total"]} MMK`} />
              <Info label="Tracking Number" value={order["Tracking Number"] || "-"} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

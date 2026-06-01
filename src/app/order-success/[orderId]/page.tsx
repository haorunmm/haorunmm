import Link from "next/link";

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const id = decodeURIComponent(orderId);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-700">✓</div>
        <h1 className="mt-6 text-4xl font-bold">Order Created Successfully</h1>
        <p className="mt-6 text-3xl font-bold">{id}</p>
        <Link href={`/payment/${encodeURIComponent(id)}`} className="mt-8 inline-block rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950">
          Submit Payment
        </Link>
      </section>
    </main>
  );
}

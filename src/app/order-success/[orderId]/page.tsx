import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const id = decodeURIComponent(orderId);
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white text-slate-950 p-10 text-center shadow-sm">
        <h1 className="text-4xl font-bold">Order Created Successfully</h1>
        <p className="mt-6 text-3xl font-bold text-slate-950">{id}</p>
        <Link href={`/payment/${encodeURIComponent(id)}`} className="mt-8 inline-block rounded-full bg-amber-400 px-6 py-3 font-bold">Submit Payment</Link>
      </section>
    </main>
  );
}

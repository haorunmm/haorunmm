import Link from "next/link";
import PaymentForm from "./PaymentForm";

export default async function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <PaymentForm orderId={decodeURIComponent(orderId)} />
    
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
        >
          Continue Shopping
        </Link>

      </main>
  );
}
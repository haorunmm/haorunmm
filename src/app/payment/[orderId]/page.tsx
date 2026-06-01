import PaymentForm from "./PaymentForm";

export default async function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <PaymentForm orderId={decodeURIComponent(orderId)} />
    </main>
  );
}

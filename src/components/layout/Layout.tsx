import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="pl-72">
        <Header />
        <main className="min-h-screen px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

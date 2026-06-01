export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Admin Panel</p>
          <h2 className="text-2xl font-bold text-slate-950">
            HAORUN ERP Management
          </h2>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          haorun.mm@gmail.com
        </div>
      </div>
    </header>
  );
}

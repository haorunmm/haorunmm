import Link from "next/link";

const navItems = [
  ["Dashboard", "/admin"],
  ["Orders", "/orders"],
  ["Products", "/products"],
  ["Inventory", "/inventory"],
  ["Warehouse", "/warehouse"],
  ["Transfers", "/transfers"],
  ["Suppliers", "/suppliers"],
  ["Purchase Orders", "/purchase-orders"],
  ["Payments", "/payments"],
  ["Partners", "/partners"],
  ["Customers", "/customers"],
  ["Business Intelligence", "/bi"],
  ["Reports", "/reports"],
  ["Finance", "/finance"],
  ["Expenses", "/expenses"],
  ["Refunds", "/refunds"],
  ["Settlements", "/settlements"],
  ["Users", "/users"],
  ["Permissions", "/permissions"],
  ["Audit Logs", "/audit"],
  ["Notifications", "/notifications"],
  ["System Settings", "/system-settings"],
  ["Backup Center", "/backup-center"],
  ["Scheduled Reports", "/scheduled-reports"],
  ["Settings", "/settings"],
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-200 bg-white px-5 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          HAORUN
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Commerce ERP
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-slate-950"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

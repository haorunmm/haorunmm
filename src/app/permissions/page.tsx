import Layout from "@/components/layout/Layout";

const roles = ["Owner", "Admin", "Finance", "Inventory", "Order", "Partner", "Viewer"];

const permissions = [
  ["Dashboard", true, true, true, true, true, true, true],
  ["Orders", true, true, false, false, true, false, true],
  ["Payments", true, true, true, false, false, false, true],
  ["Products", true, true, false, true, false, false, true],
  ["Inventory", true, true, false, true, false, false, true],
  ["Partners", true, true, false, false, false, true, true],
  ["Finance", true, true, true, false, false, false, false],
  ["Reports", true, true, true, true, true, true, true],
  ["Settings", true, false, false, false, false, false, false],
];

export default function PermissionsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Role Permissions</h1>
          <p className="mt-2 text-slate-600">
            Control who can access ERP modules and business functions.
          </p>
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Module</th>
                {roles.map((role) => (
                  <th key={role} className="p-4 text-center">{role}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {permissions.map((row) => (
                <tr key={String(row[0])} className="border-t">
                  <td className="p-4 font-semibold">{row[0]}</td>
                  {row.slice(1).map((allowed, i) => (
                    <td key={i} className="p-4 text-center">
                      {allowed ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                          Allow
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-50 px-3 py-1 font-semibold text-red-700">
                          Deny
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}

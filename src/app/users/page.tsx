import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function UsersPage() {
  let users: any[] = [];

  try {
    const res = await apiGet("getUsers");
    users = res?.data || [];
  } catch {
    users = [];
  }

  return (
    <Layout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            User Management
          </h1>

          <p className="mt-2 text-slate-600">
            Manage ERP users, roles and permissions.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Total Users" value={users.length} />
          <Card title="Admins" value={users.filter(x => x.Role === "Admin").length} />
          <Card title="Finance" value={users.filter(x => x.Role === "Finance").length} />
          <Card title="Active" value={users.filter(x => x.Status === "Active").length} />
        </div>

        <section className="overflow-auto rounded-3xl bg-white text-slate-950 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">User ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Last Login</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-semibold">{u["User ID"]}</td>
                  <td className="p-4">{u["Full Name"]}</td>
                  <td className="p-4">{u.Email}</td>
                  <td className="p-4">{u.Role}</td>
                  <td className="p-4">{u.Department}</td>
                  <td className="p-4">{u.Status}</td>
                  <td className="p-4">{u["Last Login"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </Layout>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

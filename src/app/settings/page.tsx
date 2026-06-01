import Layout from "@/components/layout/Layout";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Settings</h1>
        <div className="rounded-2xl border border-slate-200 bg-white text-slate-950 p-6 shadow-sm">
          <p className="text-slate-600">
            Business settings, payment methods, township fees, email templates, and automation controls.
          </p>
        </div>
      </div>
    </Layout>
  );
}

import Layout from "@/components/layout/Layout";
import { apiGet } from "@/lib/api";

export default async function ScheduledReportsPage() {
  let reports: any[] = [];

  try {
    const res = await apiGet("getReports");
    reports = res?.data || [];
  } catch {}

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Scheduled Reports</h1>
          <p className="mt-2 text-slate-600">
            Daily, weekly and monthly report automation center.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Daily Report" value="Active" />
          <Card title="Weekly Partner Email" value="Active" />
          <Card title="Monthly Report" value="Active" />
          <Card title="Report Rows" value={reports.length} />
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <ScheduleCard title="Daily Owner Report" time="Every day · 8:00 AM" />
          <ScheduleCard title="Weekly Partner Statement" time="Every Monday · 8:00 AM" />
          <ScheduleCard title="Monthly Executive Report" time="Every Month · Day 1" />
        </section>
      </div>
    </Layout>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}

function ScheduleCard({ title, time }: { title: string; time: string }) {
  return (
    <div className="rounded-3xl bg-white text-slate-950 p-8 shadow-sm">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-slate-600">{time}</p>
      <p className="mt-6 rounded-full bg-emerald-50 px-4 py-2 text-center font-semibold text-emerald-700">
        Automation Ready
      </p>
    </div>
  );
}

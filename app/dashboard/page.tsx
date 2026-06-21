import DashboardClient from "@/components/DashboardClient";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-black text-slate-900">
          Field Monitoring Dashboard
        </h1>

        <p className="mb-8 text-slate-600">
          Explore calculated indicators from monitored field locations.
        </p>

        <DashboardClient/>

      </div>
    </main>
  );
}
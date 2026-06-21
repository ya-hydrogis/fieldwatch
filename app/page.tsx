import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="grid min-h-screen place-items-center px-6">
        <div className="max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-emerald-400">
            Field Monitoring Dashboard
          </p>

          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            FieldWatch
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-slate-300">
            A lightweight data representation app for monitored field locations.
            Explore monthly and yearly field records, calculated indicators, and
            regional summary metrics in one interactive dashboard.
          </p>

          <Link
            href="/dashboard"
            className="rounded-xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Open Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
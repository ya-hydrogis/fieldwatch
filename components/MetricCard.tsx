type MetricCardProps = {
  title: string;
  value: string;
  description: string;
};

export default function MetricCard({
  title,
  value,
  description,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase text-slate-500">{title}</p>
      <p className="mt-2 text-4xl font-black text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
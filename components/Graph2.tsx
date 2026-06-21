"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type N2Record = {
  year: number;
  n2Value: number;
};

type Graph2Props = {
  data: N2Record[];
};

export default function Graph2({ data }: Graph2Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Graph 2: Yearly N2
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Yearly aggregated N2 values for the selected fields and date range.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="grid h-[320px] place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
          Click “Calculate N2 using Python backend” to generate this chart.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="n2Value"
              name="N2"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
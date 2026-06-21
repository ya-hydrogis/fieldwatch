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

import type { N1Record } from "@/lib/calculations";
import {
  convertN1RecordsToGraph1Data,
  getUniqueFieldNames,
} from "@/lib/chartTransforms";

import { chartColors, chartDashArrays } from "@/lib/chartStyles";

type Graph1Props = {
  data: N1Record[];
};

export default function Graph1({ data }: Graph1Props) {
  const fieldNames = getUniqueFieldNames(data);
  const chartData = convertN1RecordsToGraph1Data(data);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Graph 1: Monthly N1
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Monthly calculated N1 values for the selected field locations.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            angle={-30}
            textAnchor="end"
            height={70}
            label={{
              value: "Date",
              position: "insideBottom",
              offset: -10,
            }}
          />

          <YAxis
            label={{
              value: "N1 value",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          {fieldNames.map((fieldName, index) => (
              <Line
                key={fieldName}
                type="monotone"
                dataKey={fieldName}
                name={fieldName}
                stroke={chartColors[index % chartColors.length]}
                strokeDasharray={chartDashArrays[index % chartDashArrays.length]}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
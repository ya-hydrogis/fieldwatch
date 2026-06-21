"use client";

import { useEffect, useState } from "react";
import MetricCard from "@/components/MetricCard";

import type { fieldMetadata } from "@/lib/fieldMetadata";
import type {
  MonthlyFieldRecord,
  YearlyFieldRecord,
} from "@/lib/dummyFieldData";

import {
  calculateN1Records,
  average,
  minimum,
  maximum,
} from "@/lib/calculations";

import Graph1 from "@/components/Graph1";

import Graph2, { type N2Record } from "@/components/Graph2";

export default function DashboardClient() {

  const [fields, setFields] = useState<FieldMetadata[]>([]);
  const [monthlyRecords, setMonthlyRecords] = useState<MonthlyFieldRecord[]>([]);
  const [yearlyRecords, setYearlyRecords] = useState<YearlyFieldRecord[]>([]);

  const [fromDate, setFromDate] = useState("2023-01-01");
  const [toDate, setToDate] = useState("2025-12-31");

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [n2Data, setN2Data] = useState<N2Record[]>([]);

  const [isCalculatingN2, setIsCalculatingN2] = useState(false);
  const [n2Error, setN2Error] = useState("");

  const [isLoadingFieldData, setIsLoadingFieldData] = useState(true);
  const [fieldDataError, setFieldDataError] = useState("");

  const filteredMonthlyData = monthlyRecords.filter((record) => {
      return (
          record.date >= fromDate &&
          record.date <= toDate &&
          selectedFields.includes(record.fieldName)
          );
      });
  const n1Records = calculateN1Records(
      filteredMonthlyData,
      yearlyRecords
      );

  useEffect(() => {
  setN2Data([]);
  setN2Error("");
}, [fromDate, toDate, selectedFields]);

  useEffect(() => {
      async function loadFieldData() {
          setIsLoadingFieldData(true);
          setFieldDataError("");

          try {
              const response = await fetch("/api/field-data");

              if (!response.ok) {
                  throw new Error ('Failed to load field data.');
                  }

              const data = await response.json();

              setFields(data.fields);
              setMonthlyRecords(data.monthlyRecords);
              setYearlyRecords(data.yearlyRecords);

              setSelectedFields(data.fields.map((fieldMetaRecord)=>fieldMetaRecord.fieldName))

              } catch (error) {
                  setFieldDataError("Something went wrong while loading field data.");
                  } finally {
                      setIsLoadingFieldData(false);
                      }
          }
      loadFieldData();
      }, []);

  const index1 = average(n1Records.map((record) => record.n1Value));
  const index2 = minimum(filteredMonthlyData.map((record) => record.cValue));
  const index3 = maximum(n1Records.map((record) => record.yValue));

  async function handleCalculateN2() {
  if (selectedFields.length === 0) {
    setN2Error("Please select at least one field.");
    return;
  }

  if (n1Records.length === 0) {
    setN2Error("No records are available for the selected date range.");
    return;
  }

  setIsCalculatingN2(true);
  setN2Error("");

  try {
    const response = await fetch("/api/calculate-n2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: n1Records,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to calculate N2.");
    }

    const data: N2Record[] = await response.json();
    setN2Data(data);
  } catch (error) {
    setN2Error("Something went wrong while calculating N2.");
  } finally {
    setIsCalculatingN2(false);
  }
}

    if (isLoadingFieldData) {
      return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading field data...</p>
        </div>
      );
    }

    if (fieldDataError) {
      return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-medium text-red-600">{fieldDataError}</p>
        </div>
      );
    }


  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Filters</h2>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            From
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="flex items-center gap-2">
            To
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          {fields.map((field) => (
            <label key={field.fieldId} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFields.includes(field.fieldName)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFields([...selectedFields, field.fieldName]);
                  } else {
                    setSelectedFields(
                      selectedFields.filter((item) => item !== field.fieldName)
                    );
                  }
                }}
              />
              {field.fieldName}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          title="Index 1"
          value={index1.toFixed(2)}
          description="Minimum value for East region"
        />

        <MetricCard
          title="Index 2"
          value={index2.toFixed(2)}
          description="Maximum value for East region"
        />

        <MetricCard
          title="Index 3"
          value={index3.toFixed(2)}
          description="Average value for East region"
        />
      </div>
      <Graph1 data={n1Records} />

      <div className="space-y-4">
          <button
              onClick={handleCalculateN2}
              disabled={isCalculatingN2}
              className="rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isCalculatingN2 ? "Calculating N2..." : "Calculate N2 using backend"}
            </button>

            {n2Error && (
              <p className="text-sm font-medium text-red-600">
                {n2Error}
              </p>
            )}

          <Graph2 data={n2Data} />
        </div>

    </section>
  );
}

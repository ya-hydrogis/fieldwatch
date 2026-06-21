import { NextResponse } from "next/server";

type N1Record = {
  year: number;
  yValue: number;
  n1Value: number;
};

export async function POST(request: Request) {
  const body = await request.json();

  const records: N1Record[] = body.records;

  const years = Array.from(new Set(records.map((record) => record.year)));

  const n2Data = years.map((year) => {
    const recordsForYear = records.filter((record) => record.year === year);

    const maxN1 = Math.max(
      ...recordsForYear.map((record) => record.n1Value)
    );

    const averageY =
      recordsForYear.reduce((sum, record) => sum + record.yValue, 0) /
      recordsForYear.length;

    return {
      year,
      n2Value: Number(((maxN1 * averageY) / 100).toFixed(2)),
    };
  });

  return NextResponse.json(n2Data);
}
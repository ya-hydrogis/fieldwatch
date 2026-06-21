import type { N1Record } from "@/lib/calculations";

export type Graph1ChartRow = {
  date: string;
  [fieldName: string]: string | number;
};

export function convertN1RecordsToGraph1Data(
  n1Records: N1Record[]
): Graph1ChartRow[] {
  return n1Records.reduce<Graph1ChartRow[]>((acc, record) => {
    const existingRow = acc.find((row) => row.date === formatMonthLabel(record.date));

    if (existingRow) {
      existingRow[record.fieldName] = Number(record.n1Value.toFixed(2));
    } else {
      acc.push({
        date: formatMonthLabel(record.date),
        [record.fieldName]: Number(record.n1Value.toFixed(2)),
      });
    }

    return acc;
  }, []);
}

export function getUniqueFieldNames(n1Records: N1Record[]): string[] {
  return Array.from(new Set(n1Records.map((record) => record.fieldName)));
}

export function formatMonthLabel(
  dateString: string
): string {
  const date = new Date(dateString);

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "2-digit",
    }
  );
}
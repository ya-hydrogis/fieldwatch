import type {
  MonthlyFieldRecord,
  YearlyFieldRecord,
} from "@/lib/dummyFieldData";

export type N1Record = {
  fieldId: number;
  fieldName: string;
  region: string;
  date: string;
  year: number;
  cValue: number;
  dValue: number;
  yValue: number;
  n1Value: number;
};

export function getYearFromDate(date: string): number {
  return Number(date.slice(0, 4));
}

export function calculateN1(cValue: number, dValue: number, yValue: number): number {
  return (0.6 * cValue + 0.4 * dValue) * (yValue / 100);
}

export function calculateN1Records(
  monthlyRecords: MonthlyFieldRecord[],
  yearlyRecords: YearlyFieldRecord[]
): N1Record[] {
  return monthlyRecords
    .map((monthlyRecord) => {
      const year = getYearFromDate(monthlyRecord.date);

      const yearlyRecord = yearlyRecords.find(
        (record) =>
          record.fieldId === monthlyRecord.fieldId &&
          record.year === year
      );

      if (!yearlyRecord) {
        return null;
      }

      return {
        fieldId: monthlyRecord.fieldId,
        fieldName: monthlyRecord.fieldName,
        region: monthlyRecord.region,
        date: monthlyRecord.date,
        year,
        cValue: monthlyRecord.cValue,
        dValue: monthlyRecord.dValue,
        yValue: yearlyRecord.yValue,
        n1Value: calculateN1(
          monthlyRecord.cValue,
          monthlyRecord.dValue,
          yearlyRecord.yValue
        ),
      };
    })
    .filter((record): record is N1Record => record !== null);
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function minimum(values: number[]): number {
  if (values.length === 0) return 0;

  return Math.min(...values);
}

export function maximum(values: number[]): number {
  if (values.length === 0) return 0;

  return Math.max(...values);
}
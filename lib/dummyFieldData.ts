export type MonthlyFieldRecord = {
  fieldId: number;
  fieldName: string;
  region: string;
  date: string;
  cValue: number;
  dValue: number;
};

export type YearlyFieldRecord = {
  fieldId: number;
  fieldName: string;
  region: string;
  year: number;
  yValue: number;
  zValue?: number;
};

function createMonthlyRecords(
  fieldId: number,
  fieldName: string,
  region: string,
  baseC: number,
  baseD: number
): MonthlyFieldRecord[] {
  const records: MonthlyFieldRecord[] = [];

  for (let year = 2023; year <= 2025; year++) {
    for (let month = 1; month <= 12; month++) {
      const seasonalEffect = Math.sin((Math.PI * (month - 1)) / 12) * 12;
      const yearlyEffect = (year - 2023) * 3;

      records.push({
        fieldId,
        fieldName,
        region,
        date: `${year}-${String(month).padStart(2, "0")}-01`,
        cValue: Math.round(baseC + seasonalEffect + yearlyEffect),
        dValue: Math.round(baseD + seasonalEffect + yearlyEffect),
      });
    }
  }

  return records;
}

export const dummyMonthlyFieldData: MonthlyFieldRecord[] = [
  ...createMonthlyRecords(1, "Field 1", "East region", 22, 35),
  ...createMonthlyRecords(2, "Field 2", "East region", 30, 42),
];

export const dummyYearlyFieldData: YearlyFieldRecord[] = [
  { fieldId: 1, fieldName: "Field 1", region: "East region", year: 2023, yValue: 80 },
  { fieldId: 1, fieldName: "Field 1", region: "East region", year: 2024, yValue: 86 },
  { fieldId: 1, fieldName: "Field 1", region: "East region", year: 2025, yValue: 91 },

  { fieldId: 2, fieldName: "Field 2", region: "East region", year: 2023, yValue: 95, zValue: 12 },
  { fieldId: 2, fieldName: "Field 2", region: "East region", year: 2024, yValue: 101, zValue: 14 },
  { fieldId: 2, fieldName: "Field 2", region: "East region", year: 2025, yValue: 108, zValue: 15 },
];
import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

import {
  dummyMonthlyFieldData,
  dummyYearlyFieldData,
} from "@/lib/dummyFieldData";

import { fieldMetadata } from "@/lib/fieldMetadata";

export async function GET() {
  for (const field of fieldMetadata) {
    await sql`
      INSERT INTO fields (
        field_id,
        field_name,
        region
      )
      VALUES (
        ${field.fieldId},
        ${field.fieldName},
        ${field.region}
      )
      ON CONFLICT (field_id)
      DO NOTHING
    `;
  }

  for (const record of dummyMonthlyFieldData) {
    await sql`
      INSERT INTO monthly_field_records (
        field_id,
        date,
        c_value,
        d_value
      )
      VALUES (
        ${record.fieldId},
        ${record.date},
        ${record.cValue},
        ${record.dValue}
      )
      ON CONFLICT (field_id, date)
      DO UPDATE SET
        c_value = EXCLUDED.c_value,
        d_value = EXCLUDED.d_value
    `;
  }

  for (const record of dummyYearlyFieldData) {
    await sql`
      INSERT INTO yearly_field_records (
        field_id,
        year,
        y_value,
        z_value
      )
      VALUES (
        ${record.fieldId},
        ${record.year},
        ${record.yValue},
        ${record.zValue ?? null}
      )
      ON CONFLICT (field_id, year)
      DO UPDATE SET
        y_value = EXCLUDED.y_value,
        z_value = EXCLUDED.z_value
    `;
  }

  return NextResponse.json({
    message: "Database seeded successfully.",
  });
}
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const fieldsResult = await sql`
    SELECT
      field_id AS "fieldId",
      field_name AS "fieldName",
      region
    FROM fields
    ORDER BY field_id;
  `;

  const monthlyResult = await sql`
    SELECT
      f.field_id AS "fieldId",
      f.field_name AS "fieldName",
      f.region AS region,
      TO_CHAR(m.date, 'YYYY-MM-DD') AS date,
      m.c_value AS "cValue",
      m.d_value AS "dValue"
    FROM monthly_field_records m
    JOIN fields f
      ON m.field_id = f.field_id
    ORDER BY m.date, f.field_id;
  `;

  const yearlyResult = await sql`
    SELECT
      f.field_id AS "fieldId",
      f.field_name AS "fieldName",
      f.region AS region,
      y.year AS year,
      y.y_value AS "yValue",
      y.z_value AS "zValue"
    FROM yearly_field_records y
    JOIN fields f
      ON y.field_id = f.field_id
    ORDER BY y.year, f.field_id;
  `;

  return NextResponse.json({
    fields: fieldsResult.rows,
    monthlyRecords: monthlyResult.rows,
    yearlyRecords: yearlyResult.rows,
  });
}
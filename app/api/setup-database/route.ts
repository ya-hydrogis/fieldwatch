import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  await sql`
    CREATE TABLE IF NOT EXISTS fields (
      field_id INTEGER PRIMARY KEY,
      field_name TEXT NOT NULL,
      region TEXT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS monthly_field_records (
      id SERIAL PRIMARY KEY,
      field_id INTEGER REFERENCES fields(field_id),
      date DATE NOT NULL,
      c_value DOUBLE PRECISION NOT NULL,
      d_value DOUBLE PRECISION NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS yearly_field_records (
      id SERIAL PRIMARY KEY,
      field_id INTEGER REFERENCES fields(field_id),
      year INTEGER NOT NULL,
      y_value DOUBLE PRECISION NOT NULL,
      z_value DOUBLE PRECISION
    );
  `;

  await sql`
     CREATE UNIQUE INDEX IF NOT EXISTS unique_monthly_field_record
       ON monthly_field_records (field_id, date);
  `;

   await sql`
     CREATE UNIQUE INDEX IF NOT EXISTS unique_yearly_field_record
       ON yearly_field_records (field_id, year);
   `;

  return NextResponse.json({
    message: "Database tables created successfully.",
  });
}
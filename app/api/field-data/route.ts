import { NextResponse } from "next/server";
import {
  dummyMonthlyFieldData,
  dummyYearlyFieldData,
} from "@/lib/dummyFieldData";
import { fieldMetadata } from "@/lib/fieldMetadata";

export async function GET() {
  return NextResponse.json({
    fields: fieldMetadata,
    monthlyRecords: dummyMonthlyFieldData,
    yearlyRecords: dummyYearlyFieldData,
  });
}
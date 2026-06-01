import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const { sku, qty } = await req.json();

  const excelPath = path.join(process.cwd(), "data", "HAORUN_ERP_BACKEND_FIXED.xlsx");
  if (!fs.existsSync(excelPath)) return NextResponse.json({ success: false, message: "Excel not found" });

  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets["05_Products"];
  const rows = XLSX.utils.sheet_to_json<any>(sheet);

  const product = rows.find(r => r.SKU === sku);
  if (!product) return NextResponse.json({ success: false, message: "SKU not found" });
  if (product.Available < qty) return NextResponse.json({ success: false, message: "Insufficient stock" });

  product.Available -= qty;

  workbook.Sheets["05_Products"] = XLSX.utils.json_to_sheet(rows);
  XLSX.writeFile(workbook, excelPath);

  return NextResponse.json({ success: true, sku, available: product.Available });
}

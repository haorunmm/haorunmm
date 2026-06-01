import { google } from "googleapis";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const orderId = String(formData.get("orderId") || "");
    const file = formData.get("paymentImage") as File | null;

    if (!orderId) {
      return Response.json({ error: "Order ID is required" }, { status: 400 });
    }

    if (!file) {
      return Response.json({ error: "Payment image is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tmpDir = path.join(process.cwd(), "tmp");
    fs.mkdirSync(tmpDir, { recursive: true });

    const safeName = `${orderId}-${Date.now()}-${file.name}`.replace(/[^a-zA-Z0-9._-]/g, "_");
    const tmpPath = path.join(tmpDir, safeName);
    fs.writeFileSync(tmpPath, buffer);

    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    const uploaded = await drive.files.create({
      requestBody: {
        name: safeName,
        parents: process.env.GOOGLE_DRIVE_PAYMENT_FOLDER_ID
          ? [process.env.GOOGLE_DRIVE_PAYMENT_FOLDER_ID]
          : undefined,
      },
      media: {
        mimeType: file.type || "image/jpeg",
        body: fs.createReadStream(tmpPath),
      },
      fields: "id, webViewLink",
    });

    fs.unlinkSync(tmpPath);

    const driveLink = uploaded.data.webViewLink || "";

    const excelPath =
      process.env.HAORUN_EXCEL_PATH ||
      path.join(process.cwd(), "data", "HAORUN_ERP_BACKEND_FIXED.xlsx");

    if (fs.existsSync(excelPath)) {
      const workbook = XLSX.readFile(excelPath);
      const sheetName = "08_Payments";
      const sheet = workbook.Sheets[sheetName];

      if (sheet) {
        const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
          raw: false,
        });

        const row = rows.find((r) => String(r["Order ID"]) === orderId);

        if (row) {
          row["Payment Screenshot URL"] = driveLink;
        } else {
          rows.push({
            "Payment ID": `PAY-${Date.now()}`,
            "Order ID": orderId,
            "Payment Screenshot URL": driveLink,
            "Payment Status": "Pending Verification",
            "Payment Date": new Date().toISOString(),
            Notes: "Payment screenshot uploaded by customer",
          });
        }

        workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(rows);
        XLSX.writeFile(workbook, excelPath);
      }
    }

    return Response.json({
      success: true,
      orderId,
      link: driveLink,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error?.message || "Payment upload failed",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_HAORUN_API_URL || "";

export async function POST(req: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json({ success: false, error: "Missing NEXT_PUBLIC_HAORUN_API_URL" }, { status: 500 });
    }

    const payload = await req.json();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await res.text();

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ success: false, error: text.slice(0, 500) });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "ERP proxy failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_HAORUN_API_URL || "";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const text = await res.text();
    try { return NextResponse.json(JSON.parse(text)); }
    catch { return NextResponse.json({ success: false, error: text }); }
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}

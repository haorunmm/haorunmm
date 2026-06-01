const API_URL = process.env.NEXT_PUBLIC_HAORUN_API_URL || "";

async function safeJson(res: Response) {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,
      data: [],
      error: text.slice(0, 300),
    };
  }
}

export async function apiGet(action: string, params: Record<string, string> = {}) {
  if (!API_URL) return { success: false, data: [], error: "Missing API URL" };

  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { cache: "no-store" });
  return safeJson(res);
}

export async function apiPostRaw(payload: Record<string, unknown>) {
  const res = await fetch("/api/erp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return safeJson(res);
}

export const erpApi = {
  variants: () => apiGet("getProductVariants"),
  dashboard: () => apiGet("getDashboard"),
  payments: () => apiGet("getPayments"),
  orders: () => apiGet("getOrders"),
  createOrder: (data: unknown) => apiPostRaw({ action: "createOrder", data }),
  createPayment: (data: unknown) => apiPostRaw({ action: "createPayment", data }),
  verifyPayment: (paymentId: string) =>
    apiPostRaw({ action: "verifyPayment", paymentId, verifiedBy: "Admin" }),
  rejectPayment: (paymentId: string) =>
    apiPostRaw({
      action: "rejectPayment",
      paymentId,
      reason: "Rejected by Admin",
      rejectedBy: "Admin",
    }),
};

const API_URL = process.env.NEXT_PUBLIC_HAORUN_API_URL || "";

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { success: false, data: [], error: text.slice(0, 500) };
  }
}

export async function apiGet(action: string, params: Record<string, string> = {}) {
  if (!API_URL) return { success: false, data: [], error: "Missing NEXT_PUBLIC_HAORUN_API_URL" };

  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    cache: "no-store",
    redirect: "follow",
  });

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

export async function createOrder(data: unknown) {
  return apiPostRaw({ action: "createOrder", data });
}

export async function createPayment(data: unknown) {
  return apiPostRaw({ action: "createPayment", data });
}

export async function verifyPayment(paymentId: string) {
  return apiPostRaw({ action: "verifyPayment", paymentId, verifiedBy: "Admin" });
}

export async function rejectPayment(paymentId: string) {
  return apiPostRaw({
    action: "rejectPayment",
    paymentId,
    reason: "Rejected by Admin",
    rejectedBy: "Admin",
  });
}

export const erpApi = {
  products: () => apiGet("getProducts"),
  variants: () => apiGet("getProductVariants"),
  orders: () => apiGet("getOrders"),
  payments: () => apiGet("getPayments"),
  customers: () => apiGet("getCustomers"),
  partners: () => apiGet("getPartners"),
  inventory: () => apiGet("getProductVariants"),
  dashboard: () => apiGet("getDashboard"),
  reports: () => apiGet("getReports"),
  createOrder,
  createPayment,
  verifyPayment,
  rejectPayment,
};

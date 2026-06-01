"use client";

import React, { useState } from "react";

export default function PaymentVerifyUpload({ orderId }: { orderId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("paymentImage", file);
    formData.append("orderId", orderId);

    const res = await fetch("/api/payment-upload", { method: "POST", body: formData });
    const data = await res.json();
    setLink(data.link);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded">
        Upload
      </button>
      {link && (
        <a href={link} target="_blank" className="text-blue-600 underline">
          View Payment Image
        </a>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const [available, setAvailable] = useState(product.Available);

  const handleAddToCart = async () => {
    if (available <= 0) return;

    const res = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku: product.SKU, qty: 1 })
    });
    const data = await res.json();

    if (data.success) setAvailable(data.available);
    else alert(data.message || "Failed to add to cart");
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{product.Name}</h2>
      <p>Available: {available}</p>
      <p>Price: {product.Price} MMK</p>
      <button onClick={handleAddToCart} className="mt-2 px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600">
        Add to Cart
      </button>
    </div>
  );
}

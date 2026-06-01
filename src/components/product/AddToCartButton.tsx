"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8 space-y-3">
      <button
        onClick={() => {
          addToCart(product);
          setAdded(true);
        }}
        className="w-full rounded-full bg-amber-400 py-4 text-lg font-semibold hover:bg-amber-300"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>

      <Link
        href="/cart"
        className="block w-full rounded-full bg-orange-500 py-4 text-center text-lg font-semibold text-white hover:bg-orange-400"
      >
        Go to Cart
      </Link>
    </div>
  );
}

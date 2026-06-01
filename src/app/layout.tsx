import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "HAORUN",
  description: "HAORUN commerce and ERP system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-950">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

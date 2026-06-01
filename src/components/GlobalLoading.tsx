"use client";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-blue-600" />
    </div>
  );
}

"use client";

import { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny } from "zod";
import GlobalLoading from "./GlobalLoading";

type Props = {
  schema: ZodTypeAny;
  defaultValues?: Record<string, any>;
  children: ReactNode;
  submitLabel?: string;
  onSubmit: (data: any) => Promise<void> | void;
};

export default function ERPFormWrapper({
  schema,
  defaultValues,
  children,
  submitLabel = "Submit",
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleValidSubmit(data: any) {
    try {
      setLoading(true);
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleValidSubmit)}
        className="relative"
      >
        {loading && <GlobalLoading />}
        {children}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-lg bg-blue-700 px-5 py-2 text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </form>
    </FormProvider>
  );
}

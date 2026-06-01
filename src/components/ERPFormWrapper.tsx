"use client";

import { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import GlobalLoading from "./GlobalLoading";

type Props<T extends z.ZodTypeAny> = {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  children: ReactNode;
  submitLabel?: string;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
};

export default function ERPFormWrapper<T extends z.ZodTypeAny>({
  schema,
  defaultValues,
  children,
  submitLabel = "Submit",
  onSubmit,
}: Props<T>) {
  const [loading, setLoading] = useState(false);

  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  async function handleValidSubmit(data: z.infer<T>) {
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
        noValidate
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

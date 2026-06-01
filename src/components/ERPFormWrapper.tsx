"use client";

import { ReactNode, useState } from "react";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import GlobalLoading from "./GlobalLoading";

type Props = {
  schema: z.ZodTypeAny;
  defaultValues?: FieldValues;
  children: ReactNode;
  submitLabel?: string;
  onSubmit: (data: FieldValues) => Promise<void> | void;
};

export default function ERPFormWrapper({
  schema,
  defaultValues,
  children,
  submitLabel = "Submit",
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const methods = useForm<FieldValues>({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  async function handleValidSubmit(data: FieldValues) {
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

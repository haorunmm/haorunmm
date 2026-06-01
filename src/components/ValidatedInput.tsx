"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
};

export default function ValidatedInput({
  name,
  label,
  placeholder,
  type = "text",
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-semibold text-gray-800">
        {label}
      </label>

      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 outline-none ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 focus:border-blue-600"
        }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

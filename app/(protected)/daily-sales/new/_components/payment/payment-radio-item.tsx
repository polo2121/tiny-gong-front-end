"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface PaymentRadioItemProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  logoSrc?: string | null;
  disabled?: boolean;
  children: ReactNode;
}

export function PaymentRadioItem({
  name,
  value,
  checked,
  onChange,
  logoSrc,
  disabled = false,
  children,
}: PaymentRadioItemProps) {
  return (
    <label className="relative block">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
      />

      <span
        className={cn(
          "relative flex h-24  cursor-pointer flex-col items-center justify-between gap-1 rounded-lg border-2 bg-slate-100 p-3 text-center text-sm font-bold text-slate-900 transition-all",
          "hover:-translate-y-0.5 hover:bg-teal-500/50 hover:shadow-card",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-2",
          checked && !disabled
            ? "border-highlight-soft text-highlight-soft"
            : "border-transparent",
          disabled &&
            "cursor-not-allowed opacity-50 hover:translate-y-0 hover:bg-slate-100 hover:shadow-none",
        )}
      >
        {checked && !disabled && (
          <span className="absolute right-0 -top-2 flex size-5 items-center justify-center rounded-full bg-hightlight text-white shadow-sm">
            <Check className="size-4" />
          </span>
        )}

        {logoSrc && (
          <span className="flex h-8 w-full items-center justify-end">
            <Image
              src={logoSrc}
              alt=""
              width={100}
              height={100}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </span>
        )}

        <span className="w-full text-left">{children}</span>
      </span>
    </label>
  );
}

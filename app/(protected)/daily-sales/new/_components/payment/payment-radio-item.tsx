"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface PaymentRadioItemProps {
  value: string;
  label: string;
  logoSrc?: string;
  isSelected: boolean;
  disabled?: boolean;
}

export function PaymentRadioItem({
  value,
  label,
  logoSrc,
  isSelected,
  disabled = false,
}: PaymentRadioItemProps) {
  return (
    <label
      htmlFor={value}
      className={cn(
        "relative flex h-24 w-40 shrink-0 cursor-pointer flex-col items-center justify-between gap-1 rounded-lg border-2 bg-slate-100 p-3 text-center text-sm font-bold text-slate-900 transition-all",
        "hover:-translate-y-0.5 hover:bg-teal-500/50 hover:shadow-card",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
        isSelected && !disabled
          ? "border-highlight-soft text-highlight-soft"
          : "border-transparent",
        disabled &&
          "cursor-not-allowed opacity-50 hover:translate-y-0 hover:bg-slate-100 hover:shadow-none",
      )}
    >
      {isSelected && !disabled && (
        <span className="absolute right-0 -top-2 flex size-5 items-center justify-center rounded-full bg-hightlight text-white shadow-sm">
          <Check className="size-4" />
        </span>
      )}

      <RadioGroupItem
        id={value}
        value={value}
        aria-label={label}
        disabled={disabled}
        className="hidden sr-only"
      />

      {logoSrc && (
        <div className="flex h-8 w-full items-center justify-end bg-transparent">
          <Image
            src={logoSrc}
            alt=""
            width={100}
            height={100}
            className="h-auto max-h-full w-auto max-w-full object-contain"
          />
        </div>
      )}

      <span className="w-full text-left">{label}</span>
    </label>
  );
}

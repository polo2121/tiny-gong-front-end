"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ProductSelect({
  value,
  placeholder,
  options,
  onValueChange,
  disabled = false,
}: any) {
  const selectedOption = options.find((option: any) => option.value === value);

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-hightlight/20 bg-white px-4 text-sm font-bold shadow-card transition-all",
          "hover:-translate-y-0.5 hover:bg-highlight/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
          !selectedOption && "text-slate-400",
          selectedOption && "border-highlight text-highlight ring-highlight",
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>
        <ChevronDown className="size-4 shrink-0 text-highlight-soft" />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-(--anchor-width) rounded-md p-2"
      >
        <div className="flex flex-col gap-1">
          {options.map((option: any) => {
            const isSelected = option.value === value;

            return (
              <PopoverClose
                key={option.value}
                type="button"
                onClick={() => onValueChange(option.value)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-all",
                  "hover:-translate-y-0.5 hover:bg-highlight/10",
                  isSelected
                    ? "bg-highlight/10 text-hightlight"
                    : "text-foreground/70",
                )}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="size-4" />}
              </PopoverClose>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ProductSelect({
  value,
  placeholder,
  options,
  onValueChange = () => {},
  disabled = false,
}: any) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "h-12 w-full rounded-xl border border-hightlight/20 bg-white px-4 text-sm font-bold transition-all",
          "hover:-translate-y-0.5 focus:ring-2 focus:ring-ring/50 ",
          "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
          !value && "text-slate-400",
          value && "border-highlight text-highlight",
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="rounded-md p-1 ">
        {options.map((option: any) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="rounded-xl px-3 py-2.5 text-sm font-semibold"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

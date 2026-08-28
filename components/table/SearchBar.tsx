"use client";

import { LoaderCircle, X } from "lucide-react";
import type { ComponentProps } from "react";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SearchBarProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "value" | "onChange"
> & {
  value: string;
  onValueChange: (value: string) => void;
  isSearching?: boolean;
};

export function SearchBar({
  value,
  onValueChange,
  isSearching = false,
  disabled = false,
  placeholder = "Search...",
  className,
  ...props
}: SearchBarProps) {
  const canClear = value.length > 0 && !disabled;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-highlight-soft" />

        <Input
          {...props}
          type="search"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onValueChange(event.currentTarget.value)}
          className="pr-12 pl-12"
        />

        {isSearching && (
          <p className="absolute bottom-14 right-4 rounded-full px-8 w-fit bg-slate-100  shadow-card border-slate-100 border animate-in fade-in slide-in-from-bottom-1 duration-200">
            <span className="text-muted-foreground text-sm font-semibold animate-pulse">
              Searching Now...
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

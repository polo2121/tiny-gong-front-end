"use client";

import { useId, useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OneSparkleIcon } from "@/components/icons/OneSparkleIcon";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { CustomDateFilterValue } from "@/components/stats/types";

type CustomDateFilterProps = {
  defaultDates?: CustomDateFilterValue | null;
  label?: string;
  disabled?: boolean;
  className?: string;
  onApply: (value: CustomDateFilterValue) => void;
};

export function CustomDateFilter({
  defaultDates,
  label = "Custom Date",
  disabled = false,
  className,
  onApply,
}: CustomDateFilterProps) {
  const fieldId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState(defaultDates?.from ?? "");
  const [toDate, setToDate] = useState(defaultDates?.to ?? "");
  const [errorMessage, setErrorMessage] = useState("");

  const hasDates = Boolean(defaultDates?.from && defaultDates?.to);
  const triggerText = hasDates
    ? `${defaultDates?.from} - ${defaultDates?.to}`
    : label;

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) resetDraft();
    setIsOpen(nextOpen);
  }

  function handleApply() {
    const nextErrorMessage = validateDates();
    if (nextErrorMessage) {
      setErrorMessage(nextErrorMessage);
      return;
    }
    onApply({
      from: fromDate,
      to: toDate,
    });
    handleCancel();
  }

  function validateDates() {
    if (!fromDate || !toDate) return "Please choose both from and to dates.";
    if (fromDate > toDate) return "From date cannot be after to date.";
    return "";
  }

  function handleCancel() {
    resetDraft();
    setIsOpen(false);
  }

  function resetDraft() {
    setFromDate(defaultDates?.from ?? "");
    setToDate(defaultDates?.to ?? "");
    setErrorMessage("");
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        className={cn(
          "group relative h-full justify-between gap-3 rounded-full text-muted-foreground bg-slate-100 px-4 py-2  text-left text-sm font-bold shadow-card transition-all",
          "hover:-translate-y-0.5 hover:bg-highlight-soft hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 cursor-pointer",
          hasDates && "text-highlight-soft",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 justify-center  group-hover:text-white",
          )}
        >
          <CalendarDays className="size-4 shrink-0" />
          <span className={cn("truncate text-sm text-higlight-soft")}>
            {triggerText}
          </span>
          {hasDates && (
            <OneSparkleIcon className="absolute top-1 right-2 text-yellow-400" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        className="w-70 rounded-lg bg-card-surface px-4 py-6"
      >
        <div className="flex flex-col gap-5">
          <FieldGroup className="gap-4">
            <Field data-invalid={Boolean(errorMessage)}>
              <Field>
                <div className="relative bg-white/80 shadow-card rounded-full">
                  <FieldLabel
                    htmlFor={`${fieldId}-from`}
                    className="pointer-events-none absolute left-4 top-2 z-10 text-xs opacity-60"
                  >
                    From
                  </FieldLabel>

                  <Input
                    id={`${fieldId}-from`}
                    type="date"
                    className="bg-transparent pt-4 pl-4"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.currentTarget.value);
                      setErrorMessage("");
                    }}
                    aria-invalid={Boolean(errorMessage)}
                  />
                </div>
              </Field>
            </Field>

            <Field data-invalid={Boolean(errorMessage)}>
              <div className="relative bg-white/80 shadow-card rounded-full">
                <FieldLabel
                  htmlFor={`${fieldId}-to`}
                  className="pointer-events-none absolute left-4 top-2 z-10 text-xs opacity-60"
                >
                  To
                </FieldLabel>
                <Input
                  id={`${fieldId}-to`}
                  type="date"
                  className="bg-transparent pt-4 pl-4"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.currentTarget.value);
                    setErrorMessage("");
                  }}
                  aria-invalid={Boolean(errorMessage)}
                />
              </div>
            </Field>

            {errorMessage && (
              <FieldError className="text-xs">{errorMessage}</FieldError>
            )}
          </FieldGroup>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              showIcon={false}
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "./input";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AmountStepperProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "default" | "sm";
  disabled?: boolean;
  decrementLabel?: string;
  incrementLabel?: string;
  className?: string;
};

function AmountStepper({
  value,
  onValueChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  size = "default",
  disabled = false,
  decrementLabel = "Decrease amount",
  incrementLabel = "Increase amount",
  className,
}: AmountStepperProps) {
  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && value < max;

  function decrease() {
    if (!canDecrease) {
      return;
    }
    onValueChange(clampAmount(value - step, min, max));
  }

  function increase() {
    if (!canIncrease) {
      return;
    }
    onValueChange(clampAmount(value + step, min, max));
  }

  return (
    <div
      className={cn(
        "inline-grid w-full grid-cols-[2.5rem_minmax(2.5rem,1fr)_2.5rem] items-center border-hightlight/15 bg-red text-sm font-bold gap-1",
        disabled && "opacity-50",
        className,
      )}
    >
      <Button
        variant="custom"
        showIcon={false}
        aria-label={decrementLabel}
        disabled={!canDecrease}
        className={cn(
          "flex  items-center justify-center text-hightlight transition hover:bg-highlight/10 disabled:pointer-events-none disabled:opacity-40 border rounded-sm border-dashed border-hightlight cursor-pointer shadow-card",
          size === "sm" && "w-fit h-fit p-2",
          size === "default" && "h-full w-full",
        )}
        onClick={decrease}
      >
        <Minus className="size-4" aria-hidden="true" />
      </Button>

      {/* <output
        className="min-w-10 px-2 text-center tabular-nums text-slate-950"
        aria-live="polite"
      >
        {value}
      </output> */}
      <Input
        className="rounded-sm p-0 h-full text-foreground text-center flex items-center justify-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        value={value}
        readOnly
      />

      <Button
        variant="custom"
        showIcon={false}
        aria-label={incrementLabel}
        disabled={!canIncrease}
        className={cn(
          "flex  items-center justify-center text-hightlight transition hover:bg-highlight/10 disabled:pointer-events-none disabled:opacity-40 border rounded-sm border-dashed border-hightlight cursor-pointer shadow-card",
          size === "sm" && "w-fit h-fit ",
          size === "default" && "w-full h-full",
        )}
        onClick={increase}
      >
        <Plus className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

function clampAmount(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export { AmountStepper };

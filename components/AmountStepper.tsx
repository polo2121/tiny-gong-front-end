"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";

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
        "w-fit items-center border-hightlight/15 bg-red text-sm font-bold gap-1",
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
          "w-fit min-w-0 border border-dashed rounded-sm p-2 border-highlight-soft text-highlight bg-white shadow-card",
        )}
        onClick={decrease}
      >
        <Minus className="size-4" aria-hidden="true" />
      </Button>

      <Input
        className="w-10 h-full rounded-sm p-0 text-foreground text-center flex items-center justify-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-transparent font-bold"
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
          "w-fit min-w-0 border border-dashed rounded-sm p-2 border-highlight-soft text-highlight bg-white shadow-card",
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

"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatCurrency } from "@/lib/currency";

import { useSaleDraftStore } from "../../_stores/use-sale-draft-store";

export function DiscountPopover({
  sku,
  currentDiscount,
  price,
  qty,
}: {
  sku: string;
  currentDiscount: number;
  price: number;
  qty: number;
}) {
  const setItemDiscount = useSaleDraftStore((state) => state.setItemDiscount);

  const [discountValue, setDiscountValue] = useState(() =>
    currentDiscount > 0 ? String(currentDiscount) : "",
  );
  const lineSubtotal = price * qty;

  function handleOpenChange() {
    setDiscountValue(currentDiscount > 0 ? String(currentDiscount) : "");
  }

  function applyDiscount() {
    setItemDiscount(sku, Number(discountValue) || 0);
  }

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger
        type="button"
        className="inline-flex w-20 flex-col items-center justify-center rounded-full border border-dashed border-hightlight/25 bg-white text-base font-medium transition hover:-translate-y-0.5 hover:bg-highlight/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {formatCurrency(currentDiscount)}
      </PopoverTrigger>

      <PopoverContent align="center" side="bottom" className="w-80 py-10">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-margarine text-sm text-slate-950">
              Item Discount
            </h3>
            <p className="mt-1 text-xs font-umoe opacity-60">
              (Discount ပေးရန်)
            </p>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold">
            <div className="relative">
              <Input
                type="number"
                min="0"
                max={String(lineSubtotal)}
                value={discountValue}
                onChange={(event) => {
                  setDiscountValue(event.currentTarget.value);
                }}
                className="pr-14"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold opacity-55">
                MMK
              </span>
            </div>
          </label>

          <div className="rounded-xl bg-slate-50 p-4 text-xs font-semibold">
            <div className="flex justify-between gap-4">
              <span className="opacity-60">Item Price</span>
              <span>{formatCurrency(lineSubtotal)} MMK</span>
            </div>
            <div className="mt-1 flex justify-between gap-4 text-highlight-soft">
              <span>Current discount</span>
              <span>-{formatCurrency(currentDiscount)} MMK</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <PopoverClose
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-full border border-hightlight px-4 font-chewy text-sm text-hightlight transition hover:-translate-y-0.5 hover:bg-highlight/10"
            >
              Cancel
            </PopoverClose>
            <PopoverClose
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 font-chewy text-sm text-white shadow-card transition hover:-translate-y-0.5 hover:bg-highlight-soft"
              onClick={applyDiscount}
            >
              Apply
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import DualText from "@/components/DualText";
import { DiscountIcon } from "@/components/icons/DiscountIcon";
import { ShoppingBasketIcon } from "@/components/icons/ShoppingBasketIcon";
import { SubTotalIcon } from "@/components/icons/SubTotalIcon";
import { TaxIcon } from "@/components/icons/TaxIcon";
import { ThreeSparklesIcon } from "@/components/icons/ThreeSparklesIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  getSaleTotals,
  useSaleDraftStore,
} from "../_stores/use-sale-draft-store";

export function OrderSummary() {
  const items = useSaleDraftStore((state) => state.items);
  const totals = getSaleTotals(items);

  const summaryRows = [
    {
      label: "Items",
      value: totals.totalQty,
      icon: ShoppingBasketIcon,
      emphasized: true,
    },
    {
      label: "Subtotal",
      value: totals.subtotal,
      icon: SubTotalIcon,
    },
    {
      label: "Discount",
      value: `-${totals.discount}`,
      icon: DiscountIcon,
    },
    {
      label: "Tax / Fees",
      value: totals.taxFees,
      icon: TaxIcon,
    },
  ];

  return (
    <Card className="bg-card-surface p-0">
      <CardHeader className="px-4 pt-6">
        <CardTitle>
          <DualText label="Order Summary" subLabel="အမှာစာအကျဉ်းချုပ်" />
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <div className="rounded-xl bg-white p-4 shadow-card">
          <div className="flex flex-col gap-3 px-2 py-4">
            {summaryRows.map(({ label, value, icon: Icon, emphasized }) => (
              <div
                key={label}
                className="flex justify-between gap-4 text-foreground"
              >
                <span className="flex items-center gap-2 font-margarine text-sm opacity-70">
                  <Icon className="size-4" />
                  {label}
                </span>

                <span
                  className={cn(
                    "text-lg font-semibold",
                    emphasized &&
                      "font-chewy text-2xl font-normal text-highlight-soft",
                  )}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-dashed border-hightlight/20 px-2 pt-4">
            <span className="font-margarine text-base opacity-70">
              Grand Total
            </span>

            <span className="relative flex gap-2 text-right font-chewy text-3xl tracking-wide text-highlight-soft">
              {totals.grandTotal}
              <ThreeSparklesIcon className="absolute -right-2 -top-2 size-3 text-yellow-300" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import type { ComponentType, SVGProps } from "react";

import DualText from "@/components/DualText";
import { DiscountIcon } from "@/components/icons/DiscountIcon";
import { ShoppingBasketIcon } from "@/components/icons/ShoppingBasketIcon";
import { SubTotalIcon } from "@/components/icons/SubTotalIcon";
import { TaxIcon } from "@/components/icons/TaxIcon";
import { ThreeSparklesIcon } from "@/components/icons/ThreeSparklesIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type OrderSummaryProps = {
  totals: {
    totalQty: string;
    grandTotal: string;
  };
};

type OrderSummaryRow = {
  label: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isEmphasized?: boolean;
};

const summaryRows: OrderSummaryRow[] = [
  {
    label: "Items",
    value: "6",
    icon: ShoppingBasketIcon,
    isEmphasized: true,
  },
  {
    label: "Subtotal",
    value: "56,500",
    icon: SubTotalIcon,
  },
  {
    label: "Discount",
    value: "1,500",
    icon: DiscountIcon,
  },
  {
    label: "Tax / Fees",
    value: "0",
    icon: TaxIcon,
  },
];

export function OrderSummary({ totals }: OrderSummaryProps) {
  return (
    <Card className="bg-card-surface p-0">
      <CardHeader className="px-4 pt-6">
        <CardTitle>
          <DualText label="Order Summary" subLabel="အမှာစာအကျဉ်းချုပ်" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-4 py-2">
        <div className="rounded-xl bg-white p-4 shadow-card">
          <div className="flex flex-col gap-3 border-hightlight/20 py-4 px-2">
            {summaryRows.map((row) => {
              const Icon = row.icon;

              return (
                <div
                  key={row.label}
                  className="flex justify-between gap-4 text-foreground"
                >
                  <span className="flex items-center gap-2 font-margarine text-sm opacity-70">
                    <Icon className="size-4" />
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "text-lg font-semibold",
                      row.isEmphasized &&
                        "font-chewy text-2xl font-normal text-highlight-soft",
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-dashed border-hightlight/20 pt-4 px-2">
            <span className="font-margarine text-base opacity-70">
              Grand Total
            </span>
            <span className="relative flex gap-2 text-right font-chewy text-3xl tracking-wide text-highlight-soft">
              {totals.grandTotal}
              <ThreeSparklesIcon className="absolute -top-2 -right-2 size-3 text-yellow-300" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

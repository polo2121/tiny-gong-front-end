import DualText from "@/components/DualText";
import { StatusBadge } from "@/components/ui/status-badge";

import type { PurchaseRecord } from "../_types/purchase";
import { SparkleIcon } from "lucide-react";
import { ThreeSparklesIcon } from "@/components/icons/ThreeSparklesIcon";

export function PurchaseProgressSummary({
  purchase,
}: {
  purchase: PurchaseRecord;
}) {
  const registeredProducts = purchase.registeredProducts.length;
  const expectedVariants = purchase.registeredProducts.reduce(
    (total, product) => total + product.expectedVariants,
    0,
  );
  const registeredVariants = purchase.registeredProducts.reduce(
    (total, product) => total + product.registeredVariantIds.length,
    0,
  );

  const summaryItems = [
    {
      label: "Products",
      subLabel: "ပစ္စည်းမှတ်ပုံတင်မှု",
      registered: registeredProducts,
      expected: purchase.expectedProducts,
      caption: "products registered",
    },
    {
      label: "Variants",
      subLabel: "အမျိုးအစားမှတ်ပုံတင်မှု",
      registered: registeredVariants,
      expected: expectedVariants,
      caption: "variants registered",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        {summaryItems.map((item) => (
          <article
            key={item.label}
            className="flex  justify-between items-center gap-4 rounded-xl border border-dashed p-4"
          >
            <DualText label={item.label} subLabel={item.subLabel} size="sm" />

            <div className="flex items-end justify-end font-semibold">
              <span className="relative text-2xl font text-highlight-soft">
                {item.registered}
                <ThreeSparklesIcon className="absolute top-0 left-3 w-2 h-2 text-highlight-soft" />
              </span>
              <span className="text-muted-foreground">/{item.expected}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

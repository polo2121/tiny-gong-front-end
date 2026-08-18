import DualText from "@/components/DualText";

import type { PurchaseRecord } from "../../_types/purchase";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

type PurchaseDetailsProps = {
  purchase: PurchaseRecord;
};

export function PurchaseDetails({ purchase }: PurchaseDetailsProps) {
  const purchaseDetailsConfig = [
    {
      label: "Supplier",
      subLabel: "အဝယ်",
      value: purchase.supplier,
      className: "col-span-2",
    },
    {
      label: "Purchase Date",
      subLabel: "ဝယ်ယူသည့်ရက်စွဲ",
      value: purchase.date,
    },

    {
      label: "Amount",
      subLabel: "ပမာဏ",
      value: `${formatCurrency(purchase.totalPrice)} MMK`,
    },
    {
      label: "Note",
      subLabel: "မှတ်ချက်",
      value: purchase.note ?? "No note has been written yet.",
      className: "col-span-2",
      valueClassName: !purchase.note ? "text-muted-foreground font-medium" : "",
    },
  ];

  return (
    <section className="flex flex-col gap-2 rounded-xl border border-dashed border-border p-4">
      <ul className="grid grid-cols-2 gap-2">
        {purchaseDetailsConfig.map((item) => (
          <li
            className={cn(
              "flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4",
              item.className,
            )}
            key={item.label}
          >
            <DualText label={item.label} subLabel={item.subLabel} size="xs" />
            <p
              className={cn(
                "break-words text-base font-bold",
                item.valueClassName,
              )}
            >
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

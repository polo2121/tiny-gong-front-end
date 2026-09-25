import DualText from "@/components/DualText";

import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

import type { PurchaseRecord } from "@/lib/purchase-draft/new-purchase-schema";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type PurchaseDetailsContentProps = {
  purchase: PurchaseRecord;
};

export function PurchaseDetailsContent({
  purchase,
}: PurchaseDetailsContentProps) {
  const purchaseAmount =
    purchase.totalPrice === null
      ? "Not calculated yet"
      : `${formatCurrency(purchase.totalPrice)} MMK`;

  const purchaseDetails = [
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
      value: purchaseAmount,
      valueClassName:
        purchase.totalPrice === null ? "font-medium text-muted-foreground" : "",
    },
    {
      label: "Note",
      subLabel: "မှတ်ချက်",
      value: purchase.note || "No note has been written yet.",
      className: "col-span-2",
      valueClassName: !purchase.note ? "font-medium text-muted-foreground" : "",
    },
  ];

  return (
    <>
      <div className="rounded-xl border-dashed border-border">
        <ul className="grid grid-cols-2 gap-4">
          {purchaseDetails.map((item) => (
            <li
              key={item.label}
              className={cn(
                "flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4",
                item.className,
              )}
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
      </div>
    </>
  );
}

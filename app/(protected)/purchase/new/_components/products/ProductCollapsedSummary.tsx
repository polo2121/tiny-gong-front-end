import { formatCurrency } from "@/lib/currency";

export function ProductCollapsedSummary({
  totalQty,
  grandTotal,
  imageTotal,
  variantTotal,
}: any) {
  const summaryItems = [
    { label: "Total Qty", value: totalQty },
    { label: "Grand Total", value: `${formatCurrency(grandTotal)} MMK` },
    { label: "Images", value: imageTotal },
    { label: "Variants", value: variantTotal },
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <div key={item.label} className="rounded-xl bg-slate-50 p-3">
          <p className="font-margarine text-xs text-muted-foreground">
            {item.label}
          </p>
          <p className="mt-1 font-margarine text-lg text-highlight-soft">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

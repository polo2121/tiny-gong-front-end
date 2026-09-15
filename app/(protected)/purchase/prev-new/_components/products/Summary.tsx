import { formatCurrency } from "@/lib/currency";

export function Summary({ variants }: { variants: any[] }) {
  const calculateSummary = () => {
    const totalQty = variants.reduce((sum, variant) => sum + variant.qty, 0);

    const grandTotal = variants.reduce(
      (sum, { qty, unitPrice }) => sum + qty * unitPrice,
      0,
    );

    return [
      {
        label: "Total Qty",
        value: totalQty,
      },
      {
        label: "Variants",
        value: variants.length,
      },
      {
        label: "Images",
        value: 0,
      },
      {
        label: "Grand Total",
        value: formatCurrency(grandTotal),
      },
    ];
  };

  const summaryItems = calculateSummary();

  return (
    <div className={"grid gap-2 sm:grid-cols-4"}>
      {summaryItems.map((item) => (
        <div key={item.label} className=" rounded-md bg-slate-50 px-3 py-2">
          <p className="font-margarine text-xs text-muted-foreground">
            {item.label}
          </p>
          <p className="mt-1 font-semibold text-lg text-right text-highlight-soft">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

import DualText from "@/components/DualText";
import { ThreeSparklesIcon } from "@/components/icons/ThreeSparklesIcon";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";

export function PurchaseDraftSummary({ products }: any) {
  const variants = products.flatMap((product: any) => product.variants ?? []);

  const totalQty = variants.reduce(
    (total: number, variant: any) => total + Number(variant.qty || 0),
    0,
  );

  const grandTotal = variants.reduce(
    (total: number, variant: any) =>
      total + Number(variant.qty || 0) * Number(variant.unitPrice || 0),
    0,
  );

  const uploadedImages = products.reduce(
    (total: number, product: any) =>
      total + Number(product.images?.length ?? 0),
    0,
  );

  const summaryItems = [
    {
      label: "Products",
      subLabel: "ကုန်ပစ္စည်းများ",
      value: products.length,
    },
    {
      label: "Variants",
      subLabel: "အမျိုးအစားများ",
      value: variants.length,
    },
    {
      label: "Total Qty",
      subLabel: "စုစုပေါင်းအရေအတွက်",
      value: totalQty,
    },
    {
      label: "Images",
      subLabel: "ပုံများ",
      value: uploadedImages,
    },
  ];

  return (
    <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-8 shadow-card xl:sticky xl:top-6">
      <DualText label="Purchase Summary" subLabel="ဝယ်ယူမှုအနှစ်ချုပ်" />

      <div className="grid grid-cols-2 gap-2">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-dashed border-slate-200 p-4"
          >
            <DualText label={item.label} subLabel={item.subLabel} size="xs" />

            <div className="relative">
              <p className="text-2xl font-semibold text-highlight-soft">
                {String(item.value).padStart(2, "0")}
              </p>
              <ThreeSparklesIcon className="absolute -top-1 -right-1 size-2 text-highlight-soft" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative rounded-xl">
        <div className="flex justify-between rounded-lg border border-slate-100 bg-slate-100/60 p-3 shadow-card">
          <DualText
            label="Grand Total"
            subLabel="စုစုပေါင်းတန်ဖိုး"
            size="sm"
          />
          <div className="relative h-fit w-fit">
            <ThreeSparklesIcon className="absolute right-0 -top-1 size-2 text-yellow-300" />

            <p className="relative h-fit wrap-break-words text-3xl font-semibold text-highlight-soft">
              {formatCurrency(grandTotal)}
            </p>
            <span className="absolute top-9 right-1 text-[11px] font-medium text-muted-foreground">
              MMK
            </span>
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg">
        Save Purchase
      </Button>
    </aside>
  );
}

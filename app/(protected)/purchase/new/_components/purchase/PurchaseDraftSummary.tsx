import DualText from "@/components/DualText";
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
    <aside className="flex w-full h-fit flex-col gap-4 rounded-2xl border border-dashed border-slate-200 p-4 shadow-card xl:sticky xl:top-6 ">
      <DualText label="Purchase Summary" subLabel="ဝယ်ယူမှုအနှစ်ချုပ်" />

      <div className="grid grid-cols-2 gap-2 ">
        {summaryItems.map((item) => (
          <div key={item.label} className="rounded-xl bg-slate-50 p-3">
            <DualText label={item.label} subLabel={item.subLabel} size="xs" />
            <p className="mt-2 font-margarine text-2xl text-highlight-soft">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card-surface p-4">
        <DualText label="Grand Total" subLabel="စုစုပေါင်းတန်ဖိုး" size="sm" />
        <p className="mt-2 break-words font-margarine text-2xl text-highlight-soft">
          {formatCurrency(grandTotal)} MMK
        </p>
      </div>

      <Button className="w-full" size="lg">
        Save Purchase
      </Button>
    </aside>
  );
}

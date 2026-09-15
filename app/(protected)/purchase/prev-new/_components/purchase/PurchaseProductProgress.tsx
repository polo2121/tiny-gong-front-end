import DualText from "@/components/DualText";
import { ThreeSparklesIcon } from "@/components/icons/ThreeSparklesIcon";

type PurchaseProductProgressProps = {
  productCount: number;
  variantCount: number;
};

export function PurchaseProductProgress({
  productCount,
  variantCount,
}: PurchaseProductProgressProps) {
  const totalCount = productCount + variantCount;
  const productPercent =
    totalCount === 0 ? 50 : Math.round((productCount / totalCount) * 100);
  const variantPercent = totalCount === 0 ? 50 : 100 - productPercent;

  const progressItems = [
    {
      label: "Products",
      subLabel: "ကုန်ပစ္စည်းများ",
      value: productCount,
    },
    {
      label: "Variants",
      subLabel: "အမျိုးအစားများ",
      value: variantCount,
    },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-dashed border-border p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {progressItems.map((item) => (
          <article
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4"
          >
            <DualText label={item.label} subLabel={item.subLabel} size="sm" />

            <span className="relative text-2xl font-bold text-highlight-soft">
              {item.value}
              <ThreeSparklesIcon className="absolute -right-2 top-0 size-2 text-highlight-soft" />
            </span>
          </article>
        ))}
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        {totalCount === 0 ? (
          <div className="h-full w-full bg-slate-200" />
        ) : (
          <div className="flex h-full">
            <div
              className="bg-highlight"
              style={{ width: `${productPercent}%` }}
            />
            <div
              className="bg-pink-300"
              style={{ width: `${variantPercent}%` }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

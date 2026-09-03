import DualText from "@/components/DualText";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/currency";

export function ProductVariantsSection({
  variants,
  variantAttributes,
  totalQty,
  grandTotal,
  onVariantChange,
  onVariantAttributeChange,
}: any) {
  const gridTemplateColumns = `${variantAttributes
    .map(() => "minmax(90px, 1fr)")
    .join(" ")} 80px 120px 120px 80px`;

  return (
    <section className="flex flex-col gap-3 rounded-xl p-3">
      <div className="flex items-end justify-between gap-4">
        <DualText label="Variants" subLabel="အမျိုးအစားများ" size="sm" />
        <p className="font-margarine text-sm text-highlight-soft">
          Variant: {String(variants.length).padStart(2, "0")}
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-soft">
        <div className="min-w-max">
          <div
            className="grid gap-2 rounded-lg bg-card-surface px-3 py-2 font-margarine text-sm text-table-header"
            style={{ gridTemplateColumns }}
          >
            {variantAttributes.map((attribute: string) => (
              <div key={attribute} className="capitalize">
                {attribute}
              </div>
            ))}
            <div className="text-right">Qty</div>
            <div className="text-right">Unit Price</div>
            <div className="text-right">Subtotal</div>
            <div className="text-right">Action</div>
          </div>

          <div className="flex flex-col">
            {variants.map((variant: any) => {
              const subtotal =
                Number(variant.qty || 0) * Number(variant.unitPrice || 0);

              return (
                <div
                  key={variant.id}
                  className="grid gap-2 border-b border-dashed border-slate-200 px-3 py-3 text-sm font-medium"
                  style={{ gridTemplateColumns }}
                >
                  {variantAttributes.map((attribute: string) => (
                    <Input
                      key={attribute}
                      value={variant.attributes?.[attribute] ?? ""}
                      placeholder={attribute}
                      autoComplete="off"
                      onChange={(event) =>
                        onVariantAttributeChange(
                          variant.id,
                          attribute,
                          event.target.value,
                        )
                      }
                      className="h-9 rounded-sm border border-slate-100 bg-slate-50 px-2 text-sm shadow-none md:text-sm"
                    />
                  ))}
                  <Input
                    type="number"
                    value={variant.qty}
                    min={0}
                    onChange={(event) =>
                      onVariantChange(variant.id, {
                        qty: Number(event.target.value),
                      })
                    }
                    className="h-9 rounded-sm border border-slate-100 bg-slate-50 px-2 text-right text-sm shadow-none md:text-sm"
                  />
                  <Input
                    type="number"
                    value={variant.unitPrice}
                    min={0}
                    onChange={(event) =>
                      onVariantChange(variant.id, {
                        unitPrice: Number(event.target.value),
                      })
                    }
                    className="h-9 rounded-sm border border-slate-100 bg-slate-50 px-2 text-right text-sm shadow-none md:text-sm"
                  />
                  <div className="text-right font-bold">
                    {formatCurrency(subtotal)} MMK
                  </div>
                  <div className="text-right text-highlight-soft">Edit</div>
                </div>
              );
            })}

            <div
              className="grid gap-2 px-3 pt-3 text-sm font-bold"
              style={{ gridTemplateColumns }}
            >
              {variantAttributes.map((attribute: string) => (
                <div key={attribute} />
              ))}
              <div className="text-right">{totalQty}</div>
              <div />
              <div className="text-right">{formatCurrency(grandTotal)} MMK</div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

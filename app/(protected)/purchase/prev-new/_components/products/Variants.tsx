"use client";

import { Copy, Trash2 } from "lucide-react";
import DualText from "@/components/DualText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { usePurchaseDraft } from "../../_context/purchase-draft.context";

import type { VariantDraft } from "../../schema/new-purchase-schema";

interface VariantsProps {
  productId: string;
  variants?: VariantDraft[];
}

const WIDE_THREE_COLUMN_ATTRIBUTES = new Set([
  "edition",
  "setType",
  "model",
  "design",
  "language",
  "flavor",
]);

const ATTRIBUTE_COLUMNS_WIDTH = 49;
const FIXED_COLUMN_WIDTHS = {
  qty: 9,
  unitPrice: 14,
  subtotal: 17,
  actions: 11,
} as const;

export function Variants({ productId, variants = [] }: VariantsProps) {
  const attributeCols = Array.from(
    new Set(variants.flatMap((v) => Object.keys(v.attributes ?? {}))),
  );
  const attributeWeights = attributeCols.map((attribute) =>
    attributeCols.length === 3 && WIDE_THREE_COLUMN_ATTRIBUTES.has(attribute)
      ? 1.6
      : 1,
  );
  const totalAttributeWeight = attributeWeights.reduce(
    (total, weight) => total + weight,
    0,
  );

  const totalQty = variants.reduce((sum, v) => sum + (Number(v.qty) || 0), 0);
  const grandTotal = variants.reduce(
    (sum, v) => sum + (Number(v.qty) || 0) * (Number(v.unitPrice) || 0),
    0,
  );

  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-xl pt-2 pb-6">
      <div className="flex items-end justify-between gap-4">
        <DualText label="Variants" subLabel="အမျိုးအစားများ" size="sm" />
        <p className="font-margarine text-sm text-highlight-soft">
          Variant: {String(variants.length).padStart(2, "0")}
        </p>
      </div>

      <div className="max-w-full overflow-hidden">
        <table className="w-full max-w-full table-fixed border-collapse text-sm">
          <colgroup>
            {attributeCols.map((attribute, index) => (
              <col
                key={attribute}
                style={{
                  width: `${
                    totalAttributeWeight === 0
                      ? 0
                      : (ATTRIBUTE_COLUMNS_WIDTH * attributeWeights[index]) /
                        totalAttributeWeight
                  }%`,
                }}
              />
            ))}
            <col style={{ width: `${FIXED_COLUMN_WIDTHS.qty}%` }} />
            <col style={{ width: `${FIXED_COLUMN_WIDTHS.unitPrice}%` }} />
            <col style={{ width: `${FIXED_COLUMN_WIDTHS.subtotal}%` }} />
            <col style={{ width: `${FIXED_COLUMN_WIDTHS.actions}%` }} />
          </colgroup>
          <thead>
            <tr className="rounded-lg bg-card-surface font-margarine text-table-header">
              {attributeCols.map((attribute) => (
                <th
                  key={attribute}
                  className="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 text-left capitalize font-normal"
                >
                  {attribute}
                </th>
              ))}
              <th className="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 text-right font-normal">
                Qty
              </th>
              <th className="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 text-right font-normal">
                Unit Price
              </th>
              <th className="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 text-right font-normal">
                Subtotal
              </th>
              <th aria-label="Actions" />
            </tr>
          </thead>

          <tbody>
            {variants.map((variant, index) => (
              <VariantRow
                key={variant.id}
                variant={variant}
                index={index}
                productId={productId}
                attributeCols={attributeCols}
              />
            ))}
          </tbody>

          <tfoot>
            <tr className="font-semibold">
              <td colSpan={attributeCols.length} />
              <td className="px-3 pt-3 text-right align-top">
                <div className="flex flex-col gap-1">
                  <span className="font-margarine font-normal text-xs text-muted-foreground">
                    Total Qty
                  </span>
                  <span>{totalQty}</span>
                </div>
              </td>
              <td />
              <td className="overflow-hidden px-2 pt-3 text-right align-top">
                <div className="flex flex-col gap-1">
                  <span className="font-margarine font-normal text-xs text-muted-foreground">
                    Grand Total
                  </span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

function VariantRow({
  variant,
  index,
  productId,
  attributeCols,
}: {
  variant: VariantDraft;
  index: number;
  productId: string;
  attributeCols: string[];
}) {
  const updateField = usePurchaseDraft((s) => s.updateVariantField);
  const updateAttribute = usePurchaseDraft((s) => s.updateVariantAttribute);
  const cloneVariant = usePurchaseDraft((s) => s.cloneVariant);
  const removeVariant = usePurchaseDraft((s) => s.removeVariant);

  const qty = Number(variant.qty) || 0;
  const unitPrice = Number(variant.unitPrice) || 0;
  const subtotal = qty * unitPrice;

  const inputClass =
    "h-9 min-w-0 rounded-sm border border-slate-200/80 bg-slate-100/50 px-2 text-base text-right shadow-none md:text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-xs";

  return (
    <tr className="border-b border-dashed border-slate-200">
      {attributeCols.map((attName) => (
        <td key={attName} className="min-w-0 overflow-hidden">
          <Input
            value={variant.attributes[attName] ?? ""}
            title={variant.attributes[attName] || undefined}
            onChange={(event) =>
              updateAttribute(
                productId,
                variant.id,
                attName,
                event.target.value,
              )
            }
            placeholder={attName}
            aria-label={`Variant ${index + 1} ${attName}`}
            autoComplete="off"
            className="h-9 min-w-0 truncate rounded-sm border border-slate-100 bg-slate-50 px-2 text-base shadow-none md:text-base"
          />
        </td>
      ))}
      <td className="min-w-0 overflow-hidden">
        <Input
          type="number"
          min={0}
          value={qty}
          onChange={(event) =>
            updateField(
              productId,
              variant.id,
              "qty",
              Number(event.target.value) || 0,
            )
          }
          aria-label={`Variant ${index + 1} quantity`}
          className={inputClass}
        />
      </td>
      <td className="min-w-0 overflow-hidden text-left">
        <Input
          type="number"
          min={0}
          value={unitPrice}
          onChange={(event) =>
            updateField(
              productId,
              variant.id,
              "unitPrice",
              Number(event.target.value) || 0,
            )
          }
          aria-label={`Variant ${index + 1} unit price`}
          className={inputClass}
        />
      </td>
      <td className="overflow-hidden px-2 py-3 text-right text-base font-bold">
        <span className="block truncate" title={formatCurrency(subtotal)}>
          {formatCurrency(subtotal)}
        </span>
      </td>
      <td className="overflow-hidden px-1 py-3">
        <div className="flex items-center justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-md"
            aria-label={`Clone variant ${index + 1}`}
            title="Clone variant"
            showIcon={false}
            onClick={() => cloneVariant(productId, variant.id)}
          >
            <Copy className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            tone="destructive"
            size="icon"
            className="size-8 rounded-md"
            aria-label={`Remove variant ${index + 1}`}
            title="Remove variant"
            showIcon={false}
            onClick={() => removeVariant(productId, variant.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

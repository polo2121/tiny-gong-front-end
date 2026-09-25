"use client";

import { Copy, Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";

import { usePurchaseDraftStore } from "../_store/purchase-draft.store";
import { getVariantAttributes } from "../_taxonomy/product-taxonomy";

import {
  getValidationError,
  type PurchaseValidationIssues,
} from "../_validation/validation-errors";

type VariantsProps = {
  productId: string;
  productIndex: number;
  validationIssues: PurchaseValidationIssues;
  onStructuralChange: () => void;
};

const QTY_WIDTH = 64;
const UNIT_PRICE_WIDTH = 92;
const SUBTOTAL_WIDTH = 92;
const ACTIONS_WIDTH = 72;

const FIXED_WIDTH =
  QTY_WIDTH + UNIT_PRICE_WIDTH + SUBTOTAL_WIDTH + ACTIONS_WIDTH;

export function Variants({
  productId,
  productIndex,
  validationIssues,
  onStructuralChange,
}: VariantsProps) {
  const product = usePurchaseDraftStore(
    useShallow((state) => {
      const product = state.draft.products.find(
        (product) => product.id === productId,
      );

      if (!product) {
        return null;
      }

      return {
        subcategory: product.subcategory,

        variants: product.variants,
      };
    }),
  );

  const actions = usePurchaseDraftStore(
    useShallow((state) => ({
      addVariant: state.addVariant,

      removeVariant: state.removeVariant,

      duplicateVariant: state.duplicateVariant,

      updateVariantAttribute: state.updateVariantAttribute,

      updateVariantQty: state.updateVariantQty,

      updateVariantUnitPrice: state.updateVariantUnitPrice,
    })),
  );

  if (!product) {
    return null;
  }

  const attributes = getVariantAttributes(product.subcategory);

  /*
   * Whatever space remains after
   * Qty / Price / Subtotal / Actions
   * is divided equally between
   * dynamic attribute columns.
   *
   * Example:
   *
   * 2 attrs:
   * remaining / 2
   *
   * 3 attrs:
   * remaining / 3
   */
  const attributeWidth = `calc((100% - ${FIXED_WIDTH}px) / ${attributes.length})`;

  return (
    <div className="w-full min-w-0">
      <Table
        className="
          w-full
          table-fixed
          border-separate
          border-spacing-0

          [&_th:not(:last-child)]:px-3
          [&_td:not(:last-child)]:px-3

          [&_td]:h-10
          [&_td]:py-0

          [&_td:not(:nth-last-child(-n+2))]:border-r
          [&_td:not(:nth-last-child(-n+2))]:border-dashed
          [&_td:not(:nth-last-child(-n+2))]:border-slate-200

          [&_tbody_td:not(:last-child)]:border-b
        [&_tbody_td:not(:last-child)]:border-slate-200
          [&_th:last-child]:w-20

        "
      >
        {/* Column widths */}
        {/* <colgroup>
          {attributes.map((attribute) => (
            <col
              key={attribute}
              style={{
                width: attributeWidth,
              }}
            />
          ))}

          <col
            style={{
              width: QTY_WIDTH,
            }}
          />

          <col
            style={{
              width: UNIT_PRICE_WIDTH,
            }}
          />

          <col
            style={{
              width: SUBTOTAL_WIDTH,
            }}
          />

          <col
            style={{
              width: ACTIONS_WIDTH,
            }}
          />
        </colgroup> */}

        {/* Header */}
        <TableHeader
          className="
            font-margarine
            font-normal
            capitalize
            opacity-80

            [&_th:not(:last-child)]:bg-card-surface
            [&_th:first-child]:rounded-l-lg
            [&_th:nth-last-child(2)]:rounded-r-lg
            [&_td:last-child]:w-2
          "
        >
          <TableRow className="hover:bg-transparent">
            {attributes.map((attribute) => (
              <TableHead key={attribute} className="text-sm">
                {attribute}
              </TableHead>
            ))}

            <TableHead className="text-right text-sm">Qty</TableHead>

            <TableHead className="text-right text-sm">Unit Price</TableHead>

            <TableHead className="text-right text-sm">Subtotal</TableHead>

            <TableHead aria-label="Actions" className="bg-transparent" />
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {product.variants.map((variant, variantIndex) => {
            const subtotal = variant.qty * variant.unitPrice;

            const qtyError = getValidationError(validationIssues, [
              "products",
              productIndex,
              "variants",
              variantIndex,
              "qty",
            ]);

            const unitPriceError = getValidationError(validationIssues, [
              "products",
              productIndex,
              "variants",
              variantIndex,
              "unitPrice",
            ]);

            return (
              <TableRow
                key={variant.id}
                className="
                    text-sm
                    hover:bg-transparent

                    [&:hover>td:not(:last-child)]:bg-muted/50
                  "
              >
                {/* Dynamic Attributes */}
                {attributes.map((attribute) => {
                  const attributeError = getValidationError(validationIssues, [
                    "products",
                    productIndex,
                    "variants",
                    variantIndex,
                    "attributes",
                    attribute,
                  ]);

                  return (
                    <TableCell key={attribute} className="whitespace-normal">
                      <input
                        aria-label={attribute}
                        value={variant.attributes[attribute] ?? ""}
                        className="
                              h-8
                              w-full
                              min-w-0
                              border-0
                              bg-transparent
                              p-0
                              text-sm
                              outline-none
                            "
                        onChange={(event) =>
                          actions.updateVariantAttribute(
                            productId,
                            variant.id,
                            attribute,
                            event.target.value,
                          )
                        }
                      />

                      {attributeError && (
                        <small className="block text-xs text-destructive">
                          {attributeError}
                        </small>
                      )}
                    </TableCell>
                  );
                })}

                {/* Quantity */}
                <TableCell className="whitespace-normal text-right">
                  <input
                    type="number"
                    min={0}
                    value={variant.qty}
                    className="
                        h-8
                        w-full
                        min-w-0
                        appearance-none
                        border-0
                        bg-transparent
                        p-0
                        text-right
                        text-sm
                        tabular-nums
                        outline-none

                        [appearance:textfield]

                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                      "
                    onChange={(event) =>
                      actions.updateVariantQty(
                        productId,
                        variant.id,
                        Number(event.target.value),
                      )
                    }
                    onFocus={(event) => {
                      if (event.target.value === "0") {
                        event.target.select();
                      }
                    }}
                  />

                  {qtyError && (
                    <small className="block text-xs text-destructive">
                      {qtyError}
                    </small>
                  )}
                </TableCell>

                {/* Unit Price */}
                <TableCell className="whitespace-normal text-right">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={variant.unitPrice}
                    className="
                        h-8
                        w-full
                        min-w-0
                        appearance-none
                        border-0
                        bg-transparent
                        p-0
                        text-right
                        text-sm
                        tabular-nums
                        outline-none

                        [appearance:textfield]

                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                      "
                    onChange={(event) =>
                      actions.updateVariantUnitPrice(
                        productId,
                        variant.id,
                        Number(event.target.value),
                      )
                    }
                    onFocus={(event) => {
                      if (event.target.value === "0") {
                        event.target.select();
                      }
                    }}
                  />

                  {unitPriceError && (
                    <small className="block text-xs text-destructive">
                      {unitPriceError}
                    </small>
                  )}
                </TableCell>

                {/* Subtotal */}
                <TableCell className="whitespace-nowrap text-right text-sm tabular-nums">
                  {subtotal.toFixed(2)}
                </TableCell>

                {/* Actions */}
                <TableCell className="border-0 bg-transparent px-1">
                  <div className="flex gap-1">
                    {/* Clone */}
                    <button
                      type="button"
                      aria-label="Clone variant"
                      title="Clone variant"
                      className="
                          flex
                          size-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-md

                          hover:bg-muted
                        "
                      onClick={() => {
                        actions.duplicateVariant(productId, variant.id);

                        onStructuralChange();
                      }}
                    >
                      <Copy className="size-4" />
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      aria-label="Remove variant"
                      title="Remove variant"
                      disabled={product.variants.length === 1}
                      className="
                          flex
                          size-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-md

                          hover:bg-muted

                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      onClick={() => {
                        if (product.variants.length <= 1) {
                          return;
                        }

                        actions.removeVariant(productId, variant.id);

                        onStructuralChange();
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Add Variant */}
      <button
        type="button"
        className="mt-3 text-sm"
        onClick={() => {
          actions.addVariant(productId);

          onStructuralChange();
        }}
      >
        Add Variant
      </button>
    </div>
  );
}

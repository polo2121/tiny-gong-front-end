"use client";

import { Copy, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { formatCurrency } from "@/lib/currency";

export type VariantTableItem = {
  id: string;
  attributes: Record<string, string>;
  qty: number;
  unitPrice: number;
};

export type VariantTableProps = {
  variants: readonly VariantTableItem[];
  caption?: string;
  onVariantChange?: (variant: VariantTableItem) => void;
  onClone?: (variantId: string) => void;
  onRemove?: (variantId: string) => void;
};

const data = [
  {
    id: "ee",
    attributes: { color: "red", size: "M" },
    qty: 2,
    unitPrice: 2000,
  },
];

/** Pass change callbacks from a client component to enable editing and actions. */
export function VariantTable({
  variants = data,
  caption = "Product variants",
  onVariantChange,
  onClone,
  onRemove,
}: VariantTableProps) {
  const attributes = Array.from(
    new Set(variants.flatMap((variant) => Object.keys(variant.attributes))),
  );
  const hasActions = Boolean(onClone || onRemove);
  const columnCount = attributes.length + 4 + Number(hasActions);
  const totalQty = variants.reduce((total, variant) => total + variant.qty, 0);
  const totalPrice = variants.reduce(
    (total, variant) => total + variant.qty * variant.unitPrice,
    0,
  );

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Variant</TableHead>
          {attributes.map((attribute) => (
            <TableHead key={attribute} scope="col" className="capitalize">
              {attribute.replace(/([a-z])([A-Z])/g, "$1 $2")}
            </TableHead>
          ))}
          <TableHead scope="col" className="text-right">
            Qty
          </TableHead>
          <TableHead scope="col" className="text-right">
            Unit price
          </TableHead>
          <TableHead scope="col" className="text-right">
            Subtotal
          </TableHead>
          {hasActions && (
            <TableHead scope="col" className="text-right">
              Actions
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {variants.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columnCount}
              className="h-24 text-center text-muted-foreground"
            >
              No variants yet.
            </TableCell>
          </TableRow>
        ) : (
          variants.map((variant, index) => (
            <TableRow key={variant.id}>
              <TableHead scope="row">{index + 1}</TableHead>
              {attributes.map((attribute) => (
                <TableCell key={attribute}>
                  {onVariantChange ? (
                    <Input
                      className="min-w-28"
                      aria-label={`Variant ${index + 1} ${attribute}`}
                      value={variant.attributes[attribute] ?? ""}
                      onChange={(event) =>
                        onVariantChange({
                          ...variant,
                          attributes: {
                            ...variant.attributes,
                            [attribute]: event.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    variant.attributes[attribute] || "—"
                  )}
                </TableCell>
              ))}
              {(["qty", "unitPrice"] as const).map((field) => (
                <TableCell key={field} className="text-right tabular-nums">
                  {onVariantChange ? (
                    <Input
                      type="number"
                      min={0}
                      step={field === "qty" ? 1 : "any"}
                      className="min-w-24 text-right"
                      aria-label={`Variant ${index + 1} ${field === "qty" ? "quantity" : "unit price"}`}
                      value={variant[field]}
                      onChange={(event) => {
                        const value =
                          event.target.value === ""
                            ? 0
                            : event.target.valueAsNumber;
                        if (
                          !Number.isFinite(value) ||
                          value < 0 ||
                          (field === "qty" && !Number.isInteger(value))
                        )
                          return;
                        onVariantChange({ ...variant, [field]: value });
                      }}
                    />
                  ) : (
                    formatCurrency(variant[field])
                  )}
                </TableCell>
              ))}
              <TableCell className="text-right tabular-nums">
                {formatCurrency(variant.qty * variant.unitPrice)}
              </TableCell>
              {hasActions && (
                <TableCell>
                  <div className="flex justify-end gap-1">
                    {onClone && (
                      <Button
                        variant="ghost"
                        size="icon"
                        showIcon={false}
                        aria-label={`Clone variant ${index + 1}`}
                        onClick={() => onClone(variant.id)}
                      >
                        <Copy className="size-4" />
                      </Button>
                    )}
                    {onRemove && (
                      <Button
                        variant="ghost"
                        tone="destructive"
                        size="icon"
                        showIcon={false}
                        aria-label={`Remove variant ${index + 1}`}
                        onClick={() => onRemove(variant.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
      {variants.length > 0 && (
        <TableFooter>
          <TableRow>
            <TableHead scope="row" colSpan={attributes.length + 1}>
              Total
            </TableHead>
            <TableCell className="text-right tabular-nums">
              {formatCurrency(totalQty)}
            </TableCell>
            <TableCell />
            <TableCell className="text-right tabular-nums">
              {formatCurrency(totalPrice)}
            </TableCell>
            {hasActions && <TableCell />}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}

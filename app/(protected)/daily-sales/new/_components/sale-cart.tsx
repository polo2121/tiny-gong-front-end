import DualText from "@/components/DualText";
import { ShoppingCartRemoveIcon } from "@/components/icons/ShoppingCartRemoveIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { CartItem } from "../_data";
import { CategoryBadge } from "./category-badge";
import ImagePreview from "@/components/ImagePreview";

type SaleCartProps = {
  columns: string[];
  items: CartItem[];
};

export function SaleCart({ columns, items }: SaleCartProps) {
  return (
    <Card className="min-h-105 bg-white rounded-none">
      <CardHeader className="px-0">
        <CardTitle>
          <DualText label="Sale Cart" subLabel="အရောင်းခြင်းတောင်း" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-75 flex-col px-0">
        <DesktopCartTable columns={columns} items={items} />
        <MobileCartList items={items} />
      </CardContent>
    </Card>
  );
}

function CartItem({ item }: { item: CartItem }) {
  return (
    <div className="flex gap-4">
      <ImagePreview src="" alt="s" />

      <div className="flex min-w-0 flex-col items-start gap-1">
        <CategoryBadge category={item.category} />
        <h3 className="truncate font-semibold text-base ">{item.name}</h3>
        {item.variant && (
          <p className="truncate text-highlight-soft text-xs  font-semibold">
            {item.variant.label}
          </p>
        )}
        <p className="text-xs opacity-55">{item.sku}</p>
      </div>
    </div>
  );
}

function CartDetail({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div>
      <dt className="opacity-55">{label}</dt>
      <dd className={className}>{value}</dd>
    </div>
  );
}

function RemoveCartItemButton({ itemName }: { itemName: string }) {
  return (
    <Button
      variant="ghost"
      aria-label={`Remove ${itemName}`}
      className="flex size-9 shrink-0 items-center justify-center text-pink-700 transition hover:-translate-y-0.5 "
    >
      <ShoppingCartRemoveIcon className="size-5" />
    </Button>
  );
}

function DesktopCartTable({ columns, items }: SaleCartProps) {
  return (
    <div className="hidden  md:block">
      <div className="grid grid-cols-[minmax(180px,1fr)_80px_110px_110px_110px_48px] gap-3 px-4 py-3 text-sm font-margarine  tracking-wide text-table-header bg-card-surface rounded-full">
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>

      <div className="divide-y divide-hightlight/10 divide-dashed  bg-white">
        {items.map((item) => (
          <div
            key={item.sku}
            className="grid grid-cols-[minmax(180px,1fr)_80px_110px_110px_110px_48px] items-center gap-3 px-4 py-4 text-base font-medium"
          >
            <CartItem item={item} />
            <span>{item.qty}</span>
            <span>{item.price}</span>
            <span>{item.discount}</span>
            <span className="text-base">{item.total}</span>
            <RemoveCartItemButton itemName={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCartList({ items }: { items: CartItem[] }) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {items.map((item) => (
        <div
          key={item.sku}
          className="rounded-2xl border border-hightlight/15 bg-white p-4 shadow-card"
        >
          <div className="flex items-start justify-between gap-3">
            <CartItem item={item} />
            <RemoveCartItemButton itemName={item.name} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold">
            <CartDetail label="Qty" value={item.qty} />
            <CartDetail label="Price" value={`${item.price} MMK`} />
            <CartDetail label="Discount" value={`${item.discount} MMK`} />
            <CartDetail
              label="Total"
              value={`${item.total} MMK`}
              className="text-lg"
            />
          </dl>
        </div>
      ))}
    </div>
  );
}

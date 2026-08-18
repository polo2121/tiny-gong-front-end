import { formatCurrency } from "@/lib/currency";

import type { CartItem } from "../../_data";
import { CartItemIdentity } from "./CartItemIdentity";
import { DiscountPopover } from "./DiscountPopover";
import { RemoveCartItemButton } from "./RemoveCartItemButton";

export function MobileCartList({ items }: { items: CartItem[] }) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {items.map((item) => (
        <div
          key={item.sku}
          className="rounded-2xl border border-hightlight/15 bg-white p-4 shadow-card"
        >
          <div className="flex items-start justify-between gap-3">
            <CartItemIdentity item={item} />
            <RemoveCartItemButton itemName={item.name} itemSku={item.sku} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold">
            <CartDetail label="Qty" value={item.qty} />
            <CartDetail label="Price" value={`${formatCurrency(item.price)} MMK`} />
            <div>
              <dt className="opacity-55">Discount</dt>
              <dd>
                <DiscountPopover
                  sku={item.sku}
                  currentDiscount={item.discount}
                  price={item.price}
                  qty={item.qty}
                />
              </dd>
            </div>
            <CartDetail
              label="Total"
              value={`${formatCurrency(item.price * item.qty - item.discount)} MMK`}
              className="text-lg"
            />
          </dl>
        </div>
      ))}
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

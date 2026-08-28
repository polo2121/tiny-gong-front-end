"use client";

import { AmountStepper } from "@/components/AmountStepper";
import { formatCurrency } from "@/lib/currency";

import type { CartItem } from "../../_data";
import { useSaleDraftStore } from "../../_stores/use-sale-draft-store";
import { DiscountPopover } from "./DiscountPopover";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { CartItemIdentity } from "./CartItemIdentity";

type DesktopCartTableProps = {
  items: CartItem[];
};

export function DesktopCartTable({ items }: DesktopCartTableProps) {
  const setItemQuantity = useSaleDraftStore((state) => state.setItemQuantity);

  return (
    <div className="hidden overflow-x-auto md:block">
      <div className="min-w-[840px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.sku}>
                <TableCell>
                  <CartItemIdentity item={item} />
                </TableCell>
                <TableCell>
                  <AmountStepper
                    className="flex"
                    value={item.qty}
                    min={1}
                    max={99}
                    onValueChange={(quantity) =>
                      setItemQuantity(item.sku, quantity)
                    }
                  />
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <DiscountPopover
                    sku={item.sku}
                    currentDiscount={item.discount}
                    price={item.price}
                    qty={item.qty}
                  />
                </TableCell>
                <TableCell>{item.price * item.qty - item.discount}</TableCell>
                <TableCell>{/* actions */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className="grid grid-cols-[minmax(160px,1fr)_130px_120px_120px_120px_60px] gap-6 rounded-full bg-card-surface px-4 py-3 font-margarine text-sm tracking-wide text-table-header">
          <span>Items</span>
          <span className="bg-red-300">Qty</span>
          <span>Price</span>
          <span>Discount</span>
          <span>Total</span>
          <span className="sr-only">Remove</span>
        </div>

        <div className="divide-y divide-dashed divide-hightlight/10 bg-white">
          {items.map((item) => (
            <div
              key={item.sku}
              className="grid grid-cols-[minmax(160px,1fr)_130px_120px_120px_120px_60px] items-center justify-center gap-6 px-4 py-4 text-base font-medium "
            >
              <CartItemIdentity item={item} />
              <AmountStepper
                className="h-10"
                value={item.qty}
                min={1}
                max={99}
                onValueChange={(quantity) =>
                  setItemQuantity(item.sku, quantity)
                }
              />
              <span className="text-base">{formatCurrency(item.price)}</span>
              <DiscountPopover
                sku={item.sku}
                currentDiscount={item.discount}
                price={item.price}
                qty={item.qty}
              />
              <span className="text-base">{formatCurrency(item.total)}</span>
              <RemoveCartItemButton itemName={item.name} itemSku={item.sku} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

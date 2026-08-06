"use client";

import { TrashIcon } from "@/components/icons/TrashIcon";
import {
  Table,
  TableActionButton,
  TableActionLink,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { usePurchaseStore } from "../_stores/use-purchase-store";

export function PurchaseRecordsTable() {
  const purchases = usePurchaseStore((state) => state.purchases);
  const removePurchase = usePurchaseStore((state) => state.removePurchase);

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Variants</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Purchase Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => {
            const registeredVariants = purchase.registeredProducts.reduce(
              (total, product) => total + product.registeredVariantIds.length,
              0,
            );
            const expectedVariants = purchase.registeredProducts.reduce(
              (total, product) => total + product.expectedVariants,
              0,
            );

            return (
              <TableRow key={purchase.id}>
                <TableCell className="font-bold">{purchase.id}</TableCell>
                <TableCell className="font-semibold">
                  {purchase.supplier}
                </TableCell>

                <TableCell className="font-semibold">
                  {purchase.registeredProducts.length}/
                  {purchase.expectedProducts}
                </TableCell>

                <TableCell>
                  {registeredVariants}/{expectedVariants}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  {purchase.amount}
                </TableCell>
                <TableCell className="text-right">{purchase.date}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <TableActionLink href={`/purchase/${purchase.id}`}>
                      View
                    </TableActionLink>
                    <TableActionLink href={`/purchase/${purchase.id}/edit`}>
                      Edit
                    </TableActionLink>
                    <TableActionButton
                      tone="destructive"
                      aria-label={`Remove ${purchase.id}`}
                      onClick={() => removePurchase(purchase.id)}
                    >
                      <TrashIcon className="size-4" />
                    </TableActionButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

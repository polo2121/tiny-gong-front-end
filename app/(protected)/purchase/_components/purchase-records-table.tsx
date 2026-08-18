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
import { formatCurrency } from "@/lib/currency";

import { EditPurchaseDrawer } from "./edit-purchase-drawer";
import { useDeletePurchase, usePurchases } from "../_hooks/use-purchases";
import type { PurchaseRecord } from "../_types/purchase";
import { DestructiveConfirmation } from "@/components/DestructiveConfirmation";
import { Button } from "@/components/ui/button";

type PurchaseRecordsTableProps = {
  initialPurchases: PurchaseRecord[];
};

export function PurchaseRecordsTable({
  initialPurchases,
}: PurchaseRecordsTableProps) {
  const { data: purchases = [] } = usePurchases(initialPurchases);
  const deletePurchase = useDeletePurchase();

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
            <TableHead className="text-right">Purchase Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => {
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

                <TableCell className="text-right font-semibold">
                  {formatCurrency(purchase.totalPrice)} MMK
                </TableCell>
                <TableCell className="text-right">{purchase.date}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <TableActionLink href={`/purchase/${purchase.id}`}>
                      View
                    </TableActionLink>
                    <EditPurchaseDrawer purchase={purchase} />
                    <DestructiveConfirmation
                      trigger={
                        <Button
                          size="fit"
                          variant="outline-dashed"
                          tone="destructive"
                          showIcon={false}
                        >
                          <TrashIcon className="size-4" />
                        </Button>
                      }
                      title="ကုန်ကျစရိတ်ကို ဖျက်မလား?"
                      description="ဒီကုန်ကျစရိတ်ကို အပြီးတိုင်ဖျက်သွားမှာဖြစ်ပြီး ပြန်လည်ရယူနိုင်တော့မှာ မဟုတ်ပါ။"
                      onConfirm={() => deletePurchase.mutateAsync(purchase.id)}
                    />
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

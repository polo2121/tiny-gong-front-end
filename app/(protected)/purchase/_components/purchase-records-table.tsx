"use client";
import {
  Table,
  TableActionLink,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/currency";
import { useDeletePurchase } from "../_hooks/use-purchases";
import { PurchaseRecord } from "../_schemas/purchase-schema";
import { DestructiveConfirmation } from "@/components/DestructiveConfirmation";
import { Button } from "@/components/ui/button";
import { TableEmptyRow } from "@/components/table/TableEmptyRow";
import { TableErrorRow } from "@/components/table/TableErrorRow";
import { TableLoadingRows } from "@/components/table/TableLoadingRows";

type PurchaseRecordsTableProps = {
  purchaseRecords: PurchaseRecord[];
  hasError?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  onEdit: (purchase: PurchaseRecord) => void;
};

export function PurchaseRecordsTable({
  purchaseRecords,
  hasError = false,
  isLoading = false,
  errorMessage,
  onEdit,
}: PurchaseRecordsTableProps) {
  const deletePurchase = useDeletePurchase();

  function renderTableState() {
    if (isLoading) return <TableLoadingRows />;
    if (hasError)
      return (
        <TableErrorRow
          colSpan={5}
          title="Could not load purchases."
          description={errorMessage}
        />
      );
    if (purchaseRecords.length === 0) return <TableEmptyRow colSpan={5} />;

    return null;
  }

  const tableState = renderTableState();

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
            <TableHead className="text-right">Purchase Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableState ??
            purchaseRecords.map((purchase) => {
              return (
                <TableRow key={purchase.id}>
                  <TableCell className="font-bold">{purchase.id}</TableCell>
                  <TableCell className="font-semibold">
                    {purchase.supplier}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    {purchase.totalPrice === null
                      ? "Not calculated yet"
                      : `${formatCurrency(purchase.totalPrice)} MMK`}
                  </TableCell>
                  <TableCell className="text-right">{purchase.date}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <TableActionLink href={`/purchase/${purchase.id}`}>
                        View
                      </TableActionLink>
                      <Button
                        variant="ghost"
                        size="fit"
                        showIcon={false}
                        onClick={() => onEdit(purchase)}
                      >
                        Edit
                      </Button>
                      <DestructiveConfirmation
                        title="ကုန်ကျစရိတ်ကို ဖျက်မလား?"
                        description="ဒီကုန်ကျစရိတ်ကို အပြီးတိုင်ဖျက်သွားမှာဖြစ်ပြီး ပြန်လည်ရယူနိုင်တော့မှာ မဟုတ်ပါ။"
                        onConfirm={() =>
                          deletePurchase.mutateAsync(purchase.id)
                        }
                        isPending={deletePurchase.isPending}
                        error={deletePurchase.error}
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

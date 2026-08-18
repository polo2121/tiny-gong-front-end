"use client";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

import { PurchaseForm } from "./PurchaseForm";
import { useUpdatePurchase } from "../_hooks/use-purchases";
import type { PurchaseFormValues } from "../_schemas/purchase-schema";
import type { PurchaseRecord } from "../_types/purchase";
import { useState } from "react";
import { getErrorMessage } from "@/lib/errors/get-error-message";
import { normalizeError } from "@/lib/errors/normalize-error";
import { Alert } from "@/components/ui/alert";

type EditPurchaseDrawerProps = {
  purchase: PurchaseRecord;
};

function getEditPurchaseDefaultValues(
  purchase: PurchaseRecord,
): PurchaseFormValues {
  return {
    supplier: purchase.supplier,
    purchaseDate: purchase.date,
    expectedProducts: purchase.expectedProducts,
    totalPrice: purchase.totalPrice,
    note: purchase.note ?? "",
  };
}

export function EditPurchaseDrawer({ purchase }: EditPurchaseDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const updatePurchase = useUpdatePurchase();

  function handleOpenChange(nextOpen: boolean) {
    if (!updatePurchase.isPending) setIsOpen(nextOpen);
    if (nextOpen) {
      setError("");
    }
  }

  const savePurchase = async (values: PurchaseFormValues) => {
    try {
      await updatePurchase.mutateAsync({
        purchaseId: purchase.id,
        input: values,
      });
      setIsOpen(false);
      setError("");
    } catch (error) {
      const appError = normalizeError(error);
      setError(getErrorMessage(appError.code));
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger
        render={
          <Button type="button" variant="ghost" size="fit" showIcon={false} />
        }
      >
        Edit
      </DrawerTrigger>
      <DrawerContent className="m-auto max-h-[calc(100dvh-2rem)] max-w-2xl px-8 py-4 [--drawer-height:auto] [--drawer-content-max-height:calc(100dvh-2rem)]">
        <DrawerHeader className="shrink-0 items-start justify-start">
          <DualText
            label="Edit Purchase"
            subLabel="ဝယ်ယူမှု ပြင်ဆင်ရန်"
            size="lg"
          />
        </DrawerHeader>

        {error && (
          <Alert
            className="mt-4"
            tone="destructive"
            title="Could not save purchase"
            description={error}
          />
        )}

        <PurchaseForm
          defaultValues={getEditPurchaseDefaultValues(purchase)}
          submitLabel="Save Changes"
          isSubmitting={updatePurchase.isPending}
          onSubmit={savePurchase}
          secondaryAction={
            <DrawerClose
              render={
                <Button type="button" variant="outline" showIcon={false} />
              }
            >
              Cancel
            </DrawerClose>
          }
        />
      </DrawerContent>
    </Drawer>
  );
}

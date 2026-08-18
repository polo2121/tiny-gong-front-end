"use client";

import { useState } from "react";

import DualText from "@/components/DualText";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PurchaseForm } from "./PurchaseForm";
import { useCreatePurchase } from "../_hooks/use-purchases";
import type { PurchaseFormValues } from "../_schemas/purchase-schema";
import { getErrorMessage } from "@/lib/errors/get-error-message";
import { normalizeError } from "@/lib/errors/normalize-error";

const newPurchaseDefaultValues: PurchaseFormValues = {
  supplier: "",
  purchaseDate: "",
  expectedProducts: 1,
  totalPrice: 0,
  note: "",
};
export function NewPurchaseDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const createPurchase = useCreatePurchase();

  async function savePurchaseDraft(purchase: PurchaseFormValues) {
    try {
      await createPurchase.mutateAsync(purchase);
      setIsOpen(false);
      setError("");
    } catch (error) {
      const appError = normalizeError(error);
      setError(getErrorMessage(appError.code));
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!createPurchase.isPending) setIsOpen(nextOpen);

    if (nextOpen) {
      setError("");
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger render={<Button type="button" />}>
        New Purchase
      </DrawerTrigger>
      <DrawerContent className="m-auto  max-w-2xl px-8 py-4 [--drawer-height:auto] [--drawer-content-max-height:calc(100dvh-2rem)] b">
        <DrawerHeader className="items-start justify-start shrink-0">
          <DualText label="New Purchase" subLabel="ဝယ်ယူမှုအသစ်" size="lg" />
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
          defaultValues={newPurchaseDefaultValues}
          submitLabel="Save Purchase"
          isSubmitting={createPurchase.isPending}
          onSubmit={savePurchaseDraft}
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

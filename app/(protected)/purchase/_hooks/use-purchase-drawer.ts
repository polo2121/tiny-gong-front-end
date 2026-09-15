import { useState } from "react";

import { PurchaseRecordFormValues ,PurchaseRecord} from "../prev-new/schema/new-purchase-schema";

export function usePurchaseDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchaseRecord | null>(null);

  function openNewPurchase() {
    setSelectedPurchase(null);
    setIsOpen(true);
  }

  function openEditPurchase(purchase: PurchaseRecord) {
    setSelectedPurchase(purchase);
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
    setSelectedPurchase(null);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (!open) {
      setSelectedPurchase(null);
    }
  }

  return {
    isOpen,
    selectedPurchase,
    openNewPurchase,
    openEditPurchase,
    closeDrawer,
    handleOpenChange,
  };
}
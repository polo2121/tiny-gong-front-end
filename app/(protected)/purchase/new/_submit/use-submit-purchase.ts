"use client";

import { useMutation } from "@tanstack/react-query";

import { createPurchase } from "../api/create-purchase";
import { uploadPurchaseImages } from "../api/upload-purchase-images";
import type { PurchaseDraft } from "../_schema/purchase-draft.schema";
import { usePurchaseDraftStore } from "../_store/purchase-draft.store";
import { buildPurchasePayload } from "./purchase-payload";
import { preparePurchaseImages } from "./prepare-purchase-images";

export function useSubmitPurchase() {
  const resetDraft = usePurchaseDraftStore((state) => state.resetDraft);

  return useMutation({
    mutationFn: async (validDraft: PurchaseDraft) => {
      const preparedImages = preparePurchaseImages(validDraft);
      const uploadedImages = await uploadPurchaseImages(preparedImages);
      const payload = buildPurchasePayload(validDraft, uploadedImages);
      return createPurchase(payload);
    },
    onSuccess: () => {
      resetDraft();
    },
  });
}

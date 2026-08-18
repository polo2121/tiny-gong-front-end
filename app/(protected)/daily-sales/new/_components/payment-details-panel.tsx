"use client";

import { useState } from "react";
import { X } from "lucide-react";

import DualText from "@/components/DualText";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DraftPreviewCard } from "./draft-preview-card";
import { PaymentDetailsForm } from "./payment/payment-details-form";
import { PaymentPreview } from "./payment/payment-preview";
import { paymentDraftSchema, type PaymentDraft } from "./payment/schema";
import { useSaleDraftStore } from "../_stores/use-sale-draft-store";

export function PaymentDetailsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const paymentDraft = useSaleDraftStore((state) => state.payment);
  const setPaymentDraft = useSaleDraftStore((state) => state.setPayment);
  const result = paymentDraftSchema.safeParse(paymentDraft);
  const savedPayment = result.success ? result.data : null;
  const hasSavedPayment = Boolean(savedPayment);

  function openModal() {
    setIsOpen(true);
  }

  function handleOpenChange(nextOpen: boolean) {
    setIsOpen(nextOpen);
  }

  function savePaymentDraft(paymentDraft: PaymentDraft) {
    setPaymentDraft(paymentDraft);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DraftPreviewCard
        title="Payment Details"
        subLabel="ငွေးပေးချေမှုအချက်အလက်"
        actionLabel={hasSavedPayment ? "Edit" : "Add"}
        onAction={openModal}
      >
        <PaymentPreview payment={savedPayment} />
      </DraftPreviewCard>

      <DialogContent className="flex w-200 max-w-none flex-col p-8">
        <DialogHeader>
          <DialogTitle>
            <DualText label="Add Payment" subLabel="ငွေပေးချေမှုအချက်အလက်" />
          </DialogTitle>
          <DialogClose
            type="button"
            aria-label="Close payment details"
            className="flex size-9 items-center justify-center rounded-full text-hightlight transition hover:bg-highlight/10"
          >
            <X className="size-5" />
          </DialogClose>
        </DialogHeader>

        {isOpen && (
          <PaymentDetailsForm
            initialPaymentDraft={savedPayment}
            onCancel={() => setIsOpen(false)}
            onSave={savePaymentDraft}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

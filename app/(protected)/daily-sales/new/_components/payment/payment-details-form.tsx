"use client";

import { useState } from "react";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { RadioGroup } from "@/components/ui/radio-group";

import { paymentProviders } from "./constants";
import { PaymentRadioItem } from "./payment-radio-item";
import type { PaymentDraft } from "./schema";
import { paymentDraftSchema } from "./schema";

export const defaultPaymentDraft: PaymentDraft = {
  status: "paid",
  method: "wallet",
  provider: "k-pay",
};

type PaymentStatus = "paid" | "unpaid";
type PaymentMethod = "cash" | "wallet" | "bank";
type PaymentProvider =
  | (typeof paymentProviders.wallet)[number]["value"]
  | (typeof paymentProviders.bank)[number]["value"]
  | null;

type PaymentFormState = {
  status: PaymentStatus;
  method: PaymentMethod;
  provider: PaymentProvider;
};

interface PaymentDetailsFormProps {
  initialPaymentDraft: PaymentDraft | null;
  onCancel: () => void;
  onSave: (paymentDraft: PaymentDraft) => void;
}

export function PaymentDetailsForm({
  initialPaymentDraft,
  onCancel,
  onSave,
}: PaymentDetailsFormProps) {
  const initialDraft = initialPaymentDraft ?? defaultPaymentDraft;
  const [paymentForm, setPaymentForm] = useState<PaymentFormState>({
    status: initialDraft.status,
    method: initialDraft.method,
    provider: initialDraft.provider,
  });
  const [error, setError] = useState("");

  const handleStatusChanged = (status: PaymentStatus) => {
    setError("");

    if (status === "unpaid") {
      return setPaymentForm({
        ...paymentForm,
        status,
        method: "cash",
        provider: null,
      });
    }
    return setPaymentForm({
      ...paymentForm,
      status,
    });
  };

  const handleMethodChanged = (method: PaymentMethod) => {
    setError("");

    if (method === "cash") {
      return setPaymentForm({
        ...paymentForm,
        method,
        provider: null,
      });
    }
    return setPaymentForm({
      ...paymentForm,
      method,
      provider: method === "bank" ? "aya-bank" : "k-pay",
    });
  };

  const savePaymentDraft = () => {
    setError("");

    const result = paymentDraftSchema.safeParse(paymentForm);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check payment details.");
      return;
    }

    onSave(result.data);
  };

  return (
    <>
      <form className="mt-6 flex flex-1 flex-col gap-6">
        <div>
          <p>status: {paymentForm.status}</p>
          <p>method: {paymentForm.method}</p>
          <p>provider: {paymentForm.provider}</p>
        </div>
        <section className="grid gap-8 lg:grid-cols-[180px_1fr]">
          <DualText
            label="Payment Status"
            subLabel="ငွေပေးချေမှုအခြေအနေ"
            size="sm"
          />

          <RadioGroup
            className="flex flex-wrap gap-3"
            value={paymentForm.status}
            onValueChange={(value) => {
              handleStatusChanged(value as PaymentStatus);
            }}
          >
            <PaymentRadioItem
              value="paid"
              label="Paid"
              logoSrc="/images/paid.svg"
              isSelected={paymentForm.status === "paid"}
            />
            <PaymentRadioItem
              value="unpaid"
              label="Unpaid"
              logoSrc="/images/not-paid.svg"
              isSelected={paymentForm.status === "unpaid"}
            />
          </RadioGroup>
        </section>

        <section className="grid gap-8 lg:grid-cols-[180px_1fr]">
          <DualText
            label="Payment Method"
            subLabel="ငွေပေးချေနိုင်သော နည်းလမ်းများ"
            size="sm"
          />

          <RadioGroup
            className="flex flex-wrap gap-3"
            value={paymentForm.method}
            onValueChange={(value) => {
              handleMethodChanged(value as PaymentMethod);
            }}
          >
            <PaymentRadioItem
              value="wallet"
              label="Wallet"
              logoSrc="/images/mobile-wallet.svg"
              isSelected={paymentForm.method === "wallet"}
              disabled={paymentForm.status === "unpaid"}
            />
            <PaymentRadioItem
              value="bank"
              label="Banking"
              logoSrc="/images/bank.svg"
              isSelected={paymentForm.method === "bank"}
              disabled={paymentForm.status === "unpaid"}
            />
            <PaymentRadioItem
              value="cash"
              label="Cash"
              logoSrc="/images/cash.svg"
              isSelected={paymentForm.method === "cash"}
              disabled={paymentForm.status === "unpaid"}
            />
          </RadioGroup>
        </section>

        {paymentForm.method !== "cash" && (
          <section className="grid gap-8 lg:grid-cols-[180px_1fr]">
            <DualText
              label="Payment Provider"
              subLabel="ငွေပေးချေနိုင်သော နည်းလမ်းများ"
              size="sm"
            />

            <RadioGroup
              value={paymentForm.provider ?? ""}
              onValueChange={(value) => {
                setError("");
                setPaymentForm({
                  ...paymentForm,
                  provider: value as PaymentProvider,
                });
              }}
              className="flex flex-wrap gap-3"
              disabled={paymentForm.status === "unpaid"}
            >
              {paymentProviders[paymentForm.method].map((paymentProvider) => (
                <PaymentRadioItem
                  key={paymentProvider.value}
                  value={paymentProvider.value}
                  label={paymentProvider.label}
                  logoSrc={paymentProvider.logoSrc ?? undefined}
                  isSelected={paymentProvider.value === paymentForm.provider}
                  disabled={paymentForm.status === "unpaid"}
                />
              ))}
            </RadioGroup>
          </section>
        )}
      </form>

      {error && <FieldError>{error}</FieldError>}

      <DialogFooter className="mt-auto ml-auto grid w-full max-w-70 grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          showIcon={false}
          className="w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="button" showIcon={true} onClick={savePaymentDraft}>
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

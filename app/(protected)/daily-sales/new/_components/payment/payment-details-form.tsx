"use client";

import { useState } from "react";
import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";

import { paymentProviders } from "./constants";
import { PaymentRadioItem } from "./payment-radio-item";
import { paymentDraftSchema, type PaymentDraft } from "./schema";
import type {
  PaymentFormState,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
} from "./types";

const defaultPaymentForm: PaymentFormState = {
  status: "paid",
  method: "wallet",
  provider: "k-pay",
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
  const [payment, setPayment] = useState<PaymentFormState>(
    initialPaymentDraft ?? defaultPaymentForm,
  );

  const [error, setError] = useState("");

  const patchPayment = (patch: Partial<PaymentFormState>) => {
    setError("");

    setPayment((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const savePayment = () => {
    const result = paymentDraftSchema.safeParse(payment);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check payment details.");
      return;
    }

    onSave(result.data);
  };

  return (
    <>
      <form className="mt-6 grid gap-8">
        <div className="grid grid-cols-[180px_1fr]">
          <DualText
            label="Payment Status"
            subLabel="ငွေပေးချေမှုအခြေအနေ"
            size="sm"
          />

          <div className="grid grid-cols-3 gap-4">
            <PaymentRadioItem
              name="payment-status"
              value="paid"
              checked={payment.status === "paid"}
              logoSrc="/images/paid.svg"
              onChange={() =>
                patchPayment({
                  status: "paid",
                  method: "wallet",
                  provider: "k-pay",
                })
              }
            >
              Paid
            </PaymentRadioItem>

            <PaymentRadioItem
              name="payment-status"
              value="unpaid"
              checked={payment.status === "unpaid"}
              logoSrc="/images/not-paid.svg"
              onChange={() =>
                patchPayment({
                  status: "unpaid",
                  method: null,
                  provider: null,
                })
              }
            >
              Unpaid
            </PaymentRadioItem>
          </div>
        </div>

        {payment.status === "paid" && (
          <div className="grid grid-cols-[180px_1fr]">
            <DualText
              label="Payment Method"
              subLabel="ငွေပေးချေမှုနည်းလမ်း"
              size="sm"
            />

            <div className="grid grid-cols-3 gap-4">
              <PaymentRadioItem
                name="payment-method"
                value="wallet"
                checked={payment.method === "wallet"}
                logoSrc="/images/mobile-wallet.svg"
                onChange={() =>
                  patchPayment({
                    method: "wallet",
                    provider: "k-pay",
                  })
                }
              >
                Wallet
              </PaymentRadioItem>

              <PaymentRadioItem
                name="payment-method"
                value="bank"
                checked={payment.method === "bank"}
                logoSrc="/images/bank.svg"
                onChange={() =>
                  patchPayment({
                    method: "bank",
                    provider: "aya-bank",
                  })
                }
              >
                Bank
              </PaymentRadioItem>

              <PaymentRadioItem
                name="payment-method"
                value="cash"
                checked={payment.method === "cash"}
                logoSrc="/images/cash.svg"
                onChange={() =>
                  patchPayment({
                    method: "cash",
                    provider: null,
                  })
                }
              >
                Cash
              </PaymentRadioItem>
            </div>
          </div>
        )}

        {payment.status === "paid" &&
          payment.method !== null &&
          payment.method !== "cash" && (
            <div className="grid grid-cols-[180px_1fr]">
              <DualText
                label="Payment Provider"
                subLabel="ငွေပေးချေမှုဝန်ဆောင်မှု"
                size="sm"
              />

              <div className="grid grid-cols-3 gap-4">
                {paymentProviders[payment.method].map((provider) => (
                  <PaymentRadioItem
                    key={provider.value}
                    name="payment-provider"
                    value={provider.value}
                    checked={payment.provider === provider.value}
                    logoSrc={provider.logoSrc}
                    onChange={() =>
                      patchPayment({
                        provider: provider.value as PaymentProvider,
                      })
                    }
                  >
                    {provider.label}
                  </PaymentRadioItem>
                ))}
              </div>
            </div>
          )}

        {error && <FieldError>{error}</FieldError>}
      </form>

      <DialogFooter className="mt-6 flex gap-3">
        <Button
          type="button"
          variant="outline"
          showIcon={false}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="button" showIcon={true} onClick={savePayment}>
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

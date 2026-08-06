import { StatusBadge } from "@/components/ui/status-badge";

import type { PaymentDraft } from "./schema";

interface PaymentPreviewProps {
  payment: PaymentDraft | null;
}

export function PaymentPreview({ payment }: PaymentPreviewProps) {
  if (!payment) {
    return (
      <p className="text-sm font-semibold opacity-60">
        No payment details selected.
      </p>
    );
  }

  return (
    <dl className="flex flex-col gap-3 text-sm font-semibold">
      <div className="flex items-center justify-between gap-4">
        <dt className="opacity-65">Status</dt>
        <dd>
          <StatusBadge tone={payment.status === "paid" ? "success" : "danger"}>
            {payment.status === "paid" ? "Paid" : "Unpaid"}
          </StatusBadge>
        </dd>
      </div>

      {payment.status === "paid" && (
        <div className="flex items-center justify-between gap-4">
          <dt className="opacity-65">Method</dt>
          <dd className="text-right text-base font-bold text-slate-950 capitalize">
            {payment.method}
          </dd>
        </div>
      )}

      {payment.status === "paid" && payment.provider && (
        <div className="flex items-start justify-between gap-4">
          <dt className="opacity-65">Provider</dt>
          <dd className="max-w-48 text-right text-base font-bold text-slate-950 capitalize">
            {payment.provider}
          </dd>
        </div>
      )}
    </dl>
  );
}

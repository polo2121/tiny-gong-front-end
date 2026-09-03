"use client";

import type { ReactNode } from "react";

import DualText from "@/components/DualText";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";

type PurchaseDetailsPanelProps = {
  purchaseId: string;
  children: ReactNode;
};

export function PurchaseDetailsPanel({
  purchaseId,
  children,
}: PurchaseDetailsPanelProps) {
  return (
    <section className="flex flex-col gap-4 flex-3">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-start gap-2">
          <DualText label="Purchase Details" subLabel="ဝယ်ယူမှုအသေးစိတ်" />
          <StatusBadge className="bg-teal-50 text-highlight-soft">
            {purchaseId}
          </StatusBadge>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="fit" showIcon={false}>
            Edit
          </Button>
          <Button
            variant="outline-dashed"
            tone="destructive"
            size="fit"
            showIcon={false}
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </header>

      {children}
    </section>
  );
}

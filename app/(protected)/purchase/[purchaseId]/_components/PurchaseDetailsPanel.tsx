"use client";

import DualText from "@/components/DualText";

import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@/components/icons/TrashIcon";
import type { ReactNode } from "react";

import type { PurchaseRecord } from "../../_schemas/purchase-schema";

type PurchaseDetailsPanelProps = {
  purchase: PurchaseRecord;
  purchaseId: string;
  children: ReactNode;
};

export function PurchaseDetailsPanel({
  purchase,
  purchaseId,
  children,
}: PurchaseDetailsPanelProps) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <header className="flex gap-4 justify-between">
        <div className="flex gap-2">
          <DualText label="Purchase Details" subLabel="ဝယ်ယူမှုအသေးစိတ်" />
          <StatusBadge className="w-fit h-fit font-bold text-highlight-soft bg-teal-50">
            {purchaseId}
          </StatusBadge>
        </div>

        <div className="flex shrink-0 gap-2 h-fit">
          <Button variant="ghost" size="fit" showIcon={false}>
            Edit
          </Button>
          <Button
            variant="outline-dashed"
            tone="destructive"
            showIcon={false}
            size="fit"
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}

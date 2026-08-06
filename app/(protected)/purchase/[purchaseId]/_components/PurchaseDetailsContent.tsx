"use client";

import Link from "next/link";

import DualText from "@/components/DualText";

import { PurchaseDetails } from "./PurchaseDetails";
import { PurchaseProgressSummary } from "../../_components/purchase-progress-summary";
import { usePurchaseStore } from "../../_stores/use-purchase-store";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrashIcon } from "@/components/icons/TrashIcon";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DocumentNotFoundIcon } from "@/components/icons/DocumentNotFoundIcon";

export function PurchaseDetailsContent({ purchaseId }: { purchaseId: string }) {
  const purchase = usePurchaseStore((state) =>
    state.purchases.find((purchaseItem) => purchaseItem.id === purchaseId),
  );

  if (!purchase) {
    return (
      <Empty className="rounded-2xl bg-slate-50 min-h-100">
        <EmptyHeader className="gap-2">
          <EmptyMedia className="size-14 rounded-full bg-highlight/10 text-highlight">
            <DocumentNotFoundIcon className="size-6" />
          </EmptyMedia>

          <div>
            <EmptyTitle className="flex flex-col">
              <span>Purchase Not Found</span>
              <span className="font-umoe text-base leading-5 text-muted-foreground">
                (ဝယ်ယူမှုရှာမတွေ့ပါ)
              </span>
            </EmptyTitle>
          </div>

          <StatusBadge className="w-fit bg-teal-50 text-highlight-soft">
            {purchaseId}
          </StatusBadge>
        </EmptyHeader>

        <EmptyContent>
          <EmptyDescription>
            This purchase may have been removed, or the purchase code does not
            match any saved draft.
          </EmptyDescription>
        </EmptyContent>

        <Link
          href="/purchase"
          className={buttonVariants({ variant: "default" })}
        >
          Back to Purchases
        </Link>
      </Empty>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      <header className="flex gap-4 justify-between">
        <div className="flex gap-2">
          <DualText label="Purchase Details" subLabel="ဝယ်ယူမှုအသေးစိတ်" />
          <StatusBadge className="w-fit h-fit font-bold text-highlight-soft bg-teal-50">
            {purchase.id}
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

      <PurchaseProgressSummary purchase={purchase} />
      <PurchaseDetails purchase={purchase} />
    </div>
  );
}

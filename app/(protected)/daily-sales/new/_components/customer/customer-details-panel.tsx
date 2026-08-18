"use client";

import { useState } from "react";
import { UserCheck, UserPlus, X } from "lucide-react";

import DualText from "@/components/DualText";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DraftPreviewCard } from "../draft-preview-card";
import { ExistingCustomerMode } from "./existing-customer-mode";
import { NewCustomerMode } from "./new-customer-mode";
import type { CustomerMode } from "./types";
import { useSaleDraftStore } from "../../_stores/use-sale-draft-store";

export function CustomerDetailsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CustomerMode>("existing");

  const savedCustomer = useSaleDraftStore((state) => state.customer);
  const setCustomer = useSaleDraftStore((state) => state.setCustomer);

  const hasCustomer = Boolean(savedCustomer);

  function handleOpenChange(nextOpen: boolean) {
    setIsOpen(nextOpen);
  }

  function openModal() {
    setMode("existing");
    setIsOpen(true);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DraftPreviewCard
        title="Customer Details"
        subLabel="ကုန်ပစ္စည်းလည်ပတ်မှု"
        actionLabel={hasCustomer ? "Edit" : "Add"}
        onAction={openModal}
      >
        {hasCustomer ? (
          <dl className="flex flex-col gap-3 text-sm font-semibold">
            <div className="flex items-center justify-between gap-4">
              <dt className="opacity-65">Customer</dt>
              <dd className="text-right font-bold text-slate-950 text-base">
                {savedCustomer?.name}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="opacity-65">Phone</dt>
              <dd className="text-right font-bold text-slate-950 text-base">
                {savedCustomer?.phone}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="opacity-65">Delivery</dt>
              <dd className="max-w-48 text-right font-bold text-slate-950 text-base">
                {savedCustomer?.deliveryAddress}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm font-semibold opacity-60">
            No customer selected.
          </p>
        )}
      </DraftPreviewCard>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <DualText
              label={hasCustomer ? "Edit Customer" : "Add Customer"}
              subLabel="ဖောက်သည်အချက်အလက်"
            />
          </DialogTitle>
          <DialogClose
            type="button"
            aria-label="Close customer details"
            className="flex size-9 items-center justify-center rounded-full text-hightlight transition hover:bg-highlight/10"
          >
            <X className="size-5" />
          </DialogClose>
        </DialogHeader>

        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as CustomerMode)}
          className="mt-5"
        >
          <TabsList>
            <TabsTrigger value="existing">
              <UserCheck className="size-4" />
              Existing Customer
            </TabsTrigger>
            <TabsTrigger value="new">
              <UserPlus className="size-4" />
              New Customer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing">
            <ExistingCustomerMode
              onCancel={() => setIsOpen(false)}
              onSave={(nextCustomer) => {
                setCustomer(nextCustomer);
                setIsOpen(false);
              }}
            />
          </TabsContent>
          <TabsContent value="new">
            <NewCustomerMode
              onSave={(nextCustomer) => {
                setCustomer(nextCustomer);
                setIsOpen(false);
              }}
              onCancel={() => setIsOpen(false)}
            />
          </TabsContent>
        </Tabs>

        {/* <DialogFooter>
          <DialogClose
            type="button"
            className={cn(
              "relative inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-hightlight px-4 py-2 font-chewy text-sm tracking-wide text-hightlight outline-none transition-all hover:-translate-y-0.5 hover:bg-highlight/10 focus-visible:ring-3 focus-visible:ring-ring/35",
            )}
          >
            Cancel
          </DialogClose>
          <Button type="button" showIcon={false}>
            Save / Apply
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

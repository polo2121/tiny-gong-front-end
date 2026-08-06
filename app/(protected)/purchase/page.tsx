import PageHeader from "@/components/PageHeader";
import DualText from "@/components/DualText";

import { Input } from "@/components/ui/input";

import { NewPurchaseDrawer } from "./_components/new-purchase-drawer";
import { PurchaseRecordsTable } from "./_components/purchase-records-table";
import { PurchaseStorePreview } from "./_components/purchase-store-preview";

export default function PurchasePage() {
  return (
    <PageHeader title="Purchase" subtitle="ဝယ်ယူမှုစာရင်း">
      <section className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="max-w-2xl text-sm font-semibold opacity-70">
            Review stock purchases, supplier orders, and incoming inventory
            records.
          </p>
        </div>

        <PurchaseStorePreview />

        <section className="flex flex-col gap-4">
          <header className="flex flex-col gap-4">
            <DualText
              label="Purchase Records"
              subLabel="ဝယ်ယူမှုမှတ်တမ်းများ"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Input
                type="search"
                placeholder="Search purchase ID or supplier"
                className="w-full sm:max-w-sm"
              />
              <NewPurchaseDrawer />
            </div>
          </header>

          <PurchaseRecordsTable />
        </section>
      </section>
    </PageHeader>
  );
}

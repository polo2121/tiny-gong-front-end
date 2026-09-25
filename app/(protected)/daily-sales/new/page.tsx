import PageHeader from "@/components/PageHeader";

import { CustomerDetailsPanel } from "./_components/customer/customer-details-panel";
import { OrderSummary } from "./_components/order-summary";
import { PaymentDetailsPanel } from "./_components/payment-details-panel";
import { SaleDraftPreview } from "./_components/sale-draft-preview";
import { SaleCart } from "./_components/sale-cart";
import { Button } from "@/components/ui/button";

export default function NewSalePage() {
  return (
    <PageHeader title="New Sale" subtitle="အရောင်းအသစ်">
      <SaleDraftPreview />

      <section className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex gap-6">
            <CustomerDetailsPanel />
            <PaymentDetailsPanel />
          </div>

          <SaleCart />
        </div>

        <aside className="flex flex-col gap-6 xl:sticky xl:top-6 xl:self-start">
          <OrderSummary />
          <Button>Save Sale</Button>
        </aside>
      </section>
    </PageHeader>
  );
}

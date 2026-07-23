import PageHeader from "@/components/PageHeader";

import { CustomerDetailsPanel } from "./_components/customer-details-panel";
import { OrderSummary } from "./_components/order-summary";
import { SaleItemSelector } from "./_components/sale-item-selector";
import { SaleCart } from "./_components/sale-cart";
import { cartColumns, cartItems, mockCustomers, orderTotals } from "./_data";

export default function NewSalePage() {
  return (
    <PageHeader title="New Sale" subtitle="အရောင်းအသစ်">
      <section className="grid w-full  xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
        <div className="flex min-w-0 flex-col gap-8">
          <SaleItemSelector />
          <SaleCart columns={cartColumns} items={cartItems} />
        </div>

        <aside className="flex flex-col gap-6 xl:sticky xl:top-6 xl:self-start">
          <OrderSummary totals={orderTotals} />
          <CustomerDetailsPanel existingCustomers={mockCustomers} />
        </aside>
      </section>
    </PageHeader>
  );
}

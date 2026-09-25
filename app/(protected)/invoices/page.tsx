import PageHeader from "@/components/PageHeader";

import InvoiceStats from "./_components/InvoiceStats";

export default function InvoicesPage() {
  return (
    <PageHeader title="Invoices" subtitle="ဘောင်ချာစရင်းများ">
      <section className="flex w-full flex-col">
        <InvoiceStats />
      </section>
    </PageHeader>
  );
}

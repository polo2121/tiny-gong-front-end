import PageHeader from "@/components/PageHeader";

import { ProductList } from "./_components/ProductList";
import { PurchaseDetailsContent } from "./_components/PurchaseDetailsContent";

type PurchaseDetailsPageProps = {
  params: Promise<{
    purchaseId: string;
  }>;
};

export default async function PurchaseDetailsPage({
  params,
}: PurchaseDetailsPageProps) {
  const { purchaseId } = await params;

  return (
    <PageHeader title="Purchase Details" subtitle="ဝယ်ယူမှုအသေးစိတ်">
      <section className="flex w-full gap-4 mb-10">
        <ProductList purchaseId={purchaseId} />
        <PurchaseDetailsContent purchaseId={purchaseId} />
      </section>
    </PageHeader>
  );
}

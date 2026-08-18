import PageHeader from "@/components/PageHeader";

import { ProductList } from "./_components/ProductList";
import { PurchaseDetailsContent } from "./_components/PurchaseDetailsContent";
import { fetchPurchaseDetails } from "../_services/purchase-api";

type PurchaseDetailsPageProps = {
  params: Promise<{
    purchaseId: string;
  }>;
};

export default async function PurchaseDetailsPage({
  params,
}: PurchaseDetailsPageProps) {
  const { purchaseId } = await params;
  const purchase = await fetchPurchaseDetails(purchaseId);

  return (
    <PageHeader title="Purchase Details" subtitle="ဝယ်ယူမှုအသေးစိတ်">
      {purchase ? (
        <section className="flex w-full gap-6 mb-10">
          <ProductList purchase={purchase} />
          <PurchaseDetailsContent purchase={purchase} purchaseId={purchaseId} />
        </section>
      ) : (
        <PurchaseDetailsContent purchase={null} purchaseId={purchaseId} />
      )}
    </PageHeader>
  );
}

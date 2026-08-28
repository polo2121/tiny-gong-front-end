import PageHeader from "@/components/PageHeader";

import { PurchaseDetailsView } from "./_components/PurchaseDetailsView";
import { getPurchaseDetailsByIdPageData } from "../_services/purchase-api";
import { PurchaseLoadErrorState } from "./_components/states/PurchaseLoadErrorState";
import { PurchaseNotFoundState } from "./_components/states/PurchaseNotFoundState";

type PurchaseDetailsPageProps = {
  params: Promise<{
    purchaseId: string;
  }>;
};

export default async function PurchaseDetailsPage({
  params,
}: PurchaseDetailsPageProps) {
  const { purchaseId } = await params;
  const { purchaseDetails, error } =
    await getPurchaseDetailsByIdPageData(purchaseId);

  function renderContent() {
    if (error) return <PurchaseLoadErrorState error={error} />;
    if (!purchaseDetails) return <PurchaseNotFoundState />;
    return (
      <PurchaseDetailsView
        purchaseDetails={purchaseDetails}
        purchaseId={purchaseId}
      />
    );
  }

  return (
    <PageHeader title="Purchase Details" subtitle="ဝယ်ယူမှုအသေးစိတ်">
      {renderContent()}
    </PageHeader>
  );
}

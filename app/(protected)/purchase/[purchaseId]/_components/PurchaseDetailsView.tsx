"use client";

import { ProductList } from "./products/ProductList";
import { PurchaseDetailsPanel } from "./PurchaseDetailsPanel";
import { PurchaseProgressSummary } from "./purchase/PurchaseProgressSummary";
import { ProductDraftProvider } from "../_stores/use-product-draft-store";
import { type PurchaseDetails } from "../_schemas/purchase-detail-schema";
import { PurchaseDetailsContent } from "./purchase/PurchaseDetailsContent";

type PurchaseDetailsViewProps = {
  purchaseDetails: PurchaseDetails;
  purchaseId: string;
};

export function PurchaseDetailsView({
  purchaseDetails,
  purchaseId,
}: PurchaseDetailsViewProps) {
  return (
    <ProductDraftProvider
      purchaseId={purchaseId}
      products={purchaseDetails.products}
    >
      <section className="mb-10 flex w-full gap-6">
        <ProductList />

        <PurchaseDetailsPanel
          purchase={purchaseDetails}
          purchaseId={purchaseId}
        >
          <PurchaseProgressSummary
            expectedProducts={purchaseDetails.expectedProducts}
            registeredProducts={purchaseDetails.products}
          />
          <PurchaseDetailsContent purchase={purchaseDetails} />
        </PurchaseDetailsPanel>
      </section>
    </ProductDraftProvider>
  );
}

import { createEmptyProduct } from "@/lib/purchase-draft/purchase-draft.store";
import { PurchaseDraftProvider } from "../_context/purchase-draft.context";
import PurchaseDraftPreview from "./PurchaseDraftPreview";
import { ProductList } from "./products/ProductList";
import { PurchaseDraftSummary } from "./purchase/PurchaseDraftSummary";

import { randomUUID } from "node:crypto";
import { ProductPreview } from "@/components/products/ProductPreview";
import { VariantTable } from "@/components/products/VariantTable";

const defaultEmptyPurchaseDraft = {
  purchaseId: randomUUID(),
  purchaseDate: "",
  supplierId: "",
  products: [createEmptyProduct()],
};

export default async function NewPurchaseView() {
  return (
    <section className="w-full lg:bg-slate-100">
      <div className="w-[60%] m-auto grid grid-cols-1 xL:max-w-6xl   gap-4 p-4">
        <PurchaseDraftProvider initialDraft={defaultEmptyPurchaseDraft}>
          {/* <PurchaseDraftPreview /> */}

          <ProductList />

          {/* <PurchaseDraftSummary products={products} /> */}
          <ProductPreview />
        </PurchaseDraftProvider>
      </div>
      <div className="w-[50%]">
        <ProductPreview />
        <VariantTable />
      </div>
    </section>
  );
}

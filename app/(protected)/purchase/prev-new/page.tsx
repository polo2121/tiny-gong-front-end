import React from "react";
import PageHeader from "@/components/PageHeader";

import NewPurchaseView from "./_components/NewPurchaseView";

export default function page() {
  return (
    <PageHeader title="New Purchase" subtitle="ဝယ်ယူမှုစာရင်း">
      <NewPurchaseView />
    </PageHeader>
  );
}
// features/purchases/api/get-purchase.ts
const fakePurchases: Record<string, any> = {
  "pur-3232": {
    purchaseId: "pur-3232",
    expectedProducts: 2,
    expectedVariants: 4,

    products: [
      {
        draftId: "draft-product-1",
        id: "prod-101",
        name: "Classic T-Shirt",
        image: null,

        variants: [
          {
            draftId: "draft-variant-1",
            id: "var-101",
            attributes: {
              color: "Black",
              size: "M",
            },
            quantity: 10,
            unitPrice: 15000,
          },
          {
            draftId: "draft-variant-2",
            id: "var-102",
            attributes: {
              color: "Black",
              size: "L",
            },
            quantity: 5,
            unitPrice: 15000,
          },
        ],
      },

      {
        draftId: "draft-product-2",
        id: "prod-102",
        name: "Oversized Hoodie",
        image: null,

        variants: [
          {
            draftId: "draft-variant-3",
            id: "var-103",
            attributes: {
              color: "Gray",
              size: "M",
            },
            quantity: 4,
            unitPrice: 35000,
          },
          {
            draftId: "draft-variant-4",
            id: "var-104",
            attributes: {
              color: "Gray",
              size: "L",
            },
            quantity: 6,
            unitPrice: 35000,
          },
        ],
      },
    ],
  },
};

export async function getPurchase(purchaseId: string): Promise<any | null> {
  // Fake network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return fakePurchases[purchaseId] ?? null;
}

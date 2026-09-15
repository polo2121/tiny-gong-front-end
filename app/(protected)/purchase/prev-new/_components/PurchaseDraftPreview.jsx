"use client";

import { usePurchaseDraft } from "../_context/purchase-draft.context";

export default function PurchaseDraftPreview() {
  const draft = usePurchaseDraft((state) => state.draft);

  return (
    <section className="min-w-0 rounded-lg border p-4 md:col-span-2">
      <h2 className="mb-3 font-semibold">Purchase draft live preview</h2>
      <pre className="max-h-96 overflow-auto text-xs">
        {JSON.stringify(draft, null, 2)}
      </pre>
    </section>
  );
}

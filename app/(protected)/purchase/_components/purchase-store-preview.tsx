"use client";

import { usePurchases } from "../_hooks/use-purchases";

export function PurchaseStorePreview() {
  const { data: purchases = [] } = usePurchases();

  return (
    <section className="rounded-2xl border border-dashed border-hightlight/25 bg-slate-950 p-4 text-white shadow-card">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="font-margarine text-sm tracking-wide">
          Purchase API Preview
        </h2>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
          Live
        </span>
      </div>

      <pre className="scrollbar-soft max-h-72 overflow-auto rounded-xl bg-black/25 p-4 text-xs leading-relaxed text-slate-100">
        {JSON.stringify({ purchases }, null, 2)}
      </pre>
    </section>
  );
}

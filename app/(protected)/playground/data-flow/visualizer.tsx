"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { ArrowDown, ArrowRight, GitBranch, RotateCcw } from "lucide-react";
import {
  initialVariants,
  nodes,
  schemas,
  proposedGroupSchema,
  proposedImageSchema,
  proposedProductSchema,
  proposedPurchaseSchema,
  type NodeId,
} from "./model";
import { getImageGroups } from "../../purchase/prev-new/_components/products/Images";
import { createPurchaseDraftStore } from "../../purchase/prev-new/_stores/purchase-draft.store";
import { useStore } from "zustand";

const button =
  "rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const panel =
  "min-w-0 rounded-xl border border-border bg-card p-5 text-card-foreground";
function Code({ value }: { value: unknown }) {
  return (
    <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-muted/50 p-4 text-xs leading-relaxed">
      <code>
        {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
      </code>
    </pre>
  );
}
function makeStore() {
  return createPurchaseDraftStore({
    purchaseId: "purchase-demo",
    purchaseDate: "2026-09-10",
    supplierId: "supplier-demo",
    products: [
      {
        id: "p1",
        name: "Cotton T-shirt",
        category: "clothing",
        subcategory: "t-shirts",
        imageGroups: [],
        variants: initialVariants.map((v) => ({
          ...v,
          attributes: { ...v.attributes },
        })),
      },
    ],
  });
}

export default function DataFlowExplorer({
  sources,
}: {
  sources: Record<string, { file: string; code: string }>;
}) {
  const [store] = useState(makeStore);
  const draft = useStore(store, (s) => s.draft);
  const [selected, setSelected] = useState<NodeId>("purchase");
  const [proposed, setProposed] = useState(false);
  const [trace, setTrace] = useState(
    "Edit a variant to trace a real store action.",
  );
  const [step, setStep] = useState(0);
  const [imageAdded, setImageAdded] = useState(false);
  const product = draft.products[0];
  const variants = product.variants as typeof initialVariants;
  const groups = getImageGroups(variants, ["color"]).map((g, i) => ({
    ...g,
    images:
      imageAdded && i === 0
        ? [{ id: "img-demo", url: "/demo/front.jpg", fileName: "front.jpg" }]
        : [],
  }));
  const proposedProduct = { ...product, imageGroups: groups };
  const displayDraft = proposed
    ? { ...draft, products: [proposedProduct] }
    : draft;
  const sampleImage = proposed
    ? (groups[0]?.images[0] ?? {
        id: "img-demo",
        url: "/demo/front.jpg",
        fileName: "front.jpg",
      })
    : { id: "img-demo", url: "/demo/front.jpg", fileName: "front.jpg" };
  const values = {
    purchase: displayDraft,
    product: proposed ? proposedProduct : product,
    variant: variants[0],
    group: groups[0],
    image: sampleImage,
  };
  const schema =
    selected === "purchase"
      ? proposedPurchaseSchema
      : selected === "group"
        ? proposedGroupSchema
        : selected === "product"
          ? proposed
            ? proposedProductSchema
            : schemas.product
          : selected === "image"
            ? proposed
              ? proposedImageSchema
              : schemas.image
            : schemas.variant;
  const result = schema?.safeParse(values[selected]);
  const node = nodes.find((n) => n.id === selected)!;
  const total = variants.reduce((sum, v) => sum + v.qty * v.unitPrice, 0);
  const stages = [
    "Input event",
    "Store action",
    "Draft value",
    "Subscribers render",
  ];
  function edit(id: string, field: "qty" | "color", value: string) {
    const previous = variants.find((v) => v.id === id)!;
    if (field === "qty")
      store.getState().updateVariantField("p1", id, "qty", Number(value) || 0);
    else store.getState().updateVariantAttribute("p1", id, "color", value);
    setTrace(
      `${field === "qty" ? "updateVariantField" : "updateVariantAttribute"}("p1", "${id}", "${field}", ${JSON.stringify(field === "qty" ? Number(value) || 0 : value)}) · ${field === "qty" ? previous.qty : previous.attributes.color} → ${value || 0}`,
    );
    setStep(0);
  }
  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/playground"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Playground
          </Link>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-semibold">
            <GitBranch className="size-6" /> Purchase data explorer
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Follow the relationships. Inspect the schema. Change a value and
            watch it travel.
          </p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs">
          Isolated sample · no purchase is saved
        </span>
      </header>
      <div className="flex flex-wrap gap-2" aria-label="Implementation mode">
        {[false, true].map((mode) => (
          <button
            key={String(mode)}
            className={`${button} ${proposed === mode ? "bg-primary text-primary-foreground" : "bg-card"}`}
            aria-pressed={proposed === mode}
            onClick={() => setProposed(mode)}
          >
            {mode ? "Proposed schema flow" : "Current project"}
          </button>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.4fr)]">
        <section className={panel} aria-label="Data relationships">
          <h2 className="font-semibold">01 / Relationships</h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">
            Select an object to inspect its contract.
          </p>
          {nodes.map((n, i) => (
            <div
              key={n.id}
              className={i > 0 ? "ml-5 border-l border-border pl-4" : ""}
            >
              {i > 0 && (
                <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
                  <ArrowDown className="size-3" />
                  {n.id === "product"
                    ? "purchase contains products[]"
                    : n.id === "variant"
                      ? "product contains variants[]"
                      : n.id === "group"
                        ? "product groups variants by color"
                        : proposed
                          ? "image group contains images[]"
                          : "product contains images[]"}
                </div>
              )}
              <button
                onClick={() => setSelected(n.id)}
                aria-pressed={selected === n.id}
                className={`${button} w-full text-left ${selected === n.id ? "border-primary bg-primary text-primary-foreground" : ""}`}
              >
                <span className="block font-medium">{n.label}</span>
                <span className="text-xs opacity-75">
                  {n.id === "group" && !proposed
                    ? "Helper exists · not connected to draft"
                    : n.id === "purchase" && !proposed
                      ? "Inferred from purchaseDraftSchema"
                      : proposed && n.id !== "variant"
                        ? "Proposed contract"
                        : "Existing schema"}
                </span>
              </button>
            </div>
          ))}
        </section>
        <section className={panel} aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">02 / {node.label}</h2>
            <span className="text-xs text-muted-foreground">
              {proposed ? "Proposed composition" : "Current implementation"}
            </span>
          </div>
          <p className="mt-2 text-sm">{node.description}</p>
          <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
            {selected === "image" && proposed
              ? "draft.products[0].imageGroups[0].images[0]"
              : node.path}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">
                Data{" "}
                {selected === "image"
                  ? "· illustrative record"
                  : "· live sample"}
              </h3>
              <Code value={values[selected]} />
            </div>
            <div>
              <h3 className="text-sm font-medium">
                Schema rules · generated from Zod
              </h3>
              <Code
                value={
                  schema
                    ? z.toJSONSchema(schema)
                    : selected === "purchase"
                      ? "No purchase draft Zod schema is connected.\nPurchaseDraft is defined manually in the store."
                      : "ImageGroup is inferred from the master purchase schema."
                }
              />
            </div>
          </div>
          <div
            className={`mt-4 rounded-lg p-3 text-sm ${result && !result.success ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
          >
            {!result ? (
              "No schema to run for this object in current mode."
            ) : result.success ? (
              "safeParse passed · the sample matches this schema."
            ) : (
              <>
                <strong>safeParse failed</strong>
                <ul className="mt-2 list-inside list-disc">
                  {result.error.issues.map((issue, i) => (
                    <li key={i}>
                      {issue.path.join(".")}: {issue.message}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <p className="mt-3 text-sm">
            <strong>Schema → Type → Data:</strong>{" "}
            <code>z.infer&lt;typeof schema&gt;</code> derives the TypeScript
            type; <code>schema.safeParse(data)</code> checks an actual value.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            This explorer calls safeParse explicitly. Declaring a schema or
            inferring a type does not validate store updates automatically.
          </p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">
              View current source file
            </summary>
            <p className="mt-2 break-all text-xs text-muted-foreground">
              {sources[selected].file}
            </p>
            <Code value={sources[selected].code} />
          </details>
        </section>
      </div>
      <section className={panel}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">03 / Live flow</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Uses an isolated instance of your actual purchase draft store. Try
              a negative quantity.
            </p>
          </div>
          <button
            className={button}
            onClick={() => {
              store.setState({ draft: makeStore().getState().draft });
              setImageAdded(false);
              setStep(0);
              setTrace("Sample restored.");
            }}
          >
            <RotateCcw className="mr-2 inline size-4" />
            Reset sample
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {variants.map((v) => (
            <div key={v.id} className="space-y-3 rounded-lg bg-muted/40 p-4">
              <div className="text-sm font-medium">
                {v.id} · Size {v.attributes.size}
              </div>
              <label className="block text-sm">
                Color
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background p-2"
                  value={v.attributes.color}
                  onChange={(e) => edit(v.id, "color", e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Quantity
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background p-2"
                  type="number"
                  step="1"
                  value={v.qty}
                  onChange={(e) => edit(v.id, "qty", e.target.value)}
                />
              </label>
              <p className="text-sm">
                {v.qty} × {v.unitPrice} = <strong>{v.qty * v.unitPrice}</strong>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-2">
              <button
                className={`${button} ${step === i ? "bg-primary text-primary-foreground" : ""}`}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                {i + 1}. {stage}
              </button>
              {i < 3 && <ArrowRight className="size-4" />}
            </div>
          ))}
        </div>
        <div
          className="mt-3 break-words rounded-lg bg-muted/50 p-4 text-sm"
          aria-live="polite"
        >
          {step === 0
            ? "Variants.tsx converts the input and calls a store action."
            : step === 1
              ? trace
              : step === 2
                ? `The store now holds quantities: ${variants.map((v) => `${v.id}=${v.qty}`).join(", ")}. No Zod parser runs inside that action.`
                : `The explorer subscriber recomputes total: ${total}. ${proposed ? "Proposed purchase summary would subscribe to the same draft." : "The actual NewPurchaseView currently passes sample products to PurchaseDraftSummary."}`}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">
            Live sample total: <strong>{total}</strong> · Unique color groups:{" "}
            <strong>{groups.length}</strong>
          </p>
          <button
            className={button}
            disabled={!proposed}
            onClick={() => setImageAdded(!imageAdded)}
          >
            {imageAdded
              ? "Remove sample image"
              : "Attach sample image to first group"}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Groups are computed with your getImageGroups helper. Image attachment
          is a proposed local simulation; it does not upload a file. Current
          ProductList renders Images without group props.
        </p>
      </section>
    </div>
  );
}

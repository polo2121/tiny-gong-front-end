import React from "react";
import Link from "next/link";
import ProductVariantImageApp from "./_components/ProductVariantImageApp";

const playgroundPage = () => {
  return (
    <div>
      <Link href="/playground/code-visualizer" className="inline-block rounded-lg bg-slate-900 px-4 py-2 m-4 text-white">Open code visualizer →</Link>
      <Link href="/playground/data-flow" className="inline-block rounded-lg border px-4 py-2 m-4">Open purchase data explorer →</Link>
      <ProductVariantImageApp />
    </div>
  );
};

export default playgroundPage;

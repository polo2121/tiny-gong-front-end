import {
  CompactProductCard,
  sampleCompactProduct,
} from "./CompactProductCard";

export default function ProductPreviewPage() {
  return (
    <div className="mx-auto w-full max-w-5xl py-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Product preview</h1>
        <p className="mt-1 text-sm text-muted-foreground">A read-only preview with sample product data.</p>
      </div>
      <CompactProductCard product={sampleCompactProduct} />
    </div>
  );
}

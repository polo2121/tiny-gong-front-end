import Image from "next/image";

import { formatCurrency } from "@/lib/currency";

type CompactVariant = {
  id: string;
  size: string;
  qty: number;
  unitPrice: number;
};

type CompactImageGroup = {
  label: string;
  imageUrl: string;
  variants: CompactVariant[];
};

export type CompactProduct = {
  name: string;
  category: string;
  subcategory: string;
  imageGroups: CompactImageGroup[];
};

export const sampleCompactProduct: CompactProduct = {
  name: "Everyday Cotton Tee",
  category: "Clothing",
  subcategory: "T-Shirts",
  imageGroups: [
    {
      label: "White",
      imageUrl: "/images/product-preview/white-tee.jpg",
      variants: [
        { id: "white-s", size: "S", qty: 8, unitPrice: 12500 },
        { id: "white-m", size: "M", qty: 12, unitPrice: 12500 },
        { id: "white-l", size: "L", qty: 6, unitPrice: 12500 },
      ],
    },
    {
      label: "Black",
      imageUrl: "/images/product-preview/black-tee.jpg",
      variants: [
        { id: "black-s", size: "S", qty: 6, unitPrice: 12500 },
        { id: "black-m", size: "M", qty: 10, unitPrice: 12500 },
        { id: "black-l", size: "L", qty: 8, unitPrice: 12500 },
      ],
    },
  ],
};

export function CompactProductCard({ product }: { product: CompactProduct }) {
  const variants = product.imageGroups.flatMap((group) => group.variants);
  const totalQty = variants.reduce((total, variant) => total + variant.qty, 0);
  const grandTotal = variants.reduce(
    (total, variant) => total + variant.qty * variant.unitPrice,
    0,
  );

  return (
    <article className="w-full max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <h2 className="min-w-0 truncate text-base font-semibold text-slate-800">
          {product.name}
        </h2>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {product.category}
          </span>
          <span className="rounded-full bg-highlight/10 px-2.5 py-1 text-[11px] font-medium text-highlight">
            {product.subcategory}
          </span>
        </div>
      </header>

      <div className="max-w-full overflow-hidden px-4 py-3">
        <table className="w-full table-auto border-collapse text-xs">
          <caption className="sr-only">
            Variant and image preview for {product.name}
          </caption>
          <thead>
            <tr className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
              <th className="w-px px-2 py-1.5 text-left font-medium">Image</th>
              <th className="px-2 py-1.5 text-left font-medium">Color</th>
              <th className="px-2 py-1.5 text-left font-medium">Size</th>
              <th className="w-px whitespace-nowrap px-2 py-1.5 text-right font-medium">
                Qty
              </th>
              <th className="w-px whitespace-nowrap px-2 py-1.5 text-right font-medium">
                Unit price
              </th>
              <th className="w-px whitespace-nowrap px-2 py-1.5 text-right font-medium">
                Subtotal
              </th>
            </tr>
          </thead>

          {product.imageGroups.map((group) => (
            <tbody
              key={group.label}
              className="border-t border-slate-100 first:border-t-0"
            >
              {group.variants.map((variant, index) => (
                <tr key={variant.id} className="border-t border-slate-100 first:border-t-0">
                  {index === 0 && (
                    <td
                      rowSpan={group.variants.length}
                      className="w-px px-2 py-1.5 align-middle"
                    >
                      <Image
                        src={group.imageUrl}
                        alt={`${product.name} in ${group.label.toLowerCase()}`}
                        width={40}
                        height={48}
                        className="h-12 w-10 rounded-md bg-slate-100 object-cover"
                      />
                    </td>
                  )}
                  <td className="max-w-32 truncate px-2 py-1.5 text-slate-600">
                    {group.label}
                  </td>
                  <th scope="row" className="px-2 py-1.5 text-left font-medium text-slate-700">
                    {variant.size}
                  </th>
                  <td className="px-2 py-1.5 text-right tabular-nums text-slate-600">
                    {variant.qty}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5 text-right tabular-nums text-slate-500">
                    {formatCurrency(variant.unitPrice)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1.5 text-right font-semibold tabular-nums text-slate-700">
                    {formatCurrency(variant.qty * variant.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <dl className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/60 sm:grid-cols-4">
        <SummaryItem label="Variants" value={variants.length} />
        <SummaryItem label="Total qty" value={totalQty} />
        <SummaryItem label="Images" value={product.imageGroups.length} />
        <SummaryItem label="Grand total" value={`${formatCurrency(grandTotal)} MMK`} />
      </dl>
    </article>
  );
}

function SummaryItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-r border-slate-100 px-3 py-2 last:border-r-0">
      <dt className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="truncate text-xs font-semibold tabular-nums text-slate-700">
        {value}
      </dd>
    </div>
  );
}

import Image from "next/image";
import { formatCurrency } from "@/lib/currency";

type PreviewVariant = {
  id: string;
  size: string;
  quantity: number;
  unitPrice: number;
};

type PreviewProduct = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  groups: {
    color: string;
    photo: string;
    variants: PreviewVariant[];
  }[];
};

export const sampleProduct: PreviewProduct = {
  id: "PRD-00124",
  name: "Everyday Cotton Tee",
  category: "Clothing",
  subcategory: "T-Shirts",
  groups: [
    {
      color: "White",
      photo: "/images/product-preview/white-tee.jpg",
      variants: [
        { id: "W-S", size: "S", quantity: 8, unitPrice: 12500 },
        { id: "W-M", size: "M", quantity: 12, unitPrice: 12500 },
        { id: "W-L", size: "L", quantity: 6, unitPrice: 12500 },
      ],
    },
    {
      color: "Black",
      photo: "/images/product-preview/black-tee.jpg",
      variants: [
        { id: "B-S", size: "S", quantity: 6, unitPrice: 12500 },
        { id: "B-M", size: "M", quantity: 10, unitPrice: 12500 },
        { id: "B-L", size: "L", quantity: 8, unitPrice: 12500 },
      ],
    },
  ],
};

export function ProductPreview({
  product = sampleProduct,
}: {
  product?: PreviewProduct;
}) {
  const variants = product.groups.flatMap((group) => group.variants);
  const quantity = variants.reduce((sum, variant) => sum + variant.quantity, 0);
  const total = variants.reduce(
    (sum, variant) => sum + variant.quantity * variant.unitPrice,
    0,
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-700">
      <header className="flex flex-wrap items-start justify-between gap-6 px-6 py-7 sm:px-8">
        <div>
          <p className="mb-2 text-xs font-medium tracking-wider text-slate-400">
            {product.id}
          </p>
          <h2 className="font-margarine text-2xl text-slate-900">
            {product.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {product.category} <span className="mx-2 text-slate-300">/</span>{" "}
            {product.subcategory}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {variants.length} variants
        </span>
      </header>

      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 sm:px-8">
        <h3 className="text-sm font-semibold text-slate-800">Variants</h3>
        <p className="text-xs text-slate-400">All amounts in MMK</p>
      </div>
      <div
        className="overflow-x-auto"
        role="region"
        aria-label="Product variants"
        tabIndex={0}
      >
        <table className="w-full min-w-160 border-collapse text-left">
          <caption className="sr-only">
            {product.name}: photos, colors, sizes, quantities, unit prices and
            subtotals
          </caption>
          <thead className="border-y border-slate-100 bg-slate-50/80 text-xs text-slate-500">
            <tr>
              <th
                scope="col"
                className="w-36 py-3 pl-6 pr-4 font-medium sm:pl-8"
              >
                Photo
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Color
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Size
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Qty
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Unit price
              </th>
              <th
                scope="col"
                className="py-3 pl-4 pr-6 text-right font-medium sm:pr-8"
              >
                Subtotal
              </th>
            </tr>
          </thead>
          {product.groups.map((group) => (
            <tbody
              key={group.color}
              className="border-b border-slate-200/70 last:border-b-0"
            >
              {group.variants.map((variant, index) => (
                <tr
                  key={variant.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  {index === 0 && (
                    <td
                      rowSpan={group.variants.length}
                      className="py-4 pl-6 pr-4 align-middle sm:pl-8"
                    >
                      <Image
                        src={group.photo}
                        alt={`${product.name} in ${group.color.toLowerCase()}`}
                        width={96}
                        height={116}
                        className="h-29 w-24 rounded-lg bg-slate-100 object-cover"
                      />
                    </td>
                  )}
                  <td className="px-4 py-4 text-base">{group.color}</td>
                  <th scope="row" className="px-4 py-4 text-base font-normal">
                    {variant.size}
                  </th>
                  <td className="px-4 py-4 text-right text-base tabular-nums">
                    {variant.quantity}
                  </td>
                  <td className="px-4 py-4 text-right text-base tabular-nums text-slate-500">
                    {formatCurrency(variant.unitPrice)}
                  </td>
                  <td className="py-4 pl-4 pr-6 text-right text-base font-medium tabular-nums text-slate-800 sm:pr-8">
                    {formatCurrency(variant.quantity * variant.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <footer className="border-t border-slate-200 bg-slate-50/60 px-6 py-6 sm:px-8">
        <dl className="grid grid-cols-2 items-end gap-6 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <div>
            <dt className="text-xs text-slate-500">Total variants</dt>
            <dd className="mt-1.5 text-lg font-semibold tabular-nums">
              {variants.length}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Total quantity</dt>
            <dd className="mt-1.5 text-lg font-semibold tabular-nums">
              {quantity}{" "}
              <span className="text-xs font-normal text-slate-400">pcs</span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Photo groups</dt>
            <dd className="mt-1.5 text-lg font-semibold tabular-nums">
              {product.groups.length}
            </dd>
          </div>
          <div className="text-right">
            <dt className="text-xs text-slate-500">Grand total</dt>
            <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-slate-900">
              {formatCurrency(total)}{" "}
              <span className="text-xs font-normal text-slate-500">MMK</span>
            </dd>
          </div>
        </dl>
      </footer>
    </article>
  );
}

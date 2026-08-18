import DualText from "@/components/DualText";
import { ShoppingBasketIcon } from "@/components/icons/ShoppingBasketIcon";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import type { PurchaseRecord } from "../../_types/purchase";
import Link from "next/link";

type ProductListProps = {
  purchase: PurchaseRecord;
};

export function ProductList({ purchase }: ProductListProps) {
  const hasProducts = purchase.registeredProducts.length > 0;

  return (
    <section className="flex flex-2 flex-col gap-4 rounded-2xl">
      <header className="flex items-start justify-between gap-4">
        <DualText label="Product List" subLabel="ကုန်ပစ္စည်းစာရင်း" />
      </header>

      {hasProducts ? (
        purchase.registeredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <Empty className="items-stretch justify-end gap-0 rounded-2xl border border-slate-100 bg-card-surface p-4 shadow-card">
          <EmptyContent className="h-full max-w-none rounded-xl bg-white/80 px-4 py-8 shadow-card">
            <div className="flex max-w-sm flex-col m-auto gap-4">
              <EmptyHeader className="gap-3">
                <EmptyMedia className="size-10 rounded-full bg-highlight/10 text-highlight">
                  <ShoppingBasketIcon className="size-6" />
                </EmptyMedia>

                <EmptyTitle className="flex flex-col items-center gap-1 leading-tight">
                  <span>No Products Registered</span>
                  <span className="font-umoe text-base text-muted-foreground">
                    (ကုန်ပစ္စည်းမထည့်ရသေးပါ)
                  </span>
                </EmptyTitle>
              </EmptyHeader>

              <EmptyDescription>
                Start adding products and variants for this purchase when you
                are ready.
              </EmptyDescription>

              <div className="flex flex-col gap-2">
                <Button className="" size="lg">
                  Create Product Now
                </Button>

                <Link href="/purchase">
                  <Button variant="ghost" size="fit">
                    Go Back
                  </Button>
                </Link>
              </div>
            </div>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
}

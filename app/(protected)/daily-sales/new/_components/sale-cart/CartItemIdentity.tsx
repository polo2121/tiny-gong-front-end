import ImagePreview from "@/components/ImagePreview";

import type { CartItem } from "../../_data";
import { CategoryBadge } from "../category-badge";

export function CartItemIdentity({ item }: { item: CartItem }) {
  return (
    <div className="flex gap-4 bg-amber-100">
      <ImagePreview src="" alt="s" />

      <div className="flex min-w-0 flex-col items-start gap-1 ">
        <CategoryBadge category={item.category} />
        <h3 className="font-semibold text-base line-clamp-1">{item.name}</h3>
        {item.variant && (
          <p className="truncate text-highlight-soft text-xs font-semibold">
            {item.variant.label}
          </p>
        )}
        <p className="text-xs opacity-55">{item.sku}</p>
      </div>
    </div>
  );
}

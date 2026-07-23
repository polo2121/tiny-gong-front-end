import { cn } from "@/lib/utils";

import type { ProductCategory } from "../_data";

type CategoryBadgeProps = {
  category: ProductCategory;
  className?: string;
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full bg-gray-100 px-2 py-0.5 font-chewy text-[11px] capitalize tracking-wide text-gray-500",
        className,
      )}
    >
      {category}
    </span>
  );
}

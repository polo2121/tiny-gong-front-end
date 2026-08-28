import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  category: string;
  className?: string;
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full bg-gray-100 px-2 py-0.5 font-chewy text-xs capitalize tracking-wide text-gray-500 shadow-2xs",
        className,
      )}
    >
      {category}
    </span>
  );
}

import Image from "next/image";
import type { ComponentProps } from "react";

type SearchEmptyIllustrationProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "width" | "height" | "alt"
> & {
  alt?: string;
};

export function SearchEmptyIllustration({
  alt = "No table search results found",
  ...props
}: SearchEmptyIllustrationProps) {
  return (
    <Image
      src="/search-empty.svg"
      width={259}
      height={152}
      alt={alt}
      loading="eager"
      {...props}
    />
  );
}

import Image from "next/image";
import type { ComponentProps } from "react";

type NoMatchFoundBearIllustrationProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "width" | "height" | "alt"
> & {
  alt?: string;
};

export function NoMatchFoundBearIllustration({
  alt = "No matching result found",
  ...props
}: NoMatchFoundBearIllustrationProps) {
  return (
    <Image
      src="/no-match-found-bear.svg"
      width={78}
      height={99}
      alt={alt}
      {...props}
    />
  );
}

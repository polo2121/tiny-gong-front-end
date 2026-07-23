"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ImagePreviewProps = Omit<
  ImageProps,
  "src" | "alt" | "fill" | "width" | "height"
> & {
  src?: ImageProps["src"] | null;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  imageClassName?: string;
};

export default function ImagePreview({
  src,
  alt,
  fallbackLabel = "No Image",
  className,
  imageClassName,
  sizes = "96px",
  onError,
  ...props
}: ImagePreviewProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const shouldShowFallback = !src || hasError;

  return (
    <div
      className={cn(
        "relative flex aspect-square min-h-16 min-w-16 rounded-sm bg-gray-200 text-gray-700",
        className,
      )}
    >
      {shouldShowFallback ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1  text-center">
          <ImageIcon className="size-4 opacity-70" aria-hidden="true" />
          <span className="line-clamp-2 text-[10px] font-semibold opacity-70">
            {fallbackLabel}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
          onError={(event) => {
            setHasError(true);
            onError?.(event);
          }}
          {...props}
        />
      )}
    </div>
  );
}

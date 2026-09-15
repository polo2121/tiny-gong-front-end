"use client";

import { ChangeEvent, useMemo, useState } from "react";

import DualText from "@/components/DualText";
import { ImageUploadIcon } from "@/components/icons/ImageUploadIcon";

import type {
  ImageGroup,
  ProductImage,
  VariantDraft,
} from "../../schema/new-purchase-schema";

const MAX_IMAGE_SIZE = 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

type ImagesProps = {
  variants: VariantDraft[];
  imagesGroupByAttributes: string[];
  imageGroups?: ImageGroup[];
};

type ImageUploadCardProps = {
  groupKey: string;
  group: Record<string, string>;
  selectedFile: File | null;
  image: ProductImage | null;
  onChange: (groupKey: string, event: ChangeEvent<HTMLInputElement>) => void;
};

// -----------------------------------------------------------------------------
// Grouping
// -----------------------------------------------------------------------------

export function getImageGroups(
  variants: VariantDraft[],
  imagesGroupByAttributes: string[],
): ImageGroup[] {
  const groups = new Map<string, ImageGroup>();

  for (const variant of variants) {
    const group = Object.fromEntries(
      imagesGroupByAttributes.map((attribute) => [
        attribute,
        variant.attributes?.[attribute] ?? "",
      ]),
    );

    const key = JSON.stringify(group);
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.variantIds.push(variant.id);
      continue;
    }

    groups.set(key, {
      group,
      variantIds: [variant.id],
      image: null,
    });
  }

  return Array.from(groups.values());
}

// -----------------------------------------------------------------------------
// Images
// -----------------------------------------------------------------------------

export function Images({
  variants = [],
  imagesGroupByAttributes = [],
}: ImagesProps) {
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({});

  function handleImageChange(
    groupKey: string,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) return;

    if (!isAllowedImageType(file.type)) {
      alert("Choose a JPG, PNG or WEBP image.");
      input.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image must be 1MB or smaller.");
      input.value = "";
      return;
    }

    setSelectedFiles((current) => ({
      ...current,
      [groupKey]: file,
    }));

    console.log(selectedFiles);
  }

  const groups = getImageGroups(variants, imagesGroupByAttributes);

  if (groups.length === 0) {
    return (
      <section className="flex flex-col gap-3 rounded-xl pb-6">
        <ImagesHeader />
        <ImagesEmptyState />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3 rounded-xl pb-6">
      <ImagesHeader />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((imageGroup) => {
          const groupKey = JSON.stringify(imageGroup.group);

          return (
            <ImageUploadCard
              key={groupKey}
              groupKey={groupKey}
              group={imageGroup.group}
              image={imageGroup.image}
              selectedFile={selectedFiles[groupKey] ?? null}
              onChange={handleImageChange}
            />
          );
        })}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// UI
// -----------------------------------------------------------------------------

function ImagesHeader() {
  return (
    <div className="flex items-end justify-between gap-4">
      <DualText
        label="Product Images"
        subLabel="ကုန်ပစ္စည်းပုံများ"
        size="sm"
      />
    </div>
  );
}

function ImagesEmptyState() {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-8 text-center">
      <ImageUploadIcon className="h-auto w-28" aria-hidden="true" />

      <div className="flex max-w-xs flex-col gap-1">
        <h3 className="font-margarine text-base text-slate-600">
          No image groups yet
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Image groups will appear when product variants are added.
        </p>
      </div>
    </div>
  );
}

function ImageUploadCard({
  groupKey,
  group,
  selectedFile,
  image,
  onChange,
}: ImageUploadCardProps) {
  const groupLabel = Object.entries(group)
    .map(([attribute, value]) => `${value}`)
    .join(" · ");

  return (
    <article className="flex flex-col gap-2 rounded-md border border-dashed border-slate-300 p-2">
      <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-sm bg-slate-50 px-3 text-center">
        <ImageUploadIcon className="mb-2 h-auto w-24" />

        <span className="font-margarine text-xs text-muted-foreground">
          Click here to upload
        </span>

        <span className="text-[11px] font-medium text-muted-foreground">
          JPG, PNG or WEBP · Max 1MB
        </span>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(event) => onChange(groupKey, event)}
        />
      </label>

      {(selectedFile || image) && (
        <p
          className="break-all px-2 text-xs text-muted-foreground"
          aria-live="polite"
        >
          {selectedFile?.name ?? image?.fileName}
        </p>
      )}

      <div className="flex items-center justify-between gap-2 rounded-md px-2 py-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Group
        </span>

        <span className="truncate text-sm font-semibold text-highlight capitalize">
          {groupLabel}
        </span>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function isAllowedImageType(type: string): type is AllowedImageType {
  return ALLOWED_IMAGE_TYPES.includes(type as AllowedImageType);
}

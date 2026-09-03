import { ImagePlus } from "lucide-react";

import DualText from "@/components/DualText";

export function getImageGroups(variants: any[], imageGroupBy: any[]) {
  const groupMap = new Map();

  variants.forEach((variant: any) => {
    const group = Object.fromEntries(
      imageGroupBy.map((attribute: string) => [
        attribute,
        variant.attributes?.[attribute] ?? "",
      ]),
    );
    const key = JSON.stringify(group);

    if (!groupMap.has(key)) {
      groupMap.set(key, { key, group });
    }
  });

  return Array.from(groupMap.values());
}

export function ProductImagesSection({
  images,
  imageGroups,
  onImageChange,
}: any) {
  return (
    <section className="flex flex-col gap-3 rounded-xl p-3">
      <div className="flex items-end justify-between gap-4">
        <DualText
          label="Product Images"
          subLabel="ကုန်ပစ္စည်းပုံများ"
          size="sm"
        />
        <p className="font-margarine text-sm text-highlight-soft">
          Images: {String(imageGroups.length).padStart(2, "0")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {imageGroups.map((imageGroup: any) => {
          const fileName = images?.find(
            (image: any) => image.groupKey === imageGroup.key,
          )?.fileName;

          return (
            <article
              key={imageGroup.key}
              className="flex h-56 flex-col overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50"
            >
              <label className="flex flex-[4] cursor-pointer flex-col items-center justify-center gap-2 bg-white text-center text-sm font-bold text-muted-foreground transition-all hover:bg-highlight/10 hover:text-hightlight">
                <ImagePlus className="size-7" />
                <span>{fileName ?? "Upload image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    onImageChange(
                      imageGroup.key,
                      event.target.files?.[0]?.name ?? "",
                    )
                  }
                />
              </label>

              <div className="flex flex-1 flex-col justify-center gap-2 p-3">
                {Object.entries(imageGroup.group).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-card"
                  >
                    <span className="capitalize text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-highlight-soft">
                      {String(value || "-")}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

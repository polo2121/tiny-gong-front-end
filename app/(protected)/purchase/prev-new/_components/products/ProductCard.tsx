"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import { subcategories } from "@/lib/categories/data";
import { cn } from "@/lib/utils";

import { Summary } from "./Summary";
import { getImageGroups, Images } from "./Images";
import { Identity } from "./Identity";
import { Variants } from "./Variants";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductCard({ product }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-dashed border-slate-200 bg-white p-4 shadow-card">
      {/* <header className="flex items-start justify-between gap-4">
        <DualText
          label="Product Identity"
          subLabel="ကုန်ပစ္စည်းအချက်အလက်"
          size="sm"
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="fit"
            showIcon={false}
            onClick={() => setIsOpen((currentValue) => !currentValue)}
          >
            {isOpen ? "Hide" : "Show"}
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </Button>

          <Button
            type="button"
            variant="ghost"
            tone="destructive"
            size="fit"
            showIcon={false}
          >
            Remove
          </Button>
        </div>
      </header> */}

      {/* <Accordion defaultValue={["product-1"]}>
        <AccordionItem value="product-1">
          <div className="flex items-start justify-between gap-4">
            <Identity product={product} />

            <AccordionTrigger />
          </div>

          <AccordionContent>
            <Variants />
            <Images />
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}

      {/* <section
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Variants />
        </div>

        <Images />
      </section> */}
    </article>
  );
}

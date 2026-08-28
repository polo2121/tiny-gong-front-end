"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={className}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive.Positioner>,
    "side" | "align" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "w-72 rounded-2xl bg-white p-4 text-foreground shadow-card outline-none border border-slate-300/20",
            "transition-[opacity,scale,translate] duration-200 ease-out",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={className}
      {...props}
    />
  );
}

export { Popover, PopoverClose, PopoverContent, PopoverTrigger };

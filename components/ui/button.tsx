import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TwoSparklesIcon } from "../icons/TwoSparklesIcon";

const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-all outline-none select-none hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-chewy cursor-pointer tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-card hover:bg-highlight-soft active:bg-highlight",
        outline:
          "border border-hightlight text-hightlight hover:border-hightlight hover:bg-highlight/10 hover:text-highlight-soft",
        "outline-dashed": "border border-dashed border-hightlight",
        secondary: "bg-pink-50 text-pink-700 shadow-card hover:bg-pink-100",
        ghost: "text-hightlight hover:bg-highlight/10 hover:text-hightlight",
        destructive:
          "bg-red-700 text-white shadow-card hover:bg-red-800 active:bg-red-900",
        link: "h-auto rounded-none px-0 text-hightlight underline-offset-4 hover:underline",
        custom: "",
      },
      tone: {
        default: "",
        destructive:
          "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive",
      },
      size: {
        default: "h-10 min-w-36 px-4 py-2",
        sm: "h-8 min-w-18 px-3 text-xs",
        lg: "h-11 min-w-32 px-6 text-base",
        icon: "size-10",
        fit: "min-w-0 px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      tone: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  tone,
  size,
  type = "button",
  children,
  showIcon = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    showIcon?: boolean;
  }) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant, tone, size, className }))}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2 relative">
        {children}
        {showIcon && (
          <TwoSparklesIcon className="absolute -top-1 -right-4 size-4 rotate-90" />
        )}
      </span>
    </button>
  );
}
export { Button, buttonVariants };

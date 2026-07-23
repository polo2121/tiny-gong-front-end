import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";

import { cn } from "@/lib/utils";

function Field({
  className,
  validationMode = "onBlur",
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Root>) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      validationMode={validationMode}
      className={cn(
        "group/field flex min-w-0 flex-col gap-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

type FieldLabelProps = React.ComponentProps<typeof FieldPrimitive.Label> & {
  subLabel?: React.ReactNode;
};

function FieldLabel({
  className,
  children,
  subLabel,
  ...props
}: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        "flex flex-col gap-0.5 text-sm font-margarine",
        "group-data-[invalid]/field:text-red-700",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {subLabel ? (
        <span className="text-xs font-medium opacity-60">{subLabel}</span>
      ) : null}
    </FieldPrimitive.Label>
  );
}

function FieldControl({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Control>) {
  return (
    <FieldPrimitive.Control
      data-slot="field-control"
      className={cn(
        "h-12 w-full min-w-0 rounded-xl bg-slate-100 px-6 py-1 text-xl font-medium shadow-card-two outline-none transition-colors",
        "placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
        "data-[invalid]:ring-2 data-[invalid]:ring-pink-700/30",
        "md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("text-xs font-medium opacity-60", className)}
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Error>) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn("text-xs font-semibold text-red-700", className)}
      {...props}
    />
  );
}

export { Field, FieldControl, FieldLabel, FieldDescription, FieldError };

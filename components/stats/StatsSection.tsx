"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type { DashboardPeriod } from "./types";

type StatsSectionProps = {
  children: ReactNode;
  controls?: ReactNode;
  className?: string;
};

export function StatsSection({
  children,
  controls,
  className,
}: StatsSectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      {controls && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {controls}
        </div>
      )}

      <hr className="opacity-10" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const routeLabels: Record<string, string> = {
  "daily-sales": "Daily Sales",
  new: "New Sale",
  inventory: "Inventory",
  products: "Products",
  expenses: "Expenses",
  profits: "Profits",
  invoices: "Invoices",
};

function formatSegment(segment: string) {
  return (
    routeLabels[segment] ??
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm font-semibold">
        <li>
          <Link
            href="/"
            className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-pink-50 hover:text-pink-700"
            aria-label="Home"
          >
            <Home className="size-4" />
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isCurrent = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center underline">
              <ChevronRight className="size-4 text-slate-400" />
              {isCurrent ? (
                <span className="rounded-lg px-2 py-1 text-slate-400">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="rounded-lg px-2 py-1 transition hover:bg-pink-50 hover:text-pink-700"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

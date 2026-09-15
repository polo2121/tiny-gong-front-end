"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BoxesIcon,
  ChartBarIncreasingIcon,
  FileTextIcon,
  Home01Icon,
  PackageSearch01Icon,
  ReceiptIcon,
  WalletDone02Icon,
} from "@hugeicons/core-free-icons";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";
import { TwoSparklesIcon } from "./icons/TwoSparklesIcon";

const navItems = [
  {
    title: "Daily Sales",
    subtitle: "နေ့စဉ်အရောင်းစာရင်း",
    href: "/daily-sales",
    icon: ChartBarIncreasingIcon,
  },
  {
    title: "Inventory",
    subtitle: "ပစ္စည်း စီမံခန့်ခွဲ",
    href: "/inventory",
    icon: BoxesIcon,
  },
  {
    title: "Products",
    subtitle: "ပစ္စည်းလက်ကျန်",
    href: "/products",
    icon: PackageSearch01Icon,
  },
  {
    title: "Expenses",
    subtitle: "အသုံးစရိတ်",
    href: "/expenses",
    icon: ReceiptIcon,
  },
  {
    title: "Profits",
    subtitle: "အမြတ်အစွန်း",
    href: "/profits",
    icon: WalletDone02Icon,
  },
  {
    title: "Invoices",
    subtitle: "ဘောင်ချာစရင်းများ",
    href: "/invoices",
    icon: FileTextIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-card backdrop-blur lg:hidden">
        <Link href="/" className="mb-3 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-pink-100 text-pink-700">
            <HugeiconsIcon
              icon={Home01Icon}
              className="size-5"
              color="currentColor"
              strokeWidth={2.2}
            />
          </span>
          <span className="font-chewy text-2xl">Tiny Gong</span>
        </Link>

        <nav className="flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.title}
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg transition",
                  "hover:bg-highlight/10 hover:text-hightlight",
                  isActive && "bg-highlight/15 text-hightlight shadow-card",
                )}
              >
                <HugeiconsIcon
                  icon={Icon}
                  className="size-5"
                  color="currentColor"
                  strokeWidth={2.2}
                />
              </Link>
            );
          })}
        </nav>
      </header>

      <aside className="sticky top-0 hidden h-screen w-16 shrink-0 bg-teal-50/30 px-2 py-6 backdrop-blur transition-[width] duration-200 ease-out lg:flex lg:flex-col 2xl:w-44 2xl:px-3">
        <Link
          href="/"
          className="mb-8 flex justify-center items-center rounded-lg transition bg-gray-50"
          aria-label="Tiny Gong home"
        >
          <BrandLogo className="size-12 2xl:size-30" />
        </Link>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                aria-label={item.title}
                className={cn(
                  "group relative flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-semibold text-slate-700 transition ease-in 2xl:justify-start",
                  "hover:bg-pink-50 hover:text-pink-700 hover:scale-105",
                  isActive && "bg-card-surface text-foreground shadow-card",
                )}
              >
                {isActive && (
                  <TwoSparklesIcon className="absolute top-0 right-0 h-6 w-6 text-highlight-soft  group-hover:text-pink-700" />
                )}
                <HugeiconsIcon
                  icon={Icon}
                  className="size-5 shrink-0"
                  color="currentColor"
                  strokeWidth={2.2}
                />
                <span className="hidden min-w-0 flex-col leading-tight 2xl:flex">
                  <span className="truncate">{item.title}</span>
                  <span className="truncate font-umoe text-xs font-normal opacity-75">
                    ({item.subtitle})
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

import { BookOpen, Puzzle, Shirt, Sparkles } from "lucide-react";

import NavCard from "@/components/NavCard";
import { PlayfulCollectionsIcon } from "@/components/icons/PlayfulCollectionsIcon";
import { WobbleLineTeal } from "@/components/icons/WobbleLineTeal";
import { BrandLogo } from "@/components/ui/brand-logo";
import Image from "next/image";

const items = [
  {
    title: "Daily Sales",
    subtitle: "နေ့စဉ်အရောင်းစာရင်း",
    description:
      "Track daily selling activity, follow performance, and keep each transaction moving smoothly.",
    href: "/daily-sales",
    styles: "bg-yellow-50 text-yellow-700 hover:border-yellow-600",
    iconColor: "text-yellow-600",
  },
  {
    title: "Inventory",
    subtitle: "ပစ္စည်း စီမံခန့်ခွဲ",
    description:
      "Manage product details, organize variants, and keep your catalog clean and accurate.",
    href: "/inventory",
    styles: "bg-purple-50 text-purple-700 hover:border-purple-700",
    iconColor: "text-purple-700",
  },
  {
    title: "Products",
    subtitle: "ပစ္စည်းလက်ကျန်",
    description:
      "Monitor products' levels, spot low items early, and keep essentials ready for sale.",
    href: "/products",
    styles: "bg-teal-50 text-teal-700 hover:border-hightlight",
    iconColor: "text-hightlight",
  },
  {
    title: "Expenses",
    subtitle: "အသုံးစရိတ်",
    description:
      "Track expenses clearly, organize spending records, and keep business costs under control.",
    href: "/expenses",
    styles: "bg-pink-50 text-pink-700 hover:border-pink-700",
    iconColor: "text-pink-700",
  },
  {
    title: "Profits",
    subtitle: "အမြတ်အစွန်း",
    description: "View your profits and financial performance",
    href: "/profits",
    styles: "bg-green-50 text-green-700 hover:border-green-700",
    iconColor: "text-green-700",
  },
  {
    title: "Invoices",
    subtitle: "ဘောင်ချာစရင်းများ",
    description:
      "Create and manage invoices, track payment status, and send billing details to customers.",
    href: "/invoices",
    styles: "bg-blue-50 text-blue-700 hover:border-blue-700",
    iconColor: "text-blue-700",
  },
];

const logoStickers = [
  {
    label: "Clothes",
    className: "bg-pink-50 text-pink-700 rotate-[-4deg]",
    icon: Shirt,
  },
  {
    label: "Books",
    className: "bg-yellow-50 text-yellow-700 rotate-[3deg]",
    icon: BookOpen,
  },
  {
    label: "Toys",
    className: "bg-highlight/10 text-hightlight rotate-[-2deg]",
    icon: Puzzle,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-16">
      <header className="relative overflow-hidden bg-card-surface px-5">
        <section className="mx-auto max-w-5xl h-30 relative mt-4">
          <div className="absolute left-0 -bottom-4">
            <Image
              width={100}
              height={100}
              src="/toy-tag.svg"
              className="w-24 h-auto"
              alt="bear-icon"
            />
          </div>
          <div className="absolute right-0 -top-6">
            <Image
              width={100}
              height={100}
              src="/clothing-tag.svg"
              className="w-20 h-auto"
              alt="bear-icon"
            />
          </div>
          <div className="relative w-full flex flex-col items-center justify-center gap-5 sm:flex-row">
            <BrandLogo className="relative z-10 size-26 drop-shadow-sm -top-4" />
          </div>
          <div className="h-16 absolute -bottom-6  left-0 right-0 flex justify-center">
            <Image
              width={100}
              height={100}
              src="/white-bear-half.svg"
              className="w-auto h-auto"
              alt="bear-icon"
            />
          </div>
        </section>
      </header>

      <main className="mx-auto flex flex-col gap-10 w-full max-w-5xl px-4 mt-10">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <header className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-umoe text-sm md:text-2xl">(မင်္ဂလာပါ)</span>
              <span className="font-margarine text-base md:text-4xl">
                Hello, <span className="text-pink-600">Tinger!</span>
              </span>
            </div>

            <p className="text-sm md:text-lg font-medium">
              This is your new creative playground. Explore, invent, and share
              your biggest ideas with us.{" "}
              <strong className="text-pink-600">Tiny</strong> is so excited for
              all the fun we'll have!
            </p>
          </header>

          <div className="relative flex justify-end">
            <PlayfulCollectionsIcon className="absolute" />
          </div>
        </section>
        <section>
          <header>
            <h1 className="mb-6 text-2xl font-margarine">
              My Workspace
              <WobbleLineTeal className="relative left-8" />
            </h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <NavCard
                key={item.title}
                href={item.href}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                className={item.styles}
                iconColor={item.iconColor}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DualText from "./DualText";
import { TwoSparklesIcon } from "@/components/icons/TwoSparklesIcon";

export interface NavCardProps {
  title: string;
  href: string;
  description: string;
  subtitle: string;
  className?: string;
  iconColor: string;
  onClick?: () => void;
}

export default function NavCard({
  href,
  title,
  description,
  subtitle,
  className,
  iconColor,
}: NavCardProps) {
  return (
    <Link
      href={href}
      className="group block relative transition duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
    >
      <Card
        className={cn(
          "group/navcard  overflow-hidden border border-transparent bg-card z-2 rounded-2xl p-4 shadow-nav-card",
          className,
        )}
      >
        <div className="relative z-10 flex flex-col gap-4 py-4">
          <CardHeader className="flex items-start gap-3">
            <div className={cn("flex flex-col", className)}>
              <span className="font-umoe text-sm md:text-sm">({subtitle})</span>
              <span className="font-chewy text-base md:text-2xl">{title}</span>
            </div>
          </CardHeader>

          <CardContent className="font-medium line-clamp-2 text-foreground">
            {description}
          </CardContent>
        </div>
      </Card>
      <div className="absolute top-2 right-2 translate-0 -z-1 rounded-full backdrop-blur-sm group-hover:-translate-y-6 group-hover:translate-x-4 transition ease-in-out">
        <TwoSparklesIcon className={cn("h-6 w-6", iconColor)} />
      </div>
    </Link>
  );
}

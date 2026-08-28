"use client";

import type { ReactElement, ReactNode } from "react";

import DualText from "@/components/DualText";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type FormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subTitle?: string;
  trigger?: ReactElement;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
};

export function FormDrawer({
  open,
  onOpenChange,
  title,
  subTitle,
  trigger,
  children,
  className,
  headerClassName,
  bodyClassName,
}: FormDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger render={trigger} />}

      <DrawerContent
        className={cn(
          "m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[calc(100dvh-2rem)] px-8 py-4",
          className,
        )}
      >
        <DrawerHeader className={cn("items-start text-left", headerClassName)}>
          <DualText label={title} subLabel={subTitle ?? ""} />
        </DrawerHeader>

        <div className={cn("min-h-0 overflow-y-auto", bodyClassName)}>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ViewStyle = "card" | "table" | "statement";

type ViewStyleTabsProps = {
  value: ViewStyle;
  onValueChange: (value: ViewStyle) => void;
};

const views: { value: ViewStyle; label: string }[] = [
  { value: "card", label: "Card" },
  { value: "table", label: "Table" },
  { value: "statement", label: "Statement" },
];

export function ViewStyleTabs({ value, onValueChange }: ViewStyleTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as ViewStyle)}
      className="w-fit"
    >
      <TabsList className="grid-cols-3">
        {views.map((view) => (
          <TabsTrigger key={view.value} value={view.value} className="px-4">
            {view.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

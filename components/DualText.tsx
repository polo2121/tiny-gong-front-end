import { cn } from "@/lib/utils";

type DualTextSize = "xs" | "sm" | "md" | "lg";

interface DualTextProps {
  label: string;
  subLabel: string;
  size?: DualTextSize;
  className?: string;
}

const styles = {
  xs: {
    label: "text-xs md:text-sm",
    subLabel: "text-[10px] md:text-xs",
  },
  sm: {
    label: "text-sm md:text-base",
    subLabel: "text-xs md:text-sm",
  },
  md: {
    label: "text-base md:text-lg ",
    subLabel: "text-sm md:text-base",
  },
  lg: {
    label: "text-xl md:text-2xl lg:text-3xl",
    subLabel: "text-sm md:text-base lg:text-lg",
  },
} as const;

export default function DualText({
  label,
  subLabel,
  size = "md",
  className,
}: DualTextProps) {
  const typography = styles[size];

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "text-current opacity-80 font-margarine",
          typography.label,
        )}
      >
        {label}
      </span>

      {subLabel && (
        <span
          className={cn(
            "text-current opacity-60 font-umoe",
            typography.subLabel,
          )}
        >
          ({subLabel})
        </span>
      )}
    </div>
  );
}

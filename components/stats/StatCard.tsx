import InfoCard, { cardStyles, type InfoCardBaseProps } from "../InfoCard";
import { cn } from "@/lib/utils";

type StatCardProps = Omit<InfoCardBaseProps, "children"> & {
  value: string | number;
  unit?: string;
};
export default function StatCard({
  value,
  unit,
  tone = "teal",
  ...props
}: StatCardProps) {
  const styles = cardStyles[tone];

  return (
    <InfoCard tone={tone} {...props}>
      <div className="relative">
        <span className={cn("text-3xl font-semibold", styles.value)}>
          {value}
        </span>

        {unit && (
          <span className="absolute top-8 right-0 text-right font-medium text-sm text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </InfoCard>
  );
}

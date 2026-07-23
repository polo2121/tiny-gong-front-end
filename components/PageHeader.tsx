import DualText from "./DualText";

export default function PageHeader({
  title,
  subtitle,
  accentClassName,
  children,
}: {
  title: string;
  subtitle: string;
  accentClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-10">
      <DualText
        label={title}
        subLabel={subtitle}
        size="lg"
        className={accentClassName}
      />
      {children}
    </section>
  );
}

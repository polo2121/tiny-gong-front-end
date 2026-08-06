import DualText from "./DualText";

export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-10">
      <DualText label={title} subLabel={subtitle} size="lg" />
      {children}
    </section>
  );
}

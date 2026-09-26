import ProtectedPageTitle from "@/components/PageHeader";
import ProfitStats from "./_components/ProfitStats";
import { SalesPerformance } from "./_components/SalesPerformance";
import ProfitBreakdown from "./_components/ProfitBreakdown";
import ProfitHistory from "./_components/ProfitHistory";

export default function ProfitsPage() {
  return (
    <ProtectedPageTitle title="Profits" subtitle="အမြတ်အစွန်း">
      <ProfitStats />
      <SalesPerformance />
      <ProfitBreakdown />
      <ProfitHistory />
    </ProtectedPageTitle>
  );
}

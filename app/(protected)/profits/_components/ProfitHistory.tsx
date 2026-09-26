"use client";

import { useState } from "react";

import DualText from "@/components/DualText";
import { ViewStyleTabs, type ViewStyle } from "@/components/ViewStyleTabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/currency";

export type ProfitHistoryEntry = {
  id: string;
  date: string;
  revenue: number;
  costOfProducts: number;
  grossProfit: number;
  expenses: number;
  netProfit: number;
};

type ProfitHistoryProps = {
  entries?: readonly ProfitHistoryEntry[];
};

type HistoryPeriod = "week" | "month" | "year" | "custom";

const historyPeriods = [
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
  { label: "Yearly", value: "year" },
  { label: "Custom", value: "custom" },
] as const;

export default function ProfitHistory({ entries = [] }: ProfitHistoryProps) {
  const [view, setView] = useState<ViewStyle>("table");
  const [period, setPeriod] = useState<HistoryPeriod>("week");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filteredEntries = entries.filter((entry) =>
    isWithinPeriod(entry.date, period, from, to),
  );

  return (
    <section className="flex flex-col gap-4 rounded">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DualText
          label="Profit History"
          subLabel="အမြတ်အစွန်းမှတ်တမ်း"
          size="md"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Select
            items={historyPeriods}
            value={period}
            onValueChange={(value) => {
              if (value) setPeriod(value as HistoryPeriod);
            }}
          >
            <SelectTrigger
              aria-label="Filter profit history by period"
              className="h-10 w-fit min-w-32"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {historyPeriods.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {period === "custom" && (
            <div className="flex flex-wrap items-center gap-2">
              <Input
                type="date"
                aria-label="Profit history start date"
                value={from}
                max={to || undefined}
                onChange={(event) => setFrom(event.currentTarget.value)}
                className="h-10 w-auto"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="date"
                aria-label="Profit history end date"
                value={to}
                min={from || undefined}
                onChange={(event) => setTo(event.currentTarget.value)}
                className="h-10 w-auto"
              />
            </div>
          )}

          <ViewStyleTabs value={view} onValueChange={setView} />
        </div>
      </div>

      {view === "table" && <ProfitHistoryTable entries={filteredEntries} />}
      {view === "card" && <ProfitHistoryCards entries={filteredEntries} />}
      {view === "statement" && <ProfitStatement entries={filteredEntries} />}

      <p className="text-right text-xs text-muted-foreground">Amounts in MMK</p>
    </section>
  );
}

function isWithinPeriod(
  value: string,
  period: HistoryPeriod,
  from: string,
  to: string,
) {
  const date = parseDate(value);
  if (!date) return false;

  if (period === "custom") {
    const start = from ? parseDate(from) : null;
    const end = to ? parseDate(to) : null;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (date > today) return false;

  if (period === "week") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return date >= start;
  }

  if (period === "month") {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  }

  return date.getFullYear() === today.getFullYear();
}

function parseDate(value: string) {
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function ProfitHistoryTable({
  entries,
}: {
  entries: readonly ProfitHistoryEntry[];
}) {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Date</TableHead>
            <TableHead scope="col" className="text-right">
              Revenue
            </TableHead>
            <TableHead scope="col" className="text-right">
              Product cost
            </TableHead>
            <TableHead scope="col" className="text-right">
              Gross profit
            </TableHead>
            <TableHead scope="col" className="text-right">
              Expenses
            </TableHead>
            <TableHead scope="col" className="text-right">
              Net profit
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-28 text-center text-muted-foreground"
              >
                No profit history available yet.
              </TableCell>
            </TableRow>
          ) : (
            entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableHead scope="row" className="font-medium">
                  {formatDate(entry.date)}
                </TableHead>
                <MoneyCell value={entry.revenue} />
                <MoneyCell value={entry.costOfProducts} negative />
                <MoneyCell value={entry.grossProfit} />
                <MoneyCell value={entry.expenses} negative />
                <MoneyCell value={entry.netProfit} emphasize />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ProfitHistoryCards({
  entries,
}: {
  entries: readonly ProfitHistoryEntry[];
}) {
  if (entries.length === 0) return <EmptyHistory />;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <article
          key={entry.id}
          className="rounded-xl border border-slate-100 p-4"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <h3 className="font-margarine text-sm text-foreground/80">
              {formatDate(entry.date)}
            </h3>
            <span className="text-xs text-muted-foreground">Net profit</span>
          </div>
          <p
            className={`mb-4 text-2xl font-chewy tabular-nums ${entry.netProfit < 0 ? "text-destructive" : "text-highlight-soft"}`}
          >
            {formatSignedCurrency(entry.netProfit)}
          </p>
          <div className="flex flex-col gap-2 border-t border-dashed pt-3 text-sm">
            <SummaryLine label="Revenue" value={entry.revenue} />
            <SummaryLine
              label="Product cost"
              value={entry.costOfProducts}
              negative
            />
            <SummaryLine label="Gross profit" value={entry.grossProfit} />
            <SummaryLine label="Expenses" value={entry.expenses} negative />
          </div>
        </article>
      ))}
    </div>
  );
}

function ProfitStatement({
  entries,
}: {
  entries: readonly ProfitHistoryEntry[];
}) {
  if (entries.length === 0) return <EmptyHistory />;

  const totals = entries.reduce(
    (result, entry) => ({
      revenue: result.revenue + entry.revenue,
      costOfProducts: result.costOfProducts + entry.costOfProducts,
      grossProfit: result.grossProfit + entry.grossProfit,
      expenses: result.expenses + entry.expenses,
      netProfit: result.netProfit + entry.netProfit,
    }),
    {
      revenue: 0,
      costOfProducts: 0,
      grossProfit: 0,
      expenses: 0,
      netProfit: 0,
    },
  );

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-100 p-4 sm:p-6">
      <div className="mb-5 border-b border-dashed pb-4 text-center">
        <h3 className="font-margarine text-lg">Profit &amp; Loss Statement</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDate(entries[entries.length - 1].date)} —{" "}
          {formatDate(entries[0].date)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <StatementLine label="Revenue" value={totals.revenue} />
        <StatementLine
          label="Cost of products"
          value={totals.costOfProducts}
          negative
        />
        <StatementLine label="Gross profit" value={totals.grossProfit} strong />
        <StatementLine label="Expenses" value={totals.expenses} negative />
        <StatementLine
          label="Net profit"
          value={totals.netProfit}
          strong
          final
        />
      </div>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  negative = false,
}: {
  label: string;
  value: number;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`tabular-nums ${negative || value < 0 ? "text-destructive" : ""}`}
      >
        {negative && value > 0 ? "− " : value < 0 ? "− " : ""}
        {formatCurrency(Math.abs(value))}
      </span>
    </div>
  );
}

function StatementLine({
  label,
  value,
  negative = false,
  strong = false,
  final = false,
}: {
  label: string;
  value: number;
  negative?: boolean;
  strong?: boolean;
  final?: boolean;
}) {
  const isNegative = value < 0 || (negative && value > 0);

  return (
    <div
      className={`flex items-center justify-between gap-4 ${strong ? "font-semibold" : ""} ${final ? "mt-1 border-t border-dashed pt-3 text-base" : ""}`}
    >
      <span>{label}</span>
      <span
        className={`tabular-nums ${isNegative ? "text-destructive" : final ? "text-highlight-soft" : ""}`}
      >
        {isNegative ? "− " : ""}
        {formatCurrency(Math.abs(value))}
      </span>
    </div>
  );
}

function MoneyCell({
  value,
  negative = false,
  emphasize = false,
}: {
  value: number;
  negative?: boolean;
  emphasize?: boolean;
}) {
  const showNegative = value < 0 || (negative && value > 0);

  return (
    <TableCell
      className={`text-right tabular-nums ${
        showNegative
          ? "text-destructive"
          : emphasize
            ? "font-semibold text-highlight-soft"
            : ""
      }`}
    >
      {showNegative ? "− " : ""}
      {formatCurrency(Math.abs(value))}
    </TableCell>
  );
}

function EmptyHistory() {
  return (
    <div className="grid min-h-28 place-items-center rounded-xl border border-dashed text-center text-sm text-muted-foreground">
      No profit history available yet.
    </div>
  );
}

function formatSignedCurrency(value: number) {
  return `${value < 0 ? "− " : ""}${formatCurrency(Math.abs(value))}`;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

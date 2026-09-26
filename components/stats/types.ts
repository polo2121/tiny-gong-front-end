export type DashboardPeriod = "today" | "week" | "month" | "all";

export type CustomDateFilterValue = {
  from: string;
  to: string;
};

export type FilterValue =
  | { type: "period"; period: DashboardPeriod }
  | { type: "custom"; dates: CustomDateFilterValue };

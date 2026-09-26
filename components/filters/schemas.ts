import { z } from "zod";

export const datePeriodSchema = z.enum([
  "day",
  "week",
  "month",
  "year",
  "custom",
]);

const dateInputSchema = z.union([z.iso.date(), z.literal("")]).optional();

export const datePeriodValueSchema = z
  .object({
    period: datePeriodSchema,
    from: dateInputSchema,
    to: dateInputSchema,
  })
  .superRefine((value, context) => {
    if (value.from && value.to && value.from > value.to) {
      context.addIssue({
        code: "custom",
        message: "Start date must be on or before end date.",
        path: ["from"],
      });
    }
  });

export const customDateRangeSchema = z
  .object({
    from: z.iso.date(),
    to: z.iso.date(),
  })
  .refine((value) => value.from <= value.to, {
    message: "Start date must be on or before end date.",
    path: ["from"],
  });

export type DatePeriod = z.infer<typeof datePeriodSchema>;
export type DatePeriodValue = z.infer<typeof datePeriodValueSchema>;
export type CustomDateRange = z.infer<typeof customDateRangeSchema>;

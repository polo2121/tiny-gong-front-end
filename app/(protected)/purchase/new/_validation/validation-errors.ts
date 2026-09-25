import type { ZodError } from "zod";

export type PurchaseValidationIssues =
  ZodError["issues"];

export function getValidationError(
  issues: PurchaseValidationIssues,
  path: PropertyKey[],
): string | undefined {
  return issues.find(
    (issue) =>
      issue.path.length === path.length &&
      issue.path.every(
        (part, index) =>
          part === path[index],
      ),
  )?.message;
}
// lib/errors/normalize-error.ts

import { AppError, appErrors } from "./app-error";
/**
 * Converts an unknown thrown value into the application's canonical
 * `AppError` representation.
 *
 * Intended usage:
 * Use this at application-level error boundaries such as React Query
 * `onError` handlers.
 *
 * Known errors should already have been classified by the layer where
 * they occurred. For example, `apiRequest()` converts known network and
 * API-contract failures into `AppError`.
 *
 * Behavior:
 * - Existing `AppError` → returned unchanged.
 * - Any other unexpected thrown value → `UNKNOWN_ERROR`.
 *
 * Do NOT put HTTP parsing, API schema validation, or feature-specific
 * business logic here. Those responsibilities belong to other layers.
 *
 * @param error Any value that was thrown/rejected.
 * @returns A guaranteed `AppError`.
 *
 * @example
 * onError: (error) => {
 *   const appError = normalizeError(error);
 * }
 */
export function normalizeError(
  error: unknown,
): AppError {
  if (error instanceof AppError) {
    return error;
  }

  return appErrors.unknown();
}
// lib/api/api.schemas.ts

import { z } from "zod";

/**
 * Standard backend error payload.
 *
 * `code`
 * Stable machine-readable error identifier.
 *
 * `status`
 * HTTP status associated with the backend error.
 *
 * `message`
 * Backend-readable/debuggable description of the error.
 * This is not necessarily the final user-facing frontend message.
 *
 * `fields`
 * Optional field-level validation information.
 */
export const ApiErrorSchema = z.object({
  code: z.string(),
  status: z.number(),
  message: z.string(),

  fields: z
    .record(z.string(), z.string())
    .optional(),
});

/**
 * Standard API failure envelope.
 */
export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ApiErrorSchema,
});

/**
 * Creates the expected success-response schema for a specific endpoint.
 *
 * The generic API envelope is fixed:
 *
 * {
 *   success: true,
 *   data: T
 * }
 *
 * The supplied Zod schema defines the expected shape of `data`.
 *
 * @param dataSchema Zod schema describing endpoint-specific success data.
 *
 * @example
 * const schema = ApiSuccessSchema(PurchaseSchema);
 */
export const ApiSuccessSchema = <
  TSchema extends z.ZodTypeAny,
>(
  dataSchema: TSchema,
) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  });

export type ApiError =
  z.infer<typeof ApiErrorSchema>;

export type ApiErrorResponse =
  z.infer<typeof ApiErrorResponseSchema>;
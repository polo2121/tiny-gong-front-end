// lib/errors/app-error.ts

/**
 * Configuration used to create an `AppError`.
 *
 * `code`
 * Machine-readable identifier used by application logic and
 * frontend error-message mappings.
 *
 * `status`
 * Optional HTTP status associated with the error.
 *
 * `details`
 * Optional structured metadata such as field-level validation errors.
 */
export type AppErrorOptions = {
  code: string;
  status?: number;
  details?: unknown;
};

/**
 * Canonical error type used by the application layer.
 *
 * All known infrastructure/API errors should eventually be represented
 * as `AppError` before they reach feature/UI error handling.
 *
 * Responsibilities:
 * - Provides a stable machine-readable error code.
 * - Optionally carries HTTP status.
 * - Optionally carries structured diagnostic details.
 *
 * This class does NOT own user-facing error messages.
 * Presentation messages should be resolved separately from `code`.
 *
 * @example
 * const error = new AppError({
 *   code: "PURCHASE_DUPLICATE_INVOICE",
 *   status: 409,
 * });
 */
export class AppError extends Error {
  code: string;
  status?: number;
  details?: unknown;

  constructor({
    code,
    status,
    details,
  }: AppErrorOptions) {
    // Error.message exists because AppError extends the native Error class.
    // We use the code as the internal message; UI copy is mapped separately.
    super(code);

    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Input for converting a validated backend API error
 * into the application's canonical `AppError`.
 */
type ApiErrorInput = {
  code: string;
  status?: number;
  details?: unknown;
};

/**
 * Central factory for shared application error policies.
 *
 * Use this object for common infrastructure errors whose meaning
 * should have one owner across the application.
 *
 * Why this exists:
 * - Prevents repeated `new AppError(...)` construction rules.
 * - Centralizes shared error codes.
 * - Allows error metadata/policy to evolve without changing every caller.
 *
 * Prefer:
 *
 *   throw appErrors.invalidApiResponse(response.status);
 *
 * Instead of:
 *
 *   throw new AppError({
 *     code: "INVALID_API_RESPONSE",
 *     status: response.status,
 *   });
 *
 * Backend/feature-specific error codes should normally be passed
 * through `fromApi()` rather than creating one factory function
 * for every business error.
 */
export const appErrors = {
  /**
   * Creates an error representing a network/transport failure where
   * a usable HTTP response was not received.
   */
  network() {
    return new AppError({
      code: "NETWORK_ERROR",
    });
  },

  timeout() {
    return new AppError({
      code: "REQUEST_TIMEOUT",
    });
  },

  /**
   * Creates an error for a successful HTTP response whose body does
   * not satisfy the expected success-response contract.
   *
   * Examples:
   * - Expected JSON but body is empty.
   * - Backend returned HTML/text instead of JSON.
   * - JSON is valid but does not match the expected success schema.
   *
   * @param status HTTP status returned by the server.
   */
  invalidApiResponse(status?: number) {
    return new AppError({
      code: "INVALID_API_RESPONSE",
      status,
    });
  },

  /**
   * Creates an error for a non-2xx response whose body does not satisfy
   * the standardized backend API error contract.
   *
   * Examples:
   * - 500 response contains HTML.
   * - Error body contains malformed JSON.
   * - JSON exists but does not match `ApiErrorResponseSchema`.
   *
   * @param status HTTP status returned by the server.
   */
  invalidApiErrorResponse(status?: number) {
    return new AppError({
      code: "INVALID_API_ERROR_RESPONSE",
      status,
    });
  },

  /**
   * Creates the fallback error used when an unexpected thrown value
   * cannot be classified.
   */
  unknown() {
    return new AppError({
      code: "UNKNOWN_ERROR",
    });
  },

  /**
   * Converts a validated backend API/business error into `AppError`.
   *
   * The input should already have passed the backend error-response
   * schema validation before reaching this function.
   *
   * @param error Validated backend error information.
   */
  fromApi(error: ApiErrorInput) {
    return new AppError({
      code: error.code,
      status: error.status,
      details: error.details,
    });
  },
};

import { z } from "zod";

import { ApiErrorResponseSchema, ApiSuccessSchema } from "./api.schemas";
import { appErrors } from "@/lib/errors/app-error";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const requestTimeoutMilliseconds = 10000;

type ApiRequestWithSchema<T> = {
  url: string;
  method?: HttpMethod;
  body?: unknown;
  schema: z.ZodType<T>;
};

type ApiRequestWithoutSchema = {
  url: string;
  method?: HttpMethod;
  body?: unknown;
  schema?: undefined;
};

export function apiRequest<T>(
  options: ApiRequestWithSchema<T>,
): Promise<T>;

export function apiRequest(
  options: ApiRequestWithoutSchema,
): Promise<void>;

export async function apiRequest<T>({
  url,
  method = "GET",
  body,
  schema,
}: ApiRequestWithSchema<T> | ApiRequestWithoutSchema): Promise<T | void> {
  const hasBody = body !== undefined;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, requestTimeoutMilliseconds);
  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: hasBody
        ? {
            "Content-Type": "application/json",
          }
        : undefined,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw appErrors.timeout();
    }

    throw appErrors.network();
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    let errorBody: unknown;

    try {
      errorBody = await response.json();
    } catch {
      throw appErrors.invalidApiErrorResponse(response.status);
    }

    const result = ApiErrorResponseSchema.safeParse(errorBody);

    console.log(result);

    if (!result.success) {
      throw appErrors.invalidApiErrorResponse(response.status);
    }

    throw appErrors.fromApi({
      code: result.data.error.code,
      status: result.data.error.status,
      details: result.data.error.fields,
    });
  }

  if (!schema) {
    return;
  }

  let bodyData: unknown;

  try {
    bodyData = await response.json();
  } catch {
    throw appErrors.invalidApiResponse(response.status);
  }

  const result = ApiSuccessSchema(schema).safeParse(bodyData);

  if (!result.success) {
    throw appErrors.invalidApiResponse(response.status);
  }

  const responseBody = result.data as { data: T };

  return responseBody.data;
}

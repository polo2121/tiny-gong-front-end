import { z } from "zod";

export function parseUrlParams<TSchema extends z.ZodType>(
  searchParams: URLSearchParams,
  schema: TSchema,
): z.infer<TSchema> {

  const values = Object.fromEntries(searchParams.entries());

  return schema.parse(values);
}

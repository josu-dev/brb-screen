import { z } from 'zod';


export function searchParamsValues(searchParams: URLSearchParams): Record<string, any> {
  const res: Record<string, unknown> = {};
  for (const key of searchParams.keys()) {
    const values = searchParams.getAll(key);
    res[key] = values.length > 1 ? values : values[0];
  }
  return res;
}

export function searchParamsValuesAsJSON(searchParams: URLSearchParams): Record<string, any> {
  const res: Record<string, unknown> = {};
  for (const key of searchParams.keys()) {
    const values: unknown[] = [];
    for (const value of searchParams.getAll(key)) {
      try {
        values.push(JSON.parse(value));
      }
      catch (e) {
        if (e instanceof SyntaxError) {
          values.push(value);
          continue;
        }
        throw e;
      }
    }
    res[key] = values.length > 1 ? values : values[0];
  }
  return res;
}

export function makeSearchParamsSchema<Schema extends z.ZodObject<z.ZodRawShape>>(schema: Schema, dialect: 'plain' | 'json' = 'plain') {
  if (dialect === 'plain') {
    return z.instanceof(URLSearchParams).transform(searchParamsValues).pipe(schema);
  }
  return z.instanceof(URLSearchParams).transform(searchParamsValuesAsJSON).pipe(schema);
}

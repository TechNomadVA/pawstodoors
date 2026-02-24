/**
 * D1 database helpers for Cloudflare Pages.
 * In Route Handlers (edge), get the binding via getRequestContext from @cloudflare/next-on-pages:
 *
 *   const { getRequestContext } = await import("@cloudflare/next-on-pages");
 *   const db = getRequestContext().env.DB;
 *
 * Then pass db to dbFirst, dbAll, dbRun. When not on Cloudflare, db will be undefined — guard with if (db).
 */

export type D1Database = import("@cloudflare/workers-types").D1Database;

/**
 * Helper: run a prepared statement and return first row or null.
 */
export async function dbFirst<T>(
  db: D1Database | null,
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  if (!db) return null;
  const stmt = db.prepare(sql);
  const result = params?.length ? await stmt.bind(...params).first<T>() : await stmt.first<T>();
  return result ?? null;
}

/**
 * Helper: run a prepared statement and return all rows.
 */
export async function dbAll<T>(
  db: D1Database | null,
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  if (!db) return [];
  const stmt = db.prepare(sql);
  const result = params?.length ? await stmt.bind(...params).all() : await stmt.all();
  return (result.results ?? []) as T[];
}

/**
 * Helper: run a prepared statement (insert/update/delete).
 */
export async function dbRun(
  db: D1Database | null,
  sql: string,
  params?: unknown[]
): Promise<{ success: boolean; meta: { changes: number; last_row_id: number } }> {
  if (!db) return { success: false, meta: { changes: 0, last_row_id: 0 } };
  const stmt = db.prepare(sql);
  const result = params?.length ? await stmt.bind(...params).run() : await stmt.run();
  return {
    success: result.success,
    meta: result.meta ?? { changes: 0, last_row_id: 0 },
  };
}

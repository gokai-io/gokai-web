/**
 * Mock Supabase client for local development without real Supabase credentials.
 * Returns empty data for all queries so pages render without errors.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const emptyResponse = { data: null, error: null, count: null, status: 200, statusText: "OK" }
const emptyArrayResponse = { data: [], error: null, count: 0, status: 200, statusText: "OK" }

function createMockQueryBuilder(): any {
  const builder: any = {}
  const chainMethods = [
    "select", "insert", "update", "upsert", "delete",
    "eq", "neq", "gt", "gte", "lt", "lte",
    "like", "ilike", "is", "in", "contains",
    "containedBy", "range", "textSearch",
    "filter", "not", "or", "and",
    "order", "limit", "offset",
    "single", "maybeSingle",
    "csv", "geojson", "explain",
    "rollback", "returns",
  ]

  for (const method of chainMethods) {
    builder[method] = (..._args: any[]) => builder
  }

  // Make the builder thenable so `await supabase.from(...).select(...)` resolves
  builder.then = (resolve: any) => resolve(emptyArrayResponse)

  // Override single to return null data instead of array
  builder.single = () => {
    const singleBuilder: any = { ...builder }
    singleBuilder.then = (resolve: any) => resolve(emptyResponse)
    return singleBuilder
  }

  builder.maybeSingle = () => {
    const singleBuilder: any = { ...builder }
    singleBuilder.then = (resolve: any) => resolve(emptyResponse)
    return singleBuilder
  }

  return builder
}

export function createMockSupabaseClient(): any {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: "Supabase não configurado" } }),
      signUp: async () => ({ data: { user: null, session: null }, error: { message: "Supabase não configurado" } }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ data: {}, error: null }),
      updateUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      exchangeCodeForSession: async () => ({ data: { user: null, session: null }, error: null }),
    },
    from: (_table: string) => createMockQueryBuilder(),
    storage: {
      from: (_bucket: string) => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: `/mock-storage/${path}` } }),
        remove: async () => ({ data: null, error: null }),
        list: async () => ({ data: [], error: null }),
      }),
    },
    rpc: async () => emptyResponse,
  }
}

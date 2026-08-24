/** Canonical module names used in sidebar, route guards, and role assignment */
export const ADMIN_MODULES = [
  "Dashboard",
  "User Management",
  "Broadcasts",
  "Payments",
  "Role & Rights",
] as const

export type AdminModule = (typeof ADMIN_MODULES)[number]

/** Normalize for comparison: "Roles and rights" / "Role & Rights" → same key */
export const normalizeModuleName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .replace(/^roles /, "role ")

export const hasModuleAccess = (allowed: string[], module: string) => {
  const target = normalizeModuleName(module)
  return allowed.some((m) => normalizeModuleName(m) === target)
}

export const parseModuleAccess = (moduleAccess?: string | null) =>
  moduleAccess
    ? moduleAccess.split(",").map((m) => m.trim()).filter(Boolean)
    : []

/** Map stored names (incl. legacy aliases) onto canonical ADMIN_MODULES labels */
export const canonicalizeModules = (modules: string[]) =>
  ADMIN_MODULES.filter((canonical) => hasModuleAccess(modules, canonical))

export const MODULE_HOME_PATH: Record<AdminModule, string> = {
  Dashboard: "/dashboard",
  "User Management": "/users/admin",
  Broadcasts: "/broadcasts/notification",
  Payments: "/payments",
  "Role & Rights": "/roles",
}

export const getFirstAllowedPath = (allowed: string[]) => {
  const first = ADMIN_MODULES.find((module) => hasModuleAccess(allowed, module))
  return first ? MODULE_HOME_PATH[first] : "/dashboard"
}

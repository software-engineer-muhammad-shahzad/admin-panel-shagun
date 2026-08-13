import { UserRole } from "@/app/shared/enums"
import { parseModuleAccess } from "@/app/shared/adminModules"
import { AuthData } from "./types/auth"

export const NO_ROLE_ASSIGNED_MESSAGE = "You have not been assigned a role yet. Please contact the administrator!"

const normalizeRole = (role: AuthData["role"] | number | null | undefined) =>
  String(role ?? "").trim().toLowerCase()

const hasModuleAccessData = (access: AuthData["adminModuleAccess"] | unknown) => {
  if (Array.isArray(access)) {
    return access.some((item) => String(item ?? "").trim().length > 0)
  }
  return parseModuleAccess(typeof access === "string" ? access : null).length > 0
}

export const canAccessAdminPanel = (data: AuthData) => {
  const role = normalizeRole(data.role)
  const isSuperAdmin =
    role === "superadmin" || role === String(UserRole.SuperAdmin)
  if (isSuperAdmin) return true

  const isAdmin = role === "admin" || role === String(UserRole.Admin)
  if (!isAdmin) return false

  return hasModuleAccessData(data.adminModuleAccess)
}

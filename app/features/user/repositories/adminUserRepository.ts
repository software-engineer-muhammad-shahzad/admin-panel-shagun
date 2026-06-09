import { AdminUsersParams, CreateAdminPayload } from "../types/adminUser"
import { adminUserService } from "../services/adminUserService"

export const adminUserQueryKeys = {
  all: ["adminUsers"] as const,
  admins: (params?: AdminUsersParams) =>
    [...adminUserQueryKeys.all, "admins", params] as const,
}

export const adminUserRepository = {
  getAdmins: (params?: AdminUsersParams) => adminUserService.getAdmins(params),
  deleteAdmin: (userId: number) => adminUserService.deleteAdmin(userId),
  createAdmin: (payload: CreateAdminPayload) => adminUserService.createAdmin(payload),
  updateAdmin: (userId: number, payload: CreateAdminPayload) => adminUserService.updateAdmin(userId, payload),
}

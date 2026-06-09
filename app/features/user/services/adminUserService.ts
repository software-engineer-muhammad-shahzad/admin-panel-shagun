import { deleteRequest, postRequest, putRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { AdminUser, AdminUsersParams, ApiResponse, CreateAdminPayload, PaginatedData } from "../types/adminUser"

export const adminUserService = {
  getAdmins: async (params?: AdminUsersParams): Promise<PaginatedData<AdminUser>> => {
    const response = await postRequest<ApiResponse<PaginatedData<AdminUser>>>(
      endpoints.admin.getAdmin,
      params ?? {}
    )
    return response.data
  },

  deleteAdmin: async (userId: number): Promise<void> => {
    await deleteRequest(endpoints.admin.deleteAdmin(userId))
  },

  createAdmin: async (payload: CreateAdminPayload): Promise<void> => {
    await postRequest(endpoints.admin.createAdmin, payload)
  },

  updateAdmin: async (userId: number, payload: CreateAdminPayload): Promise<void> => {
    await putRequest(endpoints.admin.updateAdmin(userId), payload)
  },
}

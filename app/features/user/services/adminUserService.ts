import { deleteRequest, postRequest, putRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { AdminUser, AdminUsersParams, ApiResponse, AssignModulesPayload, CreateAdminPayload, PaginatedData } from "../types/adminUser"

export const adminUserService = {
  getAdmins: async (params?: AdminUsersParams): Promise<PaginatedData<AdminUser>> => {
    const response = await postRequest<ApiResponse<PaginatedData<any>>>(
      endpoints.admin.getAdmin,
      params ?? {}
    )
    const data = response.data
    return {
      ...data,
      items: data.items.map((item: any) => ({
        ...item,
        recordStatus: item.resourceMetadata?.recordStatus === "Active" ? 1 : 0,
      })),
    }
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

  assignModules: async (userId: number, payload: AssignModulesPayload): Promise<void> => {
    await postRequest(endpoints.admin.assignModules(userId), payload)
  },
}

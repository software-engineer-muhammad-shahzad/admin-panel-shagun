import { useQuery } from "@tanstack/react-query"
import { AdminUsersParams } from "../types/adminUser"
import { adminUserQueryKeys, adminUserRepository } from "../repositories/adminUserRepository"

export const useAdminUsers = (params?: AdminUsersParams) => {
  return useQuery({
    queryKey: adminUserQueryKeys.admins(params),
    queryFn: () => adminUserRepository.getAdmins(params),
  })
}

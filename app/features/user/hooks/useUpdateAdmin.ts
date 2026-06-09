import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminUserQueryKeys, adminUserRepository } from "../repositories/adminUserRepository"
import { CreateAdminPayload } from "../types/adminUser"
import { showToast } from "@/app/lib/toast"

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: number; payload: CreateAdminPayload }) =>
      adminUserRepository.updateAdmin(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all })
      showToast.success("Admin updated", "Admin details have been saved successfully.")
    },
    onError: () => {
      showToast.error("Failed to update admin", "Something went wrong. Please try again.")
    },
  })
}

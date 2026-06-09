import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminUserQueryKeys, adminUserRepository } from "../repositories/adminUserRepository"
import { CreateAdminPayload } from "../types/adminUser"
import { showToast } from "@/app/lib/toast"

export const useCreateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAdminPayload) => adminUserRepository.createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all })
      showToast.success("Admin created", "New admin has been added successfully.")
    },
    onError: () => {
      showToast.error("Failed to create admin", "Please check the details and try again.")
    },
  })
}

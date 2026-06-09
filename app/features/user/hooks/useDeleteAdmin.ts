import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminUserQueryKeys, adminUserRepository } from "../repositories/adminUserRepository"
import { showToast } from "@/app/lib/toast"

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => adminUserRepository.deleteAdmin(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all })
      showToast.success("Admin deleted", "The admin account has been removed.")
    },
    onError: () => {
      showToast.error("Failed to delete admin", "Something went wrong. Please try again.")
    },
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { coupleUserQueryKeys, coupleUserRepository } from "../repositories/coupleUserRepository"
import { showToast } from "@/app/lib/toast"

export const useDeleteCouple = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => coupleUserRepository.deleteCouple(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coupleUserQueryKeys.all })
      showToast.success("Couple deleted", "The couple account has been removed.")
    },
    onError: () => {
      showToast.error("Failed to delete couple", "Something went wrong. Please try again.")
    },
  })
}

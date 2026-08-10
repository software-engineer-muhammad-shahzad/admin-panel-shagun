import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { showToast } from "@/app/lib/toast"

export const useDeleteCoupleProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) =>
      deleteRequest(endpoints.couple.deleteCoupleProfile, {
        params: { userId },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleUsers"] })
      showToast.success("Profile photo removed", "The profile picture has been deleted.")
    },
    onError: () => {
      showToast.error("Failed to delete", "Something went wrong. Please try again.")
    },
  })
}

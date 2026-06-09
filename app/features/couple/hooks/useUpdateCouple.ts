import { useMutation, useQueryClient } from "@tanstack/react-query"
import { coupleUserQueryKeys, coupleUserRepository } from "../repositories/coupleUserRepository"
import { UpdateCouplePayload } from "../types/coupleUser"
import { showToast } from "@/app/lib/toast"

export const useUpdateCouple = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: number; payload: UpdateCouplePayload }) =>
      coupleUserRepository.updateCouple(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coupleUserQueryKeys.all })
      showToast.success("Couple updated", "Couple details have been saved successfully.")
    },
    onError: () => {
      showToast.error("Failed to update couple", "Something went wrong. Please try again.")
    },
  })
}

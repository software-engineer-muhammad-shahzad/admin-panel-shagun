import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "../services/notificationService"
import { CreateNotificationPayload } from "../types/createNotification"
import { notificationListQueryKeys } from "../repositories/notificationListRepository"
import { showToast } from "@/app/lib/toast"

export const useCreateNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) =>
      notificationService.createNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationListQueryKeys.all })
      showToast.success("Notification sent", "Your notification has been sent successfully.")
    },
    onError: () => {
      showToast.error("Failed to send", "Something went wrong. Please try again.")
    },
  })
}
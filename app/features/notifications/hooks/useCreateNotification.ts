import { useMutation } from "@tanstack/react-query"
import { notificationListService, CreateNotificationPayload } from "../services/notificationListService"
import { showToast } from "@/app/lib/toast"

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) =>
      notificationListService.createNotification(payload),
    onSuccess: () => {
      showToast.success("Notification sent", "Your notification has been sent successfully.")
    },
    onError: () => {
      showToast.error("Failed to send", "Something went wrong. Please try again.")
    },
  })
}

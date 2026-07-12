import { useMutation } from "@tanstack/react-query"
import { announcementService } from "../services/announcementService"
import { showToast } from "@/app/lib/toast"

export const useCreateAnnouncement = () => {
  return useMutation({
    mutationFn: (content: string) => announcementService.createAnnouncement(content),
    onSuccess: () => {
      showToast.success("Announcement sent", "Your announcement has been published to all couples.")
    },
    onError: () => {
      showToast.error("Failed to send", "Something went wrong. Please try again.")
    },
  })
}

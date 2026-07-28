import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { CreateNotificationPayload } from "../types/createNotification"

export const notificationService = {
  createNotification: async (payload: CreateNotificationPayload): Promise<void> => {
    await postRequest(endpoints.notification.createNotification, payload)
  },
}

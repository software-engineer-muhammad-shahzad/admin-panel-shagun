import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, NotificationItem, NotificationListParams, PaginatedData } from "../types/notificationList"

export interface CreateNotificationPayload {
  recieverUserId: number
  subject: string
  message: string
}

export const notificationListService = {
  getNotificationList: async (params?: NotificationListParams): Promise<PaginatedData<NotificationItem>> => {
    const response = await postRequest<ApiResponse<PaginatedData<NotificationItem>>>(
      endpoints.notification.getNotificationList,
      params ?? {}
    )
    return response.data
  },

  createNotification: async (payload: CreateNotificationPayload): Promise<void> => {
    await postRequest(endpoints.notification.createNotification, payload)
  },
}

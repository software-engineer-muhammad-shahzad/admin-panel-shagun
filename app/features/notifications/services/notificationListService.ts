import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, NotificationItem, NotificationListParams, PaginatedData } from "../types/notificationList"

export const notificationListService = {
  getNotificationList: async (params?: NotificationListParams): Promise<PaginatedData<NotificationItem>> => {
    const response = await postRequest<ApiResponse<PaginatedData<NotificationItem>>>(
      endpoints.notification.getNotificationList,
      params ?? {}
    )
    return response.data
  },
}

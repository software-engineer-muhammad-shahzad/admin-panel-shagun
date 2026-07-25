import { NotificationListParams } from "../types/notificationList"
import { notificationListService } from "../services/notificationListService"

export const notificationListQueryKeys = {
  all: ["notificationList"] as const,
  list: (params?: NotificationListParams) =>
    [...notificationListQueryKeys.all, "list", params] as const,
}

export const notificationListRepository = {
  getNotificationList: (params?: NotificationListParams) =>
    notificationListService.getNotificationList(params),
}

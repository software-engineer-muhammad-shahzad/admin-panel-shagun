import { useQuery } from "@tanstack/react-query"
import { notificationListQueryKeys, notificationListRepository } from "../repositories/notificationListRepository"
import { NotificationListParams } from "../types/notificationList"

export const useNotificationList = (params?: NotificationListParams) => {
  return useQuery({
    queryKey: notificationListQueryKeys.list(params),
    queryFn: () => notificationListRepository.getNotificationList(params),
  })
}

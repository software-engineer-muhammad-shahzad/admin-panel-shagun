import { NotificationPurpose } from "@/app/shared/enums"

export interface CreateNotificationPayload {
  recieverUserId: number
  subject: string
  message: string
  notificationPurpose: NotificationPurpose
}

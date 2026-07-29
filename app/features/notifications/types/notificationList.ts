import { ResourceMetadata } from "../../broadcasts/types/broadcastUser"

export interface NotificationItem {
  id: number
  senderUserId: number | null
  adminFullName: string | null
  recieverUserId: number | null
  coupleName: string | null
  email: string | null
  message: string | null
  subject: string | null
  isRead: boolean
  resourceMetadata: ResourceMetadata
}

export interface NotificationListParams {
  search?: string
  offset?: number
  length?: number
}

export interface PaginatedData<T> {
  items: T[]
  offset: number
  length: number
  totalReturned: number
  totalOverall: number
}

export interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

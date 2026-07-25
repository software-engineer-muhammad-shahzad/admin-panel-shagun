export interface NotificationItem {
  id: number
  fullName: string | null
  email: string | null
  message: string | null
  sentAt: string | null
  isRead: boolean
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

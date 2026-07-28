export interface NotificationItem {
  id: number
  senderUserId: number | null
  adminFullName: string | null
  recieverUserId: number | null
  coupleName: string | null
  notificationDate: string | null
  message: string | null
  subject: string | null
  notificationPurpose: string | null
  amount: number | null
  isRead: boolean
  resourceMetadata?: {
    createdOn: string
    createdBy: number
    updatedOn: string | null
    updatedBy: number | null
    deletedOn: string | null
    deletedBy: number | null
    recordStatus: string
  }
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

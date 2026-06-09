export interface UpdateCouplePayload {
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  isActive: boolean
  eventDate: string
}

export interface CoupleUsersParams {
  search?: string
  userRole?: number
  recordStatus?: number
}

export interface CoupleUser {
  displayId: string
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  createdOnUtc: string
  updatedOnUtc: string | null
  recordStatus: number
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

export interface UpdateCouplePayload {
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  isActive: boolean
  recordStatus: number
  eventDate: string
}

export interface CoupleUsersParams {
  search?: string
  userRole?: number
  recordStatus?: number
}

export interface CoupleResourceMetadata {
  createdOn: string
  createdBy: number | null
  updatedOn: string | null
  updatedBy: number | null
  deletedOn: string | null
  deletedBy: number | null
  recordStatus: string | null
}

export interface CoupleUser {
  displayId: string | null
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  profileImageUrl: string | null
  moduleAccess: string | null
  stripeCustomerId: string | null
  resourceMetadata: CoupleResourceMetadata
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

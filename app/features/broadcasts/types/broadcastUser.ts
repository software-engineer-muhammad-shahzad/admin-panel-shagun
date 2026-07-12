export interface BroadcastCoupleParams {
  search?: string
  userRole?: number
  recordStatus?: number
}

export interface ResourceMetadata {
  setCommonFlags: boolean
  createdOn: string
  createdBy: string | null
  updatedOn: string | null
  updatedBy: string | null
  deletedOn: string | null
  deletedBy: string | null
  recordStatus: number
}

export interface BroadcastCouple {
  displayId: string
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  stripeCustomerId: string | null
  resourceMetadata: ResourceMetadata
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

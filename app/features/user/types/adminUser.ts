export interface AssignModulesPayload {
  userId: number
  fullName: string
  contactNumber: string
  email: string
  password: string
  userRole: string
  moduleAccess: string
  isActive: boolean
  eventDate: string
}

export interface CreateAdminPayload {
  fullName: string
  contactNumber: string
  email: string
  password: string
  userRole: string | number
  moduleAccess: string
  isActive: boolean
  recordStatus: number
  eventDate: string
}

export interface AdminUsersParams {
  search?: string
  userId?: number
  userRole?: string | number
  recordStatus?: string | number
  offset?: number
  length?: number
}

export interface ResourceMetadata {
  createdOn: string
  updatedOn: string | null
  deletedOn: string | null
  recordStatus: string | null
}

export interface AdminUser {
  displayId: string | null
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  userRole?: string | number
  moduleAccess: string | null
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

export enum UserRole {
  SuperAdmin = 1,
  Admin = 2,
  Couple = 3,
}

export interface CreateAdminPayload {
  fullName: string
  contactNumber: string
  email: string
  password: string
  userRole: UserRole
  moduleAccess: string
  isActive: boolean
  eventDate: string
}

export interface AdminUsersParams {
  search?: string
  userRole?: number
  recordStatus?: number
}

export interface AdminUser {
  displayId: string
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  createdOnUtc: string
  updatedOnUtc: string | null
  moduleAccess: string | null
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

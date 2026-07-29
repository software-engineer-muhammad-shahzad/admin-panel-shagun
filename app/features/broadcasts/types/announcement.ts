import { ResourceMetadata } from "./broadcastUser"

export interface Announcement {
  id: number
  announcedBy: number
  content: string
  adminFullName: string
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

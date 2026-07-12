export interface Announcement {
  id: number
  content: string
  createdOnUtc: string
  createdBy: string | null
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

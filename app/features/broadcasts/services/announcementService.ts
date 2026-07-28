import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { Announcement, ApiResponse, PaginatedData } from "../types/announcement"

export const announcementService = {
  createAnnouncement: async (content: string): Promise<void> => {
    await postRequest(endpoints.BroadDast.createAnnouncement, { content })
  },

  getAnnouncements: async (params: { offset?: number; length?: number; search?: string } = {}): Promise<PaginatedData<Announcement>> => {
    const response = await postRequest<ApiResponse<PaginatedData<Announcement>>>(
      endpoints.BroadDast.getNotification,
      params
    )
    return response.data ?? { items: [], offset: 0, length: 0, totalReturned: 0, totalOverall: 0 }
  },
}

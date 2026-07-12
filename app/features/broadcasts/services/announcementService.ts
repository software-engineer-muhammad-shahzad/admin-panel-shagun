import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { Announcement, ApiResponse, PaginatedData } from "../types/announcement"

export const announcementService = {
  createAnnouncement: async (content: string): Promise<void> => {
    await postRequest(endpoints.BroadDast.createAnnouncement, { content })
  },

  getAnnouncements: async (): Promise<Announcement[]> => {
    const response = await postRequest<ApiResponse<PaginatedData<Announcement>>>(
      endpoints.BroadDast.getNotification,
      {}
    )
    return response.data?.items ?? []
  },
}

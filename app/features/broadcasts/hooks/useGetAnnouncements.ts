import { useQuery } from "@tanstack/react-query"
import { announcementService } from "../services/announcementService"

export const announcementQueryKeys = {
  all: ["announcements"] as const,
}

interface AnnouncementParams {
  offset?: number
  length?: number
  search?: string
}

export const useGetAnnouncements = (params: AnnouncementParams = {}) => {
  return useQuery({
    queryKey: [...announcementQueryKeys.all, params],
    queryFn: () => announcementService.getAnnouncements(params),
  })
}

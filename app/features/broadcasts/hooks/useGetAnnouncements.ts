import { useQuery } from "@tanstack/react-query"
import { announcementService } from "../services/announcementService"

export const announcementQueryKeys = {
  all: ["announcements"] as const,
}

export const useGetAnnouncements = () => {
  return useQuery({
    queryKey: announcementQueryKeys.all,
    queryFn: () => announcementService.getAnnouncements(),
  })
}

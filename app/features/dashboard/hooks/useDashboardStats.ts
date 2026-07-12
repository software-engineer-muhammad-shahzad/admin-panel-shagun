import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const useDashboardStats = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  return useQuery({
    queryKey: ["dashboardStats", month, year],
    queryFn: () => dashboardService.getCardsDetails(month, year),
  })
}

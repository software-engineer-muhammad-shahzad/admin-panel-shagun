import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const useTotalUsersChart = (userRole: string) => {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  return useQuery({
    queryKey: ["totalUsersChart", userRole, month, year],
    queryFn: () => dashboardService.getTotalUsersChart(userRole, month, year),
    retry: false,
  })
}

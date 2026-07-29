import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const useTotalUsersChart = (userRole: string) => {
  const year = new Date().getFullYear()

  return useQuery({
    queryKey: ["totalUsersChart", userRole, year],
    queryFn: () => dashboardService.getTotalUsersChart(userRole, year),
    retry: false,
  })
}

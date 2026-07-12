import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const useTotalUsersChart = (usersRole: number) => {
  const year = new Date().getFullYear()

  return useQuery({
    queryKey: ["totalUsersChart", usersRole, year],
    queryFn: () => dashboardService.getTotalUsersChart(usersRole, year),
  })
}

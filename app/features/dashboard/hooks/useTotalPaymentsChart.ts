import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const useTotalPaymentsChart = (month: number) => {
  const year = new Date().getFullYear()

  return useQuery({
    queryKey: ["totalPaymentsChart", month, year],
    queryFn: () => dashboardService.getTotalPaymentsChart(month, year),
  })
}

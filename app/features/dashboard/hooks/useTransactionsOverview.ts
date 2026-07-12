import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const useTransactionsOverview = (month: number) => {
  const year = new Date().getFullYear()

  return useQuery({
    queryKey: ["transactionsOverview", month, year],
    queryFn: () => dashboardService.getTransactionsOverview(month, year),
  })
}

import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboardService"

export const usePaymentCards = () => {
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()

  return useQuery({
    queryKey: ["paymentCards", month, year],
    queryFn: () => dashboardService.getPaymentCards(month, year),
    retry: false,
  })
}

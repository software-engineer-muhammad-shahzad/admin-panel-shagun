import { useQuery } from "@tanstack/react-query"
import { paymentService } from "../services/paymentService"

interface TransactionFilters {
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  offset?: number
  length?: number
}

export const useGetTransactions = (params: TransactionFilters = {}) =>
  useQuery({
    queryKey: ["transactions", params],
    queryFn: () => paymentService.getTransactions(params),
  })

import { useQuery } from "@tanstack/react-query"
import { paymentService } from "../services/paymentService"

export const paymentQueryKeys = {
  config: ["paymentConfig"] as const,
}

export const useGetPaymentConfig = () => {
  return useQuery({
    queryKey: paymentQueryKeys.config,
    queryFn: () => paymentService.getPaymentConfig(),
  })
}

import apiClient from "@/app/services/apiClient"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, GreetingCard, PaymentConfig, Transaction, TransactionListParams } from "../types/payment"

export const paymentService = {
  addGift: async (
    images: File[],
    cardPrice: number,
    videoPrice: number,
    platformFeePercent: number
  ): Promise<void> => {
    const formData = new FormData()
    images.forEach((file) => formData.append("CardImages", file))
    formData.append("CardPrice", String(cardPrice))
    formData.append("VideoPrice", String(videoPrice))
    formData.append("PlatformFeePercent", String(platformFeePercent))
    await apiClient.post(endpoints.payments.addGift, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  getPaymentConfig: async (): Promise<PaymentConfig> => {
    const response = await apiClient.get<ApiResponse<PaymentConfig>>(
      endpoints.payments.showGift
    )
    return response.data.data
  },

  getTransactions: async (params: Omit<TransactionListParams, "isIncludeGuestUser" | "isIncludeCoupleUser" | "isIncludePayment">): Promise<Transaction[]> => {
    const response = await apiClient.post<ApiResponse<any>>(
      endpoints.payments.getTransactions,
      {
        ...params,
        isIncludeGuestUser: true,
        isIncludeCoupleUser: true,
        isIncludePayment: true,
      }
    )
    const data = response.data.data
    if (Array.isArray(data)) return data
    if (data?.items && Array.isArray(data.items)) return data.items
    if (data?.payments && Array.isArray(data.payments)) return data.payments
    return []
  },
}

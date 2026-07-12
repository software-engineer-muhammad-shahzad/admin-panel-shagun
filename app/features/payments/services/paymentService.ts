import apiClient from "@/app/services/apiClient"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, GreetingCard, PaymentConfig } from "../types/payment"

export const paymentService = {
  addGift: async (images: File[]): Promise<void> => {
    const formData = new FormData()
    images.forEach((file) => formData.append("images", file))
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
}

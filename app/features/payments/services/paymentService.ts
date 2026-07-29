import apiClient from "@/app/services/apiClient"
import endpoints from "@/app/services/endpoint"
import {  PaymentConfig, PricingUpdateRequest, Transaction, TransactionListParams } from "../types/payment"
import { ApiResponse } from "../../auth/types/auth"

const buildPricingFormData = (payload: PricingUpdateRequest) => {
  const formData = new FormData()

  formData.append("Id", String(payload.id))
  formData.append("CardPrice", String(payload.cardPrice))
  formData.append("VideoPrice", String(payload.videoPrice))
  formData.append("PlatformFeePercent", String(payload.platformFeePercent))

  // Only send GiftCards entries that include ImageFile — backend marks ImageFile as required
  const cardsWithFiles = payload.giftCards?.filter((card) => card.imageFile) ?? []
  cardsWithFiles.forEach((card, index) => {
    formData.append(`GiftCards[${index}].Id`, String(card.id ?? 0))
    if (card.orderNo != null) {
      formData.append(`GiftCards[${index}].OrderNo`, String(card.orderNo))
    }
    formData.append(`GiftCards[${index}].ImageFile`, card.imageFile!)
  })

  return formData
}

export const paymentService = {
  /** Create new pricing (POST) */
  createPricing: async (payload: PricingUpdateRequest): Promise<void> => {
    const formData = buildPricingFormData(payload)
    await apiClient.post(endpoints.payments.updatePricing, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  /** Update existing pricing (PUT) */
  updatePricing: async (payload: PricingUpdateRequest): Promise<void> => {
    const formData = buildPricingFormData(payload)
    await apiClient.put(endpoints.payments.updatePricing, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  getPaymentConfig: async (): Promise<PaymentConfig> => {
    const response = await apiClient.get<ApiResponse<PaymentConfig>>(
      endpoints.payments.showGift
    )
    const body = response.data
    return (body?.data ?? body) as PaymentConfig
  },

  getTransactions: async (params: Omit<TransactionListParams, "isIncludeGuestUser" | "isIncludeCoupleUser" | "isIncludePayment">): Promise<{ items: Transaction[]; totalOverall: number }> => {
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
    if (data?.items && Array.isArray(data.items)) {
      return { items: data.items, totalOverall: data.totalOverall ?? data.items.length }
    }
    if (Array.isArray(data)) {
      return { items: data, totalOverall: data.length }
    }
    return { items: [], totalOverall: 0 }
  },
}

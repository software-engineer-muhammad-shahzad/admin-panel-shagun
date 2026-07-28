import { useMutation } from "@tanstack/react-query"
import { paymentService } from "../services/paymentService"
import { PricingUpdateRequest } from "../types/payment"
import { showToast } from "@/app/lib/toast"

interface SavePricingPayload extends PricingUpdateRequest {
  isUpdate: boolean
}

export const useUpdatePricing = () => {
  return useMutation({
    mutationFn: ({ isUpdate, ...payload }: SavePricingPayload) =>
      isUpdate
        ? paymentService.updatePricing(payload)
        : paymentService.createPricing(payload),
    onSuccess: (_data, variables) => {
      showToast.success(
        variables.isUpdate ? "Pricing updated" : "Pricing created",
        "Payment configuration saved successfully."
      )
    },
    onError: () => {
      showToast.error("Save failed", "Something went wrong. Please try again.")
    },
  })
}

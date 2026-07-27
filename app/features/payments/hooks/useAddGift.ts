import { useMutation } from "@tanstack/react-query"
import { paymentService } from "../services/paymentService"
import { showToast } from "@/app/lib/toast"

interface AddGiftPayload {
  images: File[]
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
}

export const useAddGift = () => {
  return useMutation({
    mutationFn: ({ images, cardPrice, videoPrice, platformFeePercent }: AddGiftPayload) =>
      paymentService.addGift(images, cardPrice, videoPrice, platformFeePercent),
    onSuccess: () => {
      showToast.success("Gift added", "Your images have been uploaded successfully.")
    },
    onError: () => {
      showToast.error("Upload failed", "Something went wrong. Please try again.")
    },
  })
}

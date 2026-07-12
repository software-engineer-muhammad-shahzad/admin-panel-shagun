import { useMutation } from "@tanstack/react-query"
import { paymentService } from "../services/paymentService"
import { showToast } from "@/app/lib/toast"

export const useAddGift = () => {
  return useMutation({
    mutationFn: (images: File[]) => paymentService.addGift(images),
    onSuccess: () => {
      showToast.success("Gift added", "Your images have been uploaded successfully.")
    },
    onError: () => {
      showToast.error("Upload failed", "Something went wrong. Please try again.")
    },
  })
}

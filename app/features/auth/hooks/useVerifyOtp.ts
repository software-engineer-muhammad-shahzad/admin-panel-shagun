import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService"
import { showToast } from "@/app/lib/toast"
import { removeData } from "@/app/utils/storage/storageHelper"
import { FORGOT_PASSWORD_EMAIL_KEY } from "./useForgotPassword"
import { VerifyOtpPayload } from "../types/auth"

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: () => {
      removeData(FORGOT_PASSWORD_EMAIL_KEY, "local")
      showToast.success("OTP verified", "Your identity has been confirmed.")
    },
    onError: () => {
      showToast.error("Invalid OTP", "The code you entered is incorrect or has expired.")
    },
  })
}

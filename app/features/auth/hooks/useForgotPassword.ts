import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService"
import { showToast } from "@/app/lib/toast"
import { saveData } from "@/app/utils/storage/storageHelper"

export const FORGOT_PASSWORD_EMAIL_KEY = "forgotPasswordEmail"
// OTP is valid for 1 minute on the backend — the frontend countdown is derived
// from this timestamp so a page refresh doesn't restart it.
export const OTP_EXPIRES_AT_KEY = "otpExpiresAt"
export const OTP_DURATION_SECONDS = 57

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (_data, email) => {
      saveData(FORGOT_PASSWORD_EMAIL_KEY, email, "local")
      saveData(OTP_EXPIRES_AT_KEY, Date.now() + OTP_DURATION_SECONDS * 1000, "local")
      showToast.success("OTP sent", "Please check your email for the verification code.")
    },
    onError: () => {
      showToast.error("Request failed", "No account found with this email address.")
    },
  })
}

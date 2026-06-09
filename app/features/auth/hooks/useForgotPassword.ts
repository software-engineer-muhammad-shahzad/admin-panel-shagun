import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService"
import { showToast } from "@/app/lib/toast"
import { saveData } from "@/app/utils/storage/storageHelper"

export const FORGOT_PASSWORD_EMAIL_KEY = "forgotPasswordEmail"

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (_data, email) => {
      saveData(FORGOT_PASSWORD_EMAIL_KEY, email, "local")
      showToast.success("OTP sent", "Please check your email for the verification code.")
    },
    onError: () => {
      showToast.error("Request failed", "No account found with this email address.")
    },
  })
}

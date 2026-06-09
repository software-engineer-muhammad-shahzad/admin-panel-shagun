import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, AuthData, SignInPayload, VerifyOtpPayload } from "../types/auth"

export const authService = {
  signIn: async (payload: SignInPayload): Promise<AuthData> => {
    const response = await postRequest<ApiResponse<AuthData>>(
      endpoints.auth.signIn,
      payload,
      { skipAuth: true }
    )
    return response.data
  },

  forgotPassword: async (email: string): Promise<void> => {
    await postRequest(
      endpoints.auth.forgotPassword,
      { email },
      { skipAuth: true }
    )
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<void> => {
    await postRequest(
      endpoints.auth.verifyOtp,
      payload,
      { skipAuth: true }
    )
  },
}

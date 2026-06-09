import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService"
import { saveData } from "@/app/utils/storage/storageHelper"
import { SignInPayload } from "../types/auth"

export const AUTH_KEY = "authData"

export const useSignIn = () => {
  return useMutation({
    mutationFn: (payload: SignInPayload) => authService.signIn(payload),
    onSuccess: (data) => {
      saveData(AUTH_KEY, data, "local")
    },
  })
}

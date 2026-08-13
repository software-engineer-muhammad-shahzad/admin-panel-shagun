import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService"
import { saveData } from "@/app/utils/storage/storageHelper"
import { SignInPayload } from "../types/auth"
import { canAccessAdminPanel, NO_ROLE_ASSIGNED_MESSAGE } from "../canAccessAdminPanel"

export const AUTH_KEY = "authData"

export class NoRoleAssignedError extends Error {
  constructor() {
    super(NO_ROLE_ASSIGNED_MESSAGE)
    this.name = "NoRoleAssignedError"
  }
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (payload: SignInPayload) => {
      const data = await authService.signIn(payload)
      if (!canAccessAdminPanel(data)) {
        throw new NoRoleAssignedError()
      }
      return data
    },
    onSuccess: (data) => {
      saveData(AUTH_KEY, data, "local")
    },
  })
}

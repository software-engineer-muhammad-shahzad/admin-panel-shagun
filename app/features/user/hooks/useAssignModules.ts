import { useMutation } from "@tanstack/react-query"
import { adminUserRepository } from "../repositories/adminUserRepository"
import { AssignModulesPayload } from "../types/adminUser"

export const useAssignModules = () => {
  return useMutation({
    mutationFn: ({ userId, payload }: { userId: number; payload: AssignModulesPayload }) =>
      adminUserRepository.assignModules(userId, payload),
  })
}

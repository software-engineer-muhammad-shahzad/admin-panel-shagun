import { useQuery } from "@tanstack/react-query"
import { userProfileService } from "../services/userProfileService"
import { getData } from "@/app/utils/storage/storageHelper"
import { AuthData } from "@/app/features/auth/types/auth"

export const useUserProfile = () => {
  const authData = getData<AuthData>("authData", "local")
  const userId = authData?.userId ?? null

  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => userProfileService.getUserProfile(userId!),
    enabled: !!userId,
  })
}

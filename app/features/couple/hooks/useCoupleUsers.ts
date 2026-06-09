import { useQuery } from "@tanstack/react-query"
import { CoupleUsersParams } from "../types/coupleUser"
import { coupleUserQueryKeys, coupleUserRepository } from "../repositories/coupleUserRepository"

export const useCoupleUsers = (params?: CoupleUsersParams) => {
  return useQuery({
    queryKey: coupleUserQueryKeys.couples(params),
    queryFn: () => coupleUserRepository.getCouples(params),
  })
}

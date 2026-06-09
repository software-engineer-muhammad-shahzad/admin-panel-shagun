import { CoupleUsersParams, UpdateCouplePayload } from "../types/coupleUser"
import { coupleUserService } from "../services/coupleUserService"

export const coupleUserQueryKeys = {
  all: ["coupleUsers"] as const,
  couples: (params?: CoupleUsersParams) =>
    [...coupleUserQueryKeys.all, "couples", params] as const,
}

export const coupleUserRepository = {
  getCouples: (params?: CoupleUsersParams) => coupleUserService.getCouples(params),
  deleteCouple: (userId: number) => coupleUserService.deleteCouple(userId),
  updateCouple: (userId: number, payload: UpdateCouplePayload) => coupleUserService.updateCouple(userId, payload),
}

import { deleteRequest, postRequest, putRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, CoupleUser, CoupleUsersParams, PaginatedData, UpdateCouplePayload } from "../types/coupleUser"

export const coupleUserService = {
  getCouples: async (params?: CoupleUsersParams): Promise<PaginatedData<CoupleUser>> => {
    const response = await postRequest<ApiResponse<PaginatedData<CoupleUser>>>(
      endpoints.couple.getCouple,
      params ?? {}
    )
    return response.data
  },

  deleteCouple: async (userId: number): Promise<void> => {
    await deleteRequest(endpoints.couple.deleteCouple(userId))
  },

  updateCouple: async (userId: number, payload: UpdateCouplePayload): Promise<void> => {
    await putRequest(endpoints.couple.updateCouple(userId), payload)
  },
}

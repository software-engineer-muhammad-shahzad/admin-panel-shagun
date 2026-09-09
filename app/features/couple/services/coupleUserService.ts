import { deleteRequest, postRequest, putRequest, withPaging } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, CoupleUser, CoupleUsersParams, PaginatedData, UpdateCouplePayload } from "../types/coupleUser"

export const coupleUserService = {
  getCouples: async (params?: CoupleUsersParams): Promise<PaginatedData<CoupleUser>> => {
    const { body, config } = withPaging(params)
    const response = await postRequest<ApiResponse<PaginatedData<CoupleUser>>>(
      endpoints.couple.getCouple,
      body,
      config
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

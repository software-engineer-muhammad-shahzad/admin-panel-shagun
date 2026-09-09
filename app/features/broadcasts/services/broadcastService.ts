import { postRequest, withPaging } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import {
  ApiResponse,
  BroadcastCouple,
  BroadcastCoupleParams,
  PaginatedData,
} from "../types/broadcastUser"

export const broadcastService = {
  getBroadcastCouples: async (
    params?: BroadcastCoupleParams
  ): Promise<PaginatedData<BroadcastCouple>> => {
    const { body, config } = withPaging(params)
    const response = await postRequest<ApiResponse<PaginatedData<BroadcastCouple>>>(
      endpoints.BroadDast.getCouples,
      body,
      config
    )
    return response.data
  },
}

import { postRequest } from "@/app/services/http"
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
    const response = await postRequest<ApiResponse<PaginatedData<BroadcastCouple>>>(
      endpoints.BroadDast.getCouples,
      params ?? {}
    )
    return response.data
  },
}

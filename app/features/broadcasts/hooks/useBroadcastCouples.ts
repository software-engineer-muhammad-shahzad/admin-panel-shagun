import { useQuery } from "@tanstack/react-query"
import { BroadcastCoupleParams } from "../types/broadcastUser"
import { broadcastQueryKeys, broadcastRepository } from "../repositories/broadcastRepository"

export const useBroadcastCouples = (params?: BroadcastCoupleParams) => {
  return useQuery({
    queryKey: broadcastQueryKeys.couples(params),
    queryFn: () => broadcastRepository.getBroadcastCouples(params),
  })
}

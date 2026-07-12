import { BroadcastCoupleParams } from "../types/broadcastUser"
import { broadcastService } from "../services/broadcastService"

export const broadcastQueryKeys = {
  all: ["broadcasts"] as const,
  couples: (params?: BroadcastCoupleParams) =>
    [...broadcastQueryKeys.all, "couples", params] as const,
}

export const broadcastRepository = {
  getBroadcastCouples: (params?: BroadcastCoupleParams) =>
    broadcastService.getBroadcastCouples(params),
}

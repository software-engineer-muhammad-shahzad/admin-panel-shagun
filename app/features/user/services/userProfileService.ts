import { getRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"

export interface UserProfile {
  displayId: string | null
  profileImageUrl: string | null
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  moduleAccess: string | null
  stripeCustomerId: string | null
  resourceMetadata: {
    createdOn: string
    recordStatus: string
  }
}

interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

export const userProfileService = {
  getUserProfile: async (userId: number): Promise<UserProfile> => {
    const response = await getRequest<ApiResponse<UserProfile>>(
      endpoints.auth.getUserProfile(userId)
    )
    return response.data
  },
}

export interface SignInPayload {
  email: string
  password: string
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface AuthData {
  token: string
  expiresAtUtc: string
  userId: number
  email: string
  username: string
  fullName: string
  partnerName: string
  eventDate: string
  phoneNumber: string
  role: string
  profileImageUrl: string | null
  defaultCurrency: string
}

export interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

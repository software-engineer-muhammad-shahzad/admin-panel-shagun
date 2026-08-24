import { ResourceMetadata } from "../../broadcasts/types/broadcastUser"

export interface GreetingCard {
  id: number
  orderNo: number
  imageUrl?: string | null
  resourceMetadata?: ResourceMetadata
}

export interface PaymentConfig {
  id: number
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  greetingCards: GreetingCard[] | null
  resourceMetadata: ResourceMetadata
}

export interface TransactionResourceMetadata {
  createdOn: string
  createdBy: number
  updatedOn: string | null
  updatedBy: number | null
  deletedOn: string | null
  deletedBy: number | null
  recordStatus: string
}

export interface Transaction {
  id: number
  greetingMediaType: "Image" | "Video" | null
  paymentIntentId: string | null
  platformFee: any
  stripeFee: any
  transferredToCoupleAmount: any
  status: string
  wishingCardAmount: any
  wishingVideoAmount: any
  guestFullName: string
  guestUserId: number
  coupleFullName: string
  coupleUserId: number
  resourceMetadata: TransactionResourceMetadata
}

export interface TransactionListParams {
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  isIncludeGuestUser: true
  isIncludeCoupleUser: true
  isIncludePayment: true
  isIncludePricing?: boolean
}

export interface GiftCardsRequest {
  id?: number
  orderNo?: number
  imageFile?: File | null
}

export interface PricingUpdateRequest {
  id: number
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  giftCards: GiftCardsRequest[] | null
}

export interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

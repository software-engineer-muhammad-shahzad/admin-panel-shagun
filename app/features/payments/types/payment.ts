export interface GreetingCard {
  id: number
  cardImagePath: string
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  greetingMediaType: number
  createdOn: string
  createdBy: number
  updatedOn: string | null
  updatedBy: number | null
  recordStatus: number
}

export interface PaymentConfigMetadata {
  setCommonFlags: boolean
  createdOn: string
  createdBy: number
  updatedOn: string | null
  updatedBy: number | null
  deletedOn: string | null
  deletedBy: number | null
  recordStatus: number
}

export interface PaymentConfig {
  id: number
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  greetingMediaType: number
  greetingCards: GreetingCard[]
  cardUrl: string | null
  metadata: PaymentConfigMetadata
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
  platformFee: number
  stripeFee: number
  status: string
  wishingCardAmount: number
  wishingVideoAmount: number
  guestFullName: string
  guestUserId: number
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

export interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

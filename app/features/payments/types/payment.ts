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

export interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

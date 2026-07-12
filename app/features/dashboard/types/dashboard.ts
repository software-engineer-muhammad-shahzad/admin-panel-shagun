export interface DashboardCard {
  title: string
  value: number
  currency: string | null
  changePercent: number
  changeLabel: string
}

export interface DashboardStats {
  month: number
  year: number
  cards: DashboardCard[]
}

export interface ChartPoint {
  month: number
  label: string
  active: number
  inactive: number
}

export interface TotalUsersChartData {
  year: number
  userRole: string
  points: ChartPoint[]
}

export interface TransactionItem {
  label: string
  amount: number
}

export interface TransactionsOverview {
  month: number
  year: number
  currency: string
  items: TransactionItem[]
}

export interface PaymentPoint {
  day: number
  label: string
  amount: number
}

export interface TotalPaymentsChart {
  month: number
  year: number
  currency: string
  points: PaymentPoint[]
}

export interface ApiResponse<T> {
  statusCode: number
  statusMessage: string
  data: T
}

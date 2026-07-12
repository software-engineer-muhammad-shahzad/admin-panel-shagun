import { getRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { ApiResponse, DashboardStats, TotalUsersChartData, TransactionsOverview, TotalPaymentsChart } from "../types/dashboard"

export const dashboardService = {
  getCardsDetails: async (month: number, year: number): Promise<DashboardStats> => {
    const response = await getRequest<ApiResponse<DashboardStats>>(
      `${endpoints.dashboard.getCardsDetails}?month=${month}&year=${year}`
    )
    return response.data
  },

  getTotalUsersChart: async (usersRole: number, year: number): Promise<TotalUsersChartData> => {
    const response = await getRequest<ApiResponse<TotalUsersChartData>>(
      `${endpoints.dashboard.getTotalUsersChartsDetails}?usersRole=${usersRole}&year=${year}`
    )
    return response.data
  },

  getTransactionsOverview: async (month: number, year: number): Promise<TransactionsOverview> => {
    const response = await getRequest<ApiResponse<TransactionsOverview>>(
      `${endpoints.dashboard.getTotalTransactionsOverview}?month=${month}&year=${year}`
    )
    return response.data
  },

  getTotalPaymentsChart: async (month: number, year: number): Promise<TotalPaymentsChart> => {
    const response = await getRequest<ApiResponse<TotalPaymentsChart>>(
      `${endpoints.dashboard.getTotalPaymentCharts}?month=${month}&year=${year}`
    )
    return response.data
  },
}

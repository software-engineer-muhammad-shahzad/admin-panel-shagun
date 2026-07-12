"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { donutChartOptions } from "../data/ChartsMockData"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { useTransactionsOverview } from "./hooks/useTransactionsOverview"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ALL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const ITEM_COLORS = ["#5FDA78", "#CC9B00", "#EF5930", "#6366F1"]

const DonutChart = () => {
  const currentMonth = new Date().getMonth() + 1
  const pastMonths = ALL_MONTHS.slice(0, currentMonth)

  const [selectedMonth, setSelectedMonth] = useState(ALL_MONTHS[currentMonth - 1])
  const selectedMonthIndex = ALL_MONTHS.indexOf(selectedMonth) + 1

  const { data, isLoading } = useTransactionsOverview(selectedMonthIndex)

  const items = data?.items ?? []
  const currency = data?.currency ?? "GBP"

  const series = items.map((i) => i.amount)
  const labels = items.map((i) => i.label)

  const options = {
    ...donutChartOptions,
    labels,
    colors: ITEM_COLORS,
    tooltip: {
      y: { formatter: (val: number) => `${currency} ${val.toFixed(2)}` },
    },
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <p className="text-white text-sm sm:text-md font-medium">Transactions Overview</p>
        <Dropdown
          options={pastMonths}
          value={selectedMonth}
          onChange={(month) => setSelectedMonth(month)}
          placeholder={ALL_MONTHS[currentMonth - 1]}
          triggerClassName="max-w-[105px]! hover:bg-transparent!"
          containerClassName="w-full flex justify-end xs:w-auto mt-4 sm:mt-0"
        />
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#CFC3E6] text-sm">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col h-full sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <div className="flex justify-center sm:justify-start">
            <Chart
              options={options}
              series={series.length ? series : [1]}
              type="donut"
              width={180}
            />
          </div>
          <div className="flex flex-col justify-between gap-3 sm:gap-5 w-full sm:w-auto">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0"
                    style={{ backgroundColor: ITEM_COLORS[index] ?? "#CFC3E6" }}
                  />
                  <p className="text-white text-xs">{item.label}</p>
                </div>
                <p className="text-white font-medium text-xs">
                  £ {item.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DonutChart

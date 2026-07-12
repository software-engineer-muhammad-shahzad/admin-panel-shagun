"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { lollipopChartOptions } from "../data/MockData"
import Input from "@/app/shared/components/elements/Input"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { useTotalPaymentsChart } from "./hooks/useTotalPaymentsChart"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ALL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const LollipopBarChart = () => {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const pastMonths = ALL_MONTHS.slice(0, currentMonth)

  const [selectedMonth, setSelectedMonth] = useState(ALL_MONTHS[currentMonth - 1])
  const selectedMonthIndex = ALL_MONTHS.indexOf(selectedMonth) + 1

  const { data, isLoading } = useTotalPaymentsChart(selectedMonthIndex)

  // For the current month, only show days up to today
  const points = (data?.points ?? []).filter((p) =>
    selectedMonthIndex < currentMonth ? true : p.day <= currentDay
  )

  const categories = points.map((p) => p.label)
  const amounts = points.map((p) => p.amount)
  const currency = data?.currency ?? "GBP"

  const options = {
    ...lollipopChartOptions,
    xaxis: {
      ...lollipopChartOptions.xaxis,
      categories,
    },
    yaxis: {
      labels: {
        style: { colors: "#CFC3E6" },
        formatter: (val: number) => `£${val.toFixed(0)}`,
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${currency} ${val.toFixed(2)}` },
    },
  }

  const series = [{ name: "Amount", data: amounts }]

  return (
    <div className="w-full p-4 mt-8 bg-[#391F68] rounded-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
        <h2 className="text-white text-xs sm:text-sm font-medium">Total Payments</h2>
        <div className="flex flex-row gap-1 sm:gap-2 items-center w-full sm:w-auto">
          <Input
            type="date"
            placeholder="Select Date"
            className="border text-xs sm:text-sm rounded-2xl sm:rounded-3xl px-1 sm:px-3 py-1 outline-none text-white border-[#5FDA78] w-full max-w-[150px] xs:w-auto"
            containerClassName="border-none!"
          />
          <Dropdown
            options={pastMonths}
            value={selectedMonth}
            onChange={(month) => setSelectedMonth(month)}
            placeholder={ALL_MONTHS[currentMonth - 1]}
            triggerClassName="max-w-[105px]! hover:bg-transparent!"
            containerClassName="w-full flex justify-end xs:w-auto"
          />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="min-w-[600px] sm:min-w-full">
          {isLoading ? (
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-[#CFC3E6] text-sm">Loading...</p>
            </div>
          ) : (
            <Chart options={options} series={series} type="line" height={200} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LollipopBarChart

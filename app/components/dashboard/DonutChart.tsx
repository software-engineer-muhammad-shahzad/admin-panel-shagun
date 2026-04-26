"use client"

import { useState } from "react"
import ApexCharts from "apexcharts"

import dynamic from "next/dynamic"

import Dropdown from "../elements/Dropdown"
import { donutChartMonths, donutChartData, donutChartOptions, donutChartSeries } from "../data/ChartsMockData"

// Fix SSR issue in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const DonutChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const months = donutChartMonths;
  const chartData = donutChartData;
  const options = donutChartOptions;
  const series = donutChartSeries;

  return (
    <div className="flex flex-col justify-between h-full">
      {/* dropdown Month */}
      <div className="flex flex-col sm:flex-row justify-between   items-start sm:items-center mb-6 sm:mb-8">
        <p className="text-white text-sm sm:text-md font-medium ">Transactions Overview</p>
        {/* dropdown */}
        <Dropdown
          options={months}
          value={selectedMonth}
          onChange={(month) => setSelectedMonth(month)}
          placeholder="March"
          triggerClassName="max-w-[105px]! hover:bg-transparent!"
          containerClassName="w-full  flex justify-end xs:w-auto   mt-4 sm:mt-0"
        />
      </div>
      {/* chart */}
      <div className="flex flex-col  h-full sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6">
        <div className="flex justify-center sm:justify-start">
          <Chart
            options={options}
            series={series}
            type="donut"
            width={180}
          />
        </div>
        {/* amount */}
        <div className="flex flex-col justify-between gap-3 sm:gap-5 w-full sm:w-auto">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <p className="text-white text-xs sm:text-xs">{item.label}</p>
              </div>
              <p className="text-white font-medium text-xs sm:text-xs">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DonutChart
"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import Dropdown from "../elements/Dropdown"
import { dashLineChartActiveSeries, dashLineChartOptions, dashLineChartMonths } from "../data/ChartsMockData"

// Fix SSR issue in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const DashLineChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("March")


  const months = dashLineChartMonths;
  const series = dashLineChartActiveSeries;
  const options = dashLineChartOptions;

  return (

    <div className="flex flex-col ">
      <div className="flex justify-between items-center mb-8">
        <p className="text-white text-md font-medium">Transactions Overview</p>
        {/* dropdown */}
        <Dropdown
          options={months}
          value={selectedMonth}
          onChange={(month) => setSelectedMonth(month)}
          placeholder="March"
          triggerClassName="max-w-[105px]!  hover:bg-transparent!"
          containerClassName="w-full  flex justify-end xs:w-auto"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center  justify-end gap-6 mb-4">
          {/* Active */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#5FDA78]"></span>
            <p className="text-white text-sm">Active</p>
          </div>

          {/* Inactive */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FFCC00]"></span>
            <p className="text-white text-sm">Inactive</p>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="min-w-[600px] sm:min-w-full">
            <Chart options={options} series={series} type="line" height={200} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashLineChart
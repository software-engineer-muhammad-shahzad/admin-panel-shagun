"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { dashLineChartOptions } from "../data/ChartsMockData"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { useTotalUsersChart } from "./hooks/useTotalUsersChart"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ROLE_OPTIONS = [
  { label: "Couple", value: "1" },
  { label: "Admin", value: "2" },
]

const DashLineChart = () => {
  const [selectedRole, setSelectedRole] = useState("1")

  const currentMonth = new Date().getMonth() + 1

  const { data, isLoading } = useTotalUsersChart(Number(selectedRole))

  // Only show months up to the current month
  const points = (data?.points ?? []).filter((p) => p.month <= currentMonth)

  const categories = points.map((p) => p.label)
  const activeSeries = points.map((p) => p.active)
  const inactiveSeries = points.map((p) => p.inactive)

  const series = [
    { name: "Active", data: activeSeries },
    { name: "Inactive", data: inactiveSeries },
  ]

  const options = {
    ...dashLineChartOptions,
    xaxis: {
      ...dashLineChartOptions.xaxis,
      categories,
    },
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <p className="text-white text-md font-medium text-nowrap">Total Users</p>
        <Dropdown
          options={ROLE_OPTIONS.map((r) => r.label)}
          value={ROLE_OPTIONS.find((r) => r.value === selectedRole)?.label ?? "Couple"}
          onChange={(label) => {
            const role = ROLE_OPTIONS.find((r) => r.label === label)
            if (role) setSelectedRole(role.value)
          }}
          placeholder="Couple"
          triggerClassName="max-w-[105px]! hover:bg-transparent!"
          containerClassName="w-full flex justify-end xs:w-auto"
        />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-end gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#5FDA78]"></span>
            <p className="text-white font-poppins text-sm">Active</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FFCC00]"></span>
            <p className="text-white font-poppins text-sm">Inactive</p>
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
    </div>
  )
}

export default DashLineChart

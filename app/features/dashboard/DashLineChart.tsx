"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { dashLineChartOptions } from "../data/ChartsMockData"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { useTotalUsersChart } from "./hooks/useTotalUsersChart"
import { getData } from "@/app/utils/storage/storageHelper"
import { AuthData } from "@/app/features/auth/types/auth"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ROLE_OPTIONS = ["Admin", "Couple"]

const DashLineChart = () => {
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0])

  const currentMonth = new Date().getMonth() + 1

  const { data, isLoading } = useTotalUsersChart(selectedRole)

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
          options={ROLE_OPTIONS}
          value={selectedRole}
          onChange={(role) => setSelectedRole(role)}
          placeholder={selectedRole}
          triggerClassName="hover:bg-transparent! px-4!"
          containerClassName="w-[130px] shrink-0"
          dropdownClassName="max-h-[140px]!"
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

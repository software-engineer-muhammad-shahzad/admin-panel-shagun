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

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const parseDayFromLabel = (label?: string) => {
  const text = String(label ?? "").trim()
  const iso = text.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (iso) return Number(iso[3])

  const startsWithDay = text.match(/^(\d{1,2})\b/)
  if (startsWithDay) {
    const day = Number(startsWithDay[1])
    if (day >= 1 && day <= 31) return day
  }

  return null
}

const DashLineChart = () => {
  const [selectedRole, setSelectedRole] = useState(ROLE_OPTIONS[0])

  const now = new Date()
  const today = now.getDate()
  const currentMonth = now.getMonth() + 1
  const monthShort = MONTH_SHORT[now.getMonth()]

  const { data, isLoading } = useTotalUsersChart(selectedRole)

  const points = data?.points ?? []
  const uniqueMonths = new Set(points.map((point) => point.month))
  const isMonthlySeries =
    points.length > 0 &&
    points.length <= 12 &&
    uniqueMonths.size === points.length &&
    points.every((point) => point.day == null)

  const pointsByDay = new Map<number, { active: number; inactive: number }>()
  for (const [index, point] of points.entries()) {
    const fromLabel = parseDayFromLabel(point.label)
    const day = isMonthlySeries
      ? (point.month === currentMonth ? today : null)
      : (point.day ?? fromLabel ?? index + 1)

    if (day != null && day >= 1 && day <= today) {
      pointsByDay.set(day, { active: point.active, inactive: point.inactive })
    }
  }

  const categories = Array.from({ length: today }, (_, i) => `${i + 1} ${monthShort}`)
  const activeSeries: number[] = []
  const inactiveSeries: number[] = []
  let runningActive = 0
  let runningInactive = 0
  for (let day = 1; day <= today; day++) {
    const point = pointsByDay.get(day)
    if (point) {
      runningActive = point.active
      runningInactive = point.inactive
    }
    activeSeries.push(runningActive)
    inactiveSeries.push(runningInactive)
  }

  const series = [
    { name: "Active", data: activeSeries },
    { name: "Inactive", data: inactiveSeries },
  ]

  const yMax = Math.max(5, Math.ceil(Math.max(0, ...activeSeries, ...inactiveSeries) / 5) * 5)

  const options = {
    ...dashLineChartOptions,
    stroke: {
      ...dashLineChartOptions.stroke,
      curve: "stepline" as const,
    },
    xaxis: {
      ...dashLineChartOptions.xaxis,
      categories,
      labels: {
        ...dashLineChartOptions.xaxis.labels,
        rotate: -45,
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      ...dashLineChartOptions.yaxis,
      min: 0,
      max: yMax,
      tickAmount: yMax / 5,
      stepSize: 5,
      forceNiceScale: false,
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

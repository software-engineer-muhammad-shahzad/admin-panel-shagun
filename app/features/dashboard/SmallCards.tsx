"use client"

import Image from "next/image"
import { useDashboardStats } from "./hooks/useDashboardStats"

const CARD_META: Record<string, { icon: string; color: string }> = {
  "Total Couple Accounts": {
    icon: "/images/dashboard/user-profile.svg",
    color: "#5FDA784D",
  },
  "Total Admin Accounts": {
    icon: "/images/dashboard/user-admin.svg",
    color: "#5FDA784D",
  },
  "Active Couple Accounts": {
    icon: "/images/dashboard/active-couple.svg",
    color: "#5FDA784D",
  },
  "Active Admin Accounts": {
    icon: "/images/dashboard/active-admin.svg",
    color: "#5FDA784D",
  },
}

const FALLBACK_ICONS = [
  "/images/dashboard/user-profile.svg",
  "/images/dashboard/user-admin.svg",
  "/images/dashboard/active-couple.svg",
  "/images/dashboard/active-admin.svg",
]

const SmallCards = () => {
  const { data, isLoading } = useDashboardStats()

  const cards = data?.cards ?? []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col glass-border gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl sm:rounded-3xl animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-6 bg-white/10 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const meta = CARD_META[card.title] ?? {
          icon: FALLBACK_ICONS[index] ?? FALLBACK_ICONS[0],
          color: "#5FDA784D",
        }
        const isPositive = card.changePercent >= 0

        return (
          <div key={index} className="flex flex-col glass-border gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl sm:rounded-3xl">
            <div className="flex gap-2 sm:gap-3 items-center">
              <div
                className="w-[28px] h-[28px] sm:w-[34px] sm:h-[34px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: meta.color }}
              >
                <Image src={meta.icon} alt={card.title} width={17} height={17} />
              </div>
              <p className="text-white text-xs sm:text-xs">{card.title}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl">{card.value}</h2>
              <p className={`text-xs sm:text-sm ${isPositive ? "text-green-text" : "text-red-400"}`}>
                {isPositive ? "+" : ""}{card.changePercent}%
                <span className="text-white ms-1">{card.changeLabel}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SmallCards

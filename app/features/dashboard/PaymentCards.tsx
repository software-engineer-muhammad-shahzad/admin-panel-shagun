"use client"

import Image from "next/image"
import { usePaymentCards } from "./hooks/usePaymentCards"

const CARD_ICONS: Record<string, string> = {
  "Stripe Deduction": "/images/dashboard/stripe-deduction.png",
}

const FALLBACK_ICONS = [
  "/images/dashboard/credit-card.png",
  "/images/dashboard/credit-card.png",
  "/images/dashboard/active-couple.svg",
  "/images/dashboard/active-admin.svg",
]

const PaymentCards = () => {
  const { data, isLoading } = usePaymentCards()

  const cards = data?.cards ?? []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col glass-border gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl sm:rounded-3xl animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-6 bg-white/10 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!cards.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {cards.map((card, index) => {
        const isPositive = card.changePercent >= 0
        const icon = CARD_ICONS[card.title] ?? FALLBACK_ICONS[index] ?? FALLBACK_ICONS[0]

        return (
          <div key={index} className="flex flex-col glass-border gap-4 sm:gap-6 3xl:gap-8 p-3 sm:p-4 3xl:p-6 rounded-2xl sm:rounded-3xl">
            <div className="flex gap-2 sm:gap-3 3xl:gap-4 items-center">
              <div className="w-[28px] h-[28px] sm:w-[34px] sm:h-[34px] 3xl:w-[48px] 3xl:h-[48px] rounded-full flex items-center justify-center bg-[#5FDA784D] shrink-0">
                <Image src={icon} alt={card.title} width={17} height={17} />
              </div>
              <p className="text-white text-xs sm:text-xs 3xl:text-lg 4xl:text-xl hidden 2xl:inline">{card.title}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl 3xl:text-3xl 4xl:text-5xl">
                {card.value}£
              </h2>
              <p className={`text-xs sm:text-sm 3xl:text-base 4xl:text-lg ${isPositive ? "text-green-text" : "text-red-400"}`}>
                {isPositive ? "+" : ""}{card.changePercent}%
                <span className="text-white ms-1 hidden 2xl:inline">{card.changeLabel}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PaymentCards

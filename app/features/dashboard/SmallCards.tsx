import Image from "next/image"
import { dashboardCards } from "../data/MockData"


const SmallCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardCards.map((card) => (
                <div key={card.id} className="flex flex-col glass-border gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl sm:rounded-3xl">
                    <div className="flex gap-2 sm:gap-3 items-center">
                        <div className="w-[28px] h-[28px] sm:w-[34px] sm:h-[34px] rounded-full flex items-center justify-center" style={{ backgroundColor: card.color }}>
                            <Image src={card.icon} alt={card.title} width={17} height={17} />
                        </div>
                        <p className="text-white text-xs sm:text-xs">{card.title}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-white text-lg sm:text-xl lg:text-2xl">{card.value}</h2>
                        {card.percentage && (
                            <p className="text-green-text text-xs sm:text-sm">
                                +{card.percentage}%<span className="text-white text-xs sm:text-sm ms-1">{card.percentageText}</span>
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SmallCards
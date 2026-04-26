import DonutChart from "./DonutChart"
import DashLineChart from "./DashLineChart"


const CompositeChart = () => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <div className="border bg-[#391F68] rounded-2xl lg:rounded-3xl p-3 lg:p-4 glass-border">
        <DonutChart />
      </div>
      <div className="border bg-[#391F68] rounded-2xl lg:rounded-3xl p-3 lg:p-4 glass-border">
        <DashLineChart />
      </div>
    </div>
  )
}

export default CompositeChart
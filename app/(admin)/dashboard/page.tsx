import CompositeChart from "@/app/features/dashboard/CompositeChart"
import LollipopChart from "@/app/features/dashboard/LollipopChart"
import SmallCards from "@/app/features/dashboard/SmallCards"

const page = () => {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4">
      <SmallCards />
      <CompositeChart />
      <LollipopChart />
    </div>
  )
}

export default page
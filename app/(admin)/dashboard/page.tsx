import CompositeChart from "@/app/components/dashboard/CompositeChart"
import LollipopChart from "@/app/components/dashboard/LollipopChart"
import SmallCards from "@/app/components/dashboard/SmallCards"

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
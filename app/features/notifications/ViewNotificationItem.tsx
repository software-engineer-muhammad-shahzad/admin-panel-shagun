import { MoveLeft, X } from "lucide-react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { NotificationItem } from "./types/notificationList"

interface ViewNotificationItemProps {
  onClose: () => void
  data: NotificationItem | null
}

const inputClass = "text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
const containerClass = "border-none bg-transparent"

const ViewNotificationItem = ({ onClose, data }: ViewNotificationItemProps) => {
  if (!data) return null

  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="80%"
      modalHeight="80vh"
      className="glass-card border border-[#5FDA78] p-4 md:p-6 overflow-y-auto scrollbar-hide"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <MoveLeft className="text-white" />
          <h2 className="text-white text-xl font-semibold">Notification Details</h2>
        </div>
        <Button
          onClick={onClose}
          className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
        >
          <X size={20} className="group-hover:text-white" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="w-full">
          <Input
            type="text"
            label="Full Name"
            labelColor="ms-5 mb-1"
            value={data.adminFullName ?? "N/A"}
            disabled
            className={inputClass}
            containerClassName={containerClass}
          />
        </div>

        <div className="w-full">
          <Input
            type="text"
            label="Sent At"
            labelColor="ms-5 mb-1"
            value={data.resourceMetadata.createdOn ? new Date(data.resourceMetadata.createdOn).toLocaleString() : "N/A"}
            disabled
            className={inputClass}
            containerClassName={containerClass}
          />
        </div>

        <div className="w-full md:col-span-2">
          <Input
            type="text"
            label="Subject"
            labelColor="ms-5 mb-1"
            value={data.subject ?? "N/A"}
            disabled
            className={inputClass}
            containerClassName={containerClass}
          />
        </div>

        <div className="w-full md:col-span-2">
          <Input
            type="text"
            label="Message"
            labelColor="ms-5 mb-1"
            value={data.message ?? "N/A"}
            disabled
            className={inputClass}
            containerClassName={containerClass}
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={onClose}
          className="bg-[#5FDA78] text-[#360567] max-w-[120px]! font-semibold px-8! py-2! hover:bg-[#4FB860]"
        >
          Close
        </Button>
      </div>
    </ModalLayer>
  )
}

export default ViewNotificationItem

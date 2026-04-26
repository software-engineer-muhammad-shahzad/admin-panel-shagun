"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Button from "@/app/components/elements/Button"
import Input from "@/app/components/elements/Input"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import SuccessModal from "@/app/components/ui/modal/SuccessModal"

interface NotificationModalProps {
  onClose: () => void
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  return (
    <>
      <ModalLayer
        onClose={onClose}
        modalWidth="80%"
        modalHeight="80vh"
        className="glass-card border border-[#5FDA78] p-4 sm:p-6"
        overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
        position="center"
      >
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-white text-xl font-semibold">Create Notification</h2>
          <Button
            onClick={onClose}
            className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
          >
            <X size={20} className="group-hover:text-white" />
          </Button>
        </div>

        <div className="flex flex-col gap-2 h-full overflow-auto scrollbar-hide sm:overflow-visible">
          {/* Couple ID and Title in same row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Couple ID Input */}
            <div className="flex-1">
              <Input
                type="text"
                label="Couple ID"
                placeholder="Enter couple ID"
                className="text-sm outline-0 px-5 py-4 w-full! border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                containerClassName="border-none bg-transparent"
              />
            </div>

            {/* Title Input */}
            <div className="flex-1">
              <Input
                type="text"
                label="Subject"
                placeholder="Enter notification title"
                className="text-sm outline-0 px-5 py-4 w-full! border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                containerClassName="border-none bg-transparent"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="px-5">
            <label className="text-white text-sm font-medium mb-2 block ms-5">Message</label>
            <textarea
              placeholder="Type your message here..."
              className="w-full px-6 py-5 border border-[#5FDA78] rounded-[70px] glass-card bg-transparent  placeholder:text-light-text text-light-text outline-none resize-none text-sm  md:text-md md:min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={onClose}
              className="border border-[#C9C9C9] font-semibold w-fit! px-12! py-2! bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsSuccessModalOpen(true)
              }}
              className="text-[#360567] font-semibold w-fit! px-12! py-2! hover:bg-[#4FB860]"
            >
              Add
            </Button>
          </div>
        </div>
      </ModalLayer>
      
      {/* Success Modal */}
      {isSuccessModalOpen && (
        <SuccessModal
          onClose={() => {
            setIsSuccessModalOpen(false)
            onClose()
          }}
          title="Successful"
          message="Your message has been sent successfully."
          buttonText="Close"
          // showIcon={true}
        />
      )}
    </>
  )
}

export default NotificationModal

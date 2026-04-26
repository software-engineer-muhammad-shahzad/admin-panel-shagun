"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Button from "@/app/components/elements/Button"
import Input from "@/app/components/elements/Input"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import SuccessModal from "@/app/components/ui/modal/SuccessModal"

interface AddNewAnnouncementProps {
  onClose: () => void
}

const AddNewAnnouncement = ({ onClose }: AddNewAnnouncementProps) => {
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">Create Announcement</h2>
          <Button
            onClick={onClose}
            className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
          >
            <X size={20} className="group-hover:text-white" />
          </Button>
        </div>

        <div className="flex py-2 flex-col gap-2 max-h-[60vh] overflow-y-auto scrollbar-hide sm:overflow-y-visible">
          {/* Title Input */}
          <div >
            <Input
              type="text"
              label="Subject"
              paddingClass="px-0! md:px-5"
              placeholder="Enter announcement title"
              className="text-sm outline-0 px-5 py-4 w-full! border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
              containerClassName="border-none bg-transparent"
            />
          </div>

          {/* Message Textarea */}
          <div className= "px-0 md:px-5">
            <label className="text-white text-sm font-medium mb-2 block ms-5">Message</label>
            <textarea
              placeholder="Type your message here..."
               
              className="w-full  px-6 py-5 border border-[#5FDA78] rounded-[70px] glass-card bg-transparent text-white placeholder:text-light-text outline-none resize-none   text-sm md:text-md  min-h-[80px] md:min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={onClose}
              className="border border-[#C9C9C9] w-full max-w-[100px]! md:w-fit! font-semibold  px-12! py-2! bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsSuccessModalOpen(true)
              }}
              className="text-[#360567] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! hover:bg-[#4FB860]"
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
          title="Confirmation"
          message="Are you sure you want to send this announcement to all couples account?"
          buttonText="Publish"
          secondaryButtonText="Cancel"
          onSecondaryButtonClick={() => setIsSuccessModalOpen(false)}
        />
      )}
    </>
  )
}

export default AddNewAnnouncement
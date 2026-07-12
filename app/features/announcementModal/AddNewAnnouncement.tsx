"use client"

import { useState } from "react"
import { X } from "lucide-react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import Button from "@/app/shared/components/elements/Button"
import { useCreateAnnouncement } from "@/app/features/broadcasts/hooks/useCreateAnnouncement"

interface AddNewAnnouncementProps {
  onClose: () => void
}

const AddNewAnnouncement = ({ onClose }: AddNewAnnouncementProps) => {
  const [content, setContent] = useState("")
  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement()

  const handleAdd = () => {
    createAnnouncement(content, {
      onSuccess: () => onClose(),
    })
  }

  return (
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

        {/* Message Textarea */}
        <div className="px-0 md:px-5">
          <label className="text-white text-sm font-medium mb-2 block ms-5">Message</label>
          <textarea
            placeholder="Type your message here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-6 py-5 border border-[#5FDA78] rounded-[70px] glass-card bg-transparent text-white placeholder:text-light-text outline-none resize-none text-sm md:text-md min-h-[80px] md:min-h-[100px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={onClose}
            className="border border-[#C9C9C9] w-full max-w-[100px]! md:w-fit! font-semibold px-12! py-2! bg-transparent text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!content.trim() || isPending}
            className="text-[#360567] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! hover:bg-[#4FB860] disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Add"}
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default AddNewAnnouncement

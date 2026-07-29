"use client"

import { useState } from "react"
import { MoveLeft, X } from "lucide-react"
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
    if (!content.trim()) return
    createAnnouncement(content.trim(), {
      onSuccess: () => onClose(),
    })
  }

  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="min(95%, 480px)"
      modalHeight="auto"
      className="glass-card border border-[#5FDA78] p-4 sm:p-5 overflow-y-auto scrollbar-hide"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <MoveLeft className="text-white" size={18} />
          <h2 className="text-white text-lg font-semibold">Create Announcement</h2>
        </div>
        <Button
          onClick={onClose}
          className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
        >
          <X size={20} className="group-hover:text-white" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full text-left">
          <label className="text-white text-sm font-medium mb-2 block text-left">Message</label>
          <textarea
            placeholder="Type your announcement here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-5 py-5 border border-[#5FDA78] rounded-[24px] glass-card bg-transparent text-white placeholder:text-light-text outline-none resize-none text-sm min-h-[120px] text-left"
          />
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <Button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="border border-[#C9C9C9] font-semibold w-full max-w-[100px]! sm:w-fit! px-12! py-2! bg-transparent text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!content.trim() || isPending}
            className="text-[#360567] font-semibold w-full max-w-[100px]! sm:w-fit! px-12! py-2! hover:bg-[#4FB860] disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Add"}
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default AddNewAnnouncement

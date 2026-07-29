"use client"

import { useEffect, useState } from "react"
import { MoveLeft, X } from "lucide-react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import Button from "@/app/shared/components/elements/Button"
import SearchableDropdown from "@/app/shared/components/elements/SearchableDropdown"
import { useCoupleUsers } from "@/app/features/couple/hooks/useCoupleUsers"
import { useCreateNotification } from "./hooks/useCreateNotification"
import { NotificationPurpose } from "@/app/shared/enums"

interface AddNewNotificationProps {
  onClose: () => void
}

const labelClass = "text-white text-[14px] mb-1 block text-left"
const inputClass =
  "w-full text-sm text-left outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-transparent"
const textareaClass =
  "w-full text-sm text-left px-5 py-4 border border-[#5FDA78] rounded-[24px] glass-card bg-transparent text-white placeholder:text-light-text outline-none resize-none min-h-[120px]"

const AddNewNotification = ({ onClose }: AddNewNotificationProps) => {
  const [coupleSearch, setCoupleSearch] = useState("")
  const [debouncedCoupleSearch, setDebouncedCoupleSearch] = useState("")
  const [selectedCoupleId, setSelectedCoupleId] = useState<number | null>(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const { mutate: createNotification, isPending } = useCreateNotification()

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCoupleSearch(coupleSearch), 400)
    return () => clearTimeout(timer)
  }, [coupleSearch])

  const { data, isLoading } = useCoupleUsers(
    debouncedCoupleSearch ? { search: debouncedCoupleSearch } : undefined
  )

  const coupleOptions = (data?.items ?? []).map((couple) => ({
    label: couple.fullName || couple.email,
    value: couple.userId,
  }))

  const handleAdd = () => {
    if (!selectedCoupleId || !subject.trim() || !message.trim()) return

    createNotification(
      {
        recieverUserId: selectedCoupleId,
        subject: subject.trim(),
        message: message.trim(),
        notificationPurpose: NotificationPurpose.ManualNotification,
      },
      {
        onSuccess: () => onClose(),
      }
    )
  }

  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="min(95%, 720px)"
      modalHeight="auto"
      className="glass-card border border-[#5FDA78] p-4 sm:p-6 overflow-visible!"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <MoveLeft className="text-white" size={18} />
          <h2 className="text-white text-lg font-semibold">Add New</h2>
        </div>
        <Button
          onClick={onClose}
          className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
        >
          <X size={20} className="group-hover:text-white" />
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-full text-left">
        <div className="w-full">
          <label className={labelClass}>Couple</label>
          <SearchableDropdown
            placeholder="Select Couple"
            options={coupleOptions}
            value={selectedCoupleId}
            onChange={(option) => setSelectedCoupleId(Number(option.value))}
            onSearchChange={setCoupleSearch}
            isLoading={isLoading}
          />
        </div>

        <div className="w-full">
          <label className={labelClass}>Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="w-full">
          <label className={labelClass}>Message</label>
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={textareaClass}
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
            disabled={!selectedCoupleId || !subject.trim() || !message.trim() || isPending}
            className="text-[#360567] font-semibold w-full max-w-[100px]! sm:w-fit! px-12! py-2! hover:bg-[#4FB860] disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Add"}
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default AddNewNotification

"use client"

import { useEffect, useState } from "react"
import { MoveLeft, X } from "lucide-react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import SearchableDropdown from "@/app/shared/components/elements/SearchableDropdown"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { useCreateNotification } from "./hooks/useCreateNotification"
import { NotificationPurpose } from "@/app/shared/enums"

interface AddNewNotificationProps {
  onClose: () => void
}

const inputClass =
  "text-sm outline-0 px-5 py-4 w-full! border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-transparent"

const AddNewNotification = ({ onClose }: AddNewNotificationProps) => {
  const [adminSearch, setAdminSearch] = useState("")
  const [debouncedAdminSearch, setDebouncedAdminSearch] = useState("")
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const { mutate: createNotification, isPending } = useCreateNotification()

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedAdminSearch(adminSearch), 400)
    return () => clearTimeout(timer)
  }, [adminSearch])

  const { data, isLoading } = useAdminUsers(
    debouncedAdminSearch ? { search: debouncedAdminSearch } : undefined
  )

  const adminOptions = (data?.items ?? []).map((admin) => ({
    label: admin.fullName || admin.email,
    value: admin.userId,
  }))

  const handleAdd = () => {
    if (!selectedAdminId || !subject.trim() || !message.trim()) return

    createNotification(
      {
        recieverUserId: selectedAdminId,
        subject: subject.trim(),
        message: message.trim(),
        notificationPurpose: NotificationPurpose.ManualNotification
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
      className="glass-card border border-[#5FDA78] p-4 sm:p-6"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <MoveLeft className="text-white" size={18} />
          <h2 className="text-white text-xl font-semibold">Add New</h2>
        </div>
        <Button
          onClick={onClose}
          className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
        >
          <X size={20} className="group-hover:text-white" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchableDropdown
              label="Admin"
              placeholder="Select Couple"
              options={adminOptions}
              value={selectedAdminId}
              onChange={(option) => setSelectedAdminId(Number(option.value))}
              onSearchChange={setAdminSearch}
              isLoading={isLoading}
              labelClassName="ms-5"
            />
          </div>

          <div className="flex-1">
            <Input
              type="text"
              label="Subject"
              labelColor="ms-5 mb-1"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
              containerClassName="border-none bg-transparent"
            />
          </div>
        </div>

        <div className="px-0 sm:px-5">
          <label className="text-white text-sm font-medium mb-2 block ms-5 text-left">Message</label>
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-6 py-5 border border-[#5FDA78] rounded-[24px] glass-card bg-transparent text-white placeholder:text-light-text outline-none resize-none text-sm min-h-[120px]"
          />
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={onClose}
            disabled={isPending}
            className="border border-[#C9C9C9] font-semibold w-full max-w-[100px]! sm:w-fit! px-12! py-2! bg-transparent text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!selectedAdminId || !subject.trim() || !message.trim() || isPending}
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

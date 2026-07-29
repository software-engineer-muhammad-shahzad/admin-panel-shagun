"use client"

import { useState, useRef, useEffect } from "react"
import { MoveLeft, Search, X } from "lucide-react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import SuccessModal from "@/app/shared/components/modal/SuccessModal"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import { useBroadcastCouples } from "@/app/features/broadcasts/hooks/useBroadcastCouples"
import { useCreateNotification } from "./hooks/useCreateNotification"
import { NotificationPurpose } from "@/app/shared/enums"

interface NotificationModalProps {
  onClose: () => void
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const [coupleSearch, setCoupleSearch] = useState("")
  const [coupleDropdownOpen, setCoupleDropdownOpen] = useState(false)
  const [selectedCouple, setSelectedCouple] = useState<{ userId: number; label: string } | null>(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: couplesData } = useBroadcastCouples(
    coupleSearch ? { search: coupleSearch } : undefined
  )
  const couples = couplesData?.items ?? []

  const { mutate: createNotification, isPending } = useCreateNotification()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCoupleDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!selectedCouple) errs.couple = "Please select a couple"
    if (!subject.trim()) errs.subject = "Subject is required"
    if (!message.trim()) errs.message = "Message is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    createNotification(
      { recieverUserId: selectedCouple!.userId, subject, message, notificationPurpose: NotificationPurpose.ManualNotification },
      {
        onSuccess: () => setIsSuccessModalOpen(true),
      }
    )
  }

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
          <div className="flex items-center gap-2">
            <MoveLeft className="text-white" />
            <h2 className="text-white text-xl font-semibold">Add New</h2>
          </div>
          <Button
            onClick={onClose}
            className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
          >
            <X size={20} className="group-hover:text-white" />
          </Button>
        </div>

        <div className="flex flex-col gap-5 overflow-auto scrollbar-hide">
          {/* Couple + Subject row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Couple searchable dropdown */}
            <div className="flex-1" ref={dropdownRef}>
              <label className="text-white text-sm font-medium mb-1 block ms-1">Couple</label>
              <div className="relative">
                <div
                  className="flex items-center gap-2 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card cursor-pointer"
                  onClick={() => setCoupleDropdownOpen(prev => !prev)}
                >
                  <span className={`flex-1 text-sm ${selectedCouple ? "text-white" : "text-light-text"}`}>
                    {selectedCouple ? selectedCouple.label : "Select a couple"}
                  </span>
                  <Search size={16} className="text-[#5FDA78] shrink-0" />
                </div>

                {coupleDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-[#1e0040] border border-[#5FDA78]/40 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-2 border-b border-white/10">
                      <input
                        autoFocus
                        type="text"
                        value={coupleSearch}
                        onChange={e => setCoupleSearch(e.target.value)}
                        placeholder="Search couple..."
                        className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none px-2 py-1"
                      />
                    </div>
                    <ul className="max-h-48 overflow-y-auto scrollbar-hide">
                      {couples.length === 0 ? (
                        <li className="px-4 py-3 text-sm text-white/40">No couples found</li>
                      ) : (
                        couples.map(c => (
                          <li
                            key={c.userId}
                            onClick={() => {
                              setSelectedCouple({
                                userId: c.userId,
                                label: c.partnerName ? `${c.fullName} & ${c.partnerName}` : c.fullName,
                              })
                              setCoupleDropdownOpen(false)
                              setCoupleSearch("")
                              setErrors(prev => ({ ...prev, couple: "" }))
                            }}
                            className="px-4 py-2.5 text-sm text-white hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            {c.partnerName ? `${c.fullName} & ${c.partnerName}` : c.fullName}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {errors.couple && <p className="text-red-400 text-xs mt-1 ms-5">{errors.couple}</p>}
            </div>

            {/* Subject */}
            <div className="flex-1">
              <Input
                type="text"
                label="Subject"
                placeholder="Enter notification subject"
                value={subject}
                onChange={e => { setSubject(e.target.value); setErrors(prev => ({ ...prev, subject: "" })) }}
                className="text-sm outline-0 px-5 py-4 w-full! border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                containerClassName="border-none bg-transparent"
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1 ms-5">{errors.subject}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="px-1">
            <label className="text-white text-sm font-medium mb-2 block ms-1">Message</label>
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={e => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: "" })) }}
              className="w-full px-6 py-5 border border-[#5FDA78] rounded-[30px] glass-card bg-transparent placeholder:text-light-text text-light-text outline-none resize-none text-sm min-h-30"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1 ms-1">{errors.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-2">
            <Button
              onClick={onClose}
              className="border border-[#C9C9C9] font-semibold w-full max-w-30! px-12! py-2! bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="text-[#360567] font-semibold w-full max-w-30! px-12! py-2! hover:bg-[#4FB860] disabled:opacity-50"
            >
              {isPending ? "Sending..." : "Add"}
            </Button>
          </div>
        </div>
      </ModalLayer>

      {isSuccessModalOpen && (
        <SuccessModal
          onClose={() => { setIsSuccessModalOpen(false); onClose() }}
          title="Successful"
          message="Your notification has been sent successfully."
          buttonText="Close"
        />
      )}
    </>
  )
}

export default NotificationModal

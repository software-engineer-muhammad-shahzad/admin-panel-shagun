"use client"

import { useState, useEffect } from "react"

import { useBroadcastCouples } from "@/app/features/broadcasts/hooks/useBroadcastCouples"
import { BroadcastCouple } from "@/app/features/broadcasts/types/broadcastUser"
import ViewNotification from "@/app/features/notifications/ViewNotification"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"

const broadcastColumns = [
  { key: "displayId", label: "ID" },
  { key: "fullName", label: "Full Name" },
  { key: "partnerName", label: "Partner Name" },
  { key: "contactNumber", label: "Contact" },
  { key: "email", label: "Email" },
  {
    key: "resourceMetadata",
    label: "Status",
    render: (value: any) => {
      const status = value?.recordStatus
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${status === 1
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
            }`}
        >
          {status === 1 ? "Active" : "Inactive"}
        </span>
      )
    },
  },
]

const page = () => {
  const [emailInput, setEmailInput] = useState("")
  const [debouncedEmail, setDebouncedEmail] = useState("")
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCouple, setSelectedCouple] = useState<BroadcastCouple | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedEmail(emailInput), 400)
    return () => clearTimeout(timer)
  }, [emailInput])

  const { data, isLoading } = useBroadcastCouples({ search: debouncedEmail || undefined })

  const couples = data?.items ?? []

  return (
    <div className="w-full  flex relative flex-col  h-[calc(100vh-200px)]">
      {/* search - fixed at top */}
      <div className="flex flex-col  lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
        <div className="w-full   lg:max-w-[350px]">
          <Input
            type="text"
            placeholder="Search by email..."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="text-sm outline-0  w-full!  placeholder:text-light-text text-light-text"
            containerClassName="border border-[#C9C9C9] w-full!  rounded-lg glass-border bg-transparent"
          />
        </div>
      </div>

      {/* table - scrollable */}
      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide ">
        <Table
          data={couples}
          columns={broadcastColumns}
          onRowClick={(row) => {
            setSelectedCouple(row as BroadcastCouple)
            setIsViewModalOpen(true)
          }}
          className="rounded-lg"
          emptyMessage={isLoading ? "Loading..." : "No couples found"}
        />
      </div>

      {/* View Notification Modal */}
      {isViewModalOpen && (
        <ViewNotification
          onClose={() => setIsViewModalOpen(false)}
          notificationData={selectedCouple}
        />
      )}
    </div>
  )
}

export default page

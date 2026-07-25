"use client"

import { useState, useEffect } from "react"
import { useNotificationList } from "@/app/features/notifications/hooks/useNotificationList"
import { NotificationItem } from "@/app/features/notifications/types/notificationList"
import ViewNotificationItem from "@/app/features/notifications/ViewNotificationItem"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"

const notificationColumns = [
  {
    key: "id",
    label: "ID",
    width: "80px",
    render: (value: any) => `#${value}`,
  },
  {
    key: "fullName",
    label: "Full Name",
    width: "180px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "email",
    label: "Email",
    width: "200px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "message",
    label: "Message",
    width: "260px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "sentAt",
    label: "Sent At",
    width: "160px",
    render: (value: any) =>
      value ? new Date(value).toLocaleString() : "N/A",
  },
  {
    key: "isRead",
    label: "Status",
    width: "100px",
    render: (value: any) => {
      const color = value ? "#30B052" : "#FF9900"
      return (
        <span className="px-3 py-1 flex items-center w-fit gap-2 rounded glass-border text-xs" style={{ color }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          {value ? "Read" : "Unread"}
        </span>
      )
    },
  },
]

const page = () => {
  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState<NotificationItem | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  const { data, isLoading, isError } = useNotificationList(
    debouncedSearch ? { search: debouncedSearch } : undefined
  )

  const notifications = data?.items ?? []

  return (
    <div className="w-full flex relative flex-col h-[calc(100vh-200px)]">
      <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
        <div className="w-full lg:max-w-[350px]">
          <Input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="text-sm outline-0 w-full! placeholder:text-light-text text-light-text"
            containerClassName="border border-[#C9C9C9] w-full! rounded-lg glass-border bg-transparent"
          />
        </div>
      </div>

      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-white/60 text-sm">
            Loading notifications...
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-full text-red-400 text-sm">
            Failed to load notifications. Please try again.
          </div>
        ) : (
          <Table
            data={notifications}
            columns={notificationColumns}
            onRowClick={(row) => {
              setSelectedItem(row as NotificationItem)
              setViewModalOpen(true)
            }}
            className="rounded-lg"
            emptyMessage="No notifications found"
          />
        )}
      </div>

      {viewModalOpen && (
        <ViewNotificationItem
          onClose={() => setViewModalOpen(false)}
          data={selectedItem}
        />
      )}
    </div>
  )
}

export default page

"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"
import { useNotificationList } from "@/app/features/notifications/hooks/useNotificationList"
import { NotificationItem } from "@/app/features/notifications/types/notificationList"
import ViewNotificationItem from "@/app/features/notifications/ViewNotificationItem"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"

const notificationColumns = [
  {
    key: "adminId",
    label: "Admin ID",
    width: "100px",
    render: (value: any) => value ? `#${value}` : "N/A",
  },
  {
    key: "adminFullName",
    label: "Admin Full Name",
    width: "160px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "coupleId",
    label: "Couple ID",
    width: "100px",
    render: (value: any) => value ? `#${value}` : "N/A",
  },
  {
    key: "fullName",
    label: "Name",
    width: "140px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "sentAt",
    label: "Date",
    width: "140px",
    render: (value: any) =>
      value ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A",
  },
  {
    key: "message",
    label: "Notification Message",
    width: "280px",
    render: (value: any) => value || "N/A",
  },
]

const PAGE_SIZE = 10

const page = () => {
  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState<NotificationItem | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  const offset = (currentPage - 1) * PAGE_SIZE

  const { data, isLoading, isError } = useNotificationList({
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    offset,
    length: PAGE_SIZE,
  })

  const notifications = data?.items ?? []
  const totalOverall = data?.totalOverall ?? 0
  const totalPages = Math.ceil(totalOverall / PAGE_SIZE)

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

      <div className="flex-1 overflow-auto scrollbar-hide">
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
            columns={[
              ...notificationColumns,
              {
                key: "Action",
                label: "Action",
                width: "80px",
                render: (_value: any, row: any) => (
                  <span
                    className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedItem(row as NotificationItem)
                      setViewModalOpen(true)
                    }}
                  >
                    <Eye size={14} />
                  </span>
                ),
              },
            ]}
            onRowClick={(row) => {
              setSelectedItem(row as NotificationItem)
              setViewModalOpen(true)
            }}
            className="rounded-lg"
            emptyMessage="No notifications found"
          />
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center px-4 lg:px-6 py-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-[#5FDA78] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...")
                acc.push(p)
                return acc
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} className="w-8 text-center text-white/30 text-sm">...</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item as number)}
                    className={`w-8 h-8 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                      currentPage === item
                        ? "bg-white text-[#360567]"
                        : "text-[#999999] hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )
            }

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-[#5FDA78] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}

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

"use client"

import { useState, useEffect } from "react"
import { CirclePlus, Eye } from "lucide-react"
import { useGetAnnouncements } from "@/app/features/broadcasts/hooks/useGetAnnouncements"
import { Announcement } from "@/app/features/broadcasts/types/announcement"
import AddNewAnnouncement from "@/app/features/announcementModal/AddNewAnnouncement"
import ViewAnnouncement from "@/app/features/announcementModal/ViewAnnouncement"
import Table from "@/app/shared/components/elements/Table"
import Input from "@/app/shared/components/elements/Input"

const announcementColumns = [
  { key: "id", label: "ID" },
  { key: "content", label: "Message" },
  {
    key: "createdOnUtc",
    label: "Created On",
    render: (value: any) =>
      value ? new Date(value).toLocaleDateString() : "—",
  },
  { key: "createdBy", label: "Created By", render: (value: any) => value ?? "—" },
  { key: "Action", label: "Action" },
]

const PAGE_SIZE = 10

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  const { data: announcements, isLoading, refetch } = useGetAnnouncements()

  useEffect(() => { setCurrentPage(1) }, [searchTerm])

  const filtered = (announcements ?? []).filter((a) =>
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalOverall = filtered.length
  const totalPages = Math.ceil(totalOverall / PAGE_SIZE)
  const offset = (currentPage - 1) * PAGE_SIZE
  const paginated = filtered.slice(offset, offset + PAGE_SIZE)

  return (
    <>
      <div className="w-full  flex relative flex-col  h-[calc(100vh-200px)]">
        {/* search - fixed at top */}
        <div className="flex flex-col font-inter lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
          <div className="w-full   lg:max-w-[350px]">
            <Input
              type="text"
              placeholder="Quick Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm outline-0  w-full!  placeholder:text-light-text text-light-text"
              containerClassName="border border-[#C9C9C9] w-full!  rounded-lg glass-border bg-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center">
            <div
              className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
              onClick={() => setIsModalOpen(true)}
            >
              <CirclePlus size={15} />
              <p className="text-[#360567] text-md font-semibold text-nowrap">Add New</p>
            </div>
          </div>
        </div>

        {/* table - scrollable */}
        <div className="flex-1 overflow-auto scrollbar-hide">
          <Table
            data={paginated}
            columns={announcementColumns.map((col) =>
              col.key === "Action"
                ? {
                    ...col,
                    render: (_value: any, row: any) => (
                      <span
                        className="w-8 h-8 p-1 py-1 flex items-center justify-center border border-white/10 gap-2 rounded-full glass-border text-xs cursor-pointer hover:bg-white/5"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAnnouncement(row as Announcement)
                          setIsViewModalOpen(true)
                        }}
                      >
                        <Eye size={14} />
                      </span>
                    ),
                  }
                : col
            )}
            onRowClick={(row) => {
              setSelectedAnnouncement(row as Announcement)
              setIsViewModalOpen(true)
            }}
            className="rounded-lg"
            emptyMessage={isLoading ? "Loading..." : "No announcements found"}
          />
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-t border-white/10 shrink-0">
            <p className="text-white/40 text-xs font-medium">
              Showing <span className="text-white/70">{offset + 1}–{Math.min(offset + PAGE_SIZE, totalOverall)}</span> of <span className="text-white/70">{totalOverall}</span> results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-white/20 bg-white/10 text-white/70 disabled:opacity-25 hover:bg-[#5FDA78]/20 hover:border-[#5FDA78] hover:text-[#5FDA78] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                ‹ Prev
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
                    <span key={`ellipsis-${idx}`} className="w-8 text-center text-white/30 text-sm">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setCurrentPage(item as number)}
                      className={`w-8 h-8 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                        currentPage === item
                          ? "bg-[#5FDA78] text-[#360567] shadow-[0_0_12px_rgba(95,218,120,0.4)]"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
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
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-white/20 bg-white/10 text-white/70 disabled:opacity-25 hover:bg-[#5FDA78]/20 hover:border-[#5FDA78] hover:text-[#5FDA78] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Announcement Modal */}
      {isModalOpen && (
        <AddNewAnnouncement
          onClose={() => {
            setIsModalOpen(false)
            refetch()
          }}
        />
      )}

      {/* View Announcement Modal */}
      {isViewModalOpen && (
        <ViewAnnouncement
          announcementData={selectedAnnouncement}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}
    </>
  )
}

export default page

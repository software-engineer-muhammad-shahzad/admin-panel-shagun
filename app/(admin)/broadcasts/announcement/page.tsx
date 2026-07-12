"use client"

import { useState } from "react"
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

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  const { data: announcements, isLoading, refetch } = useGetAnnouncements()

  const filtered = (announcements ?? []).filter((a) =>
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="w-full  flex relative flex-col  h-[calc(100vh-200px)]">
        {/* search - fixed at top */}
        <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
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
        <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide ">
          <Table
            data={filtered}
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

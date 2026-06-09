"use client"

import { useState, useEffect } from "react"
import { Edit, Eye, Trash2 } from "lucide-react"
import DeleteCouple from "@/app/features/couple/DeleteCouple"
import AddCouple from "@/app/features/couple/AddCouple"
import ViewCouple from "@/app/features/couple/ViewCouple"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { useCoupleUsers } from "@/app/features/couple/hooks/useCoupleUsers"
import { useDeleteCouple } from "@/app/features/couple/hooks/useDeleteCouple"
import { useUpdateCouple } from "@/app/features/couple/hooks/useUpdateCouple"
import { CoupleUser } from "@/app/features/couple/types/coupleUser"

const STATUS_OPTIONS = ["All", "Active", "Inactive"]

const statusToRecordStatus = (status: string): number | undefined => {
  if (status === "Active") return 1
  if (status === "Inactive") return 2
  return undefined
}

const recordStatusLabel = (status: number) =>
  status === 1 ? "Active" : "Inactive"

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedCouple, setSelectedCouple] = useState<CoupleUser | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const recordStatus = statusToRecordStatus(statusFilter)

  const { data, isLoading, isError } = useCoupleUsers({
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(recordStatus !== undefined ? { recordStatus } : {}),
  })

  const couples = data?.items ?? []

  const { mutate: deleteCouple, isPending: isDeleting } = useDeleteCouple()
  const { mutate: updateCouple, isPending: isUpdating } = useUpdateCouple()

  const customCoupleColumns = [
    {
      key: "displayId",
      label: "ID",
      width: "100px",
      render: (value: any) => `#${value}`,
    },
    {
      key: "fullName",
      label: "Full Name",
      width: "180px",
      render: (value: any) => value || "N/A",
    },
    {
      key: "partnerName",
      label: "Partner Name",
      width: "160px",
      render: (value: any) => value || "N/A",
    },
    {
      key: "contactNumber",
      label: "Contact No.",
      width: "140px",
      render: (value: any) => value || "N/A",
    },
    {
      key: "email",
      label: "Email",
      width: "200px",
      render: (value: any) => value || "N/A",
    },
    {
      key: "createdOnUtc",
      label: "Date & Time",
      width: "160px",
      render: (value: any) =>
        value ? new Date(value).toLocaleString() : "N/A",
    },
    {
      key: "recordStatus",
      label: "Status",
      width: "120px",
      render: (value: any) => {
        const label = recordStatusLabel(value)
        return (
          <span
            className={`px-3 py-1 flex items-center w-fit gap-2 rounded glass-border text-xs ${label === "Active" ? "text-[#30B052]" : "text-[#FF0000]"}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${label === "Active" ? "bg-[#30B052]" : "bg-[#FF0000]"}`}
            />
            {label}
          </span>
        )
      },
    },
    {
      key: "Action",
      label: "Action",
      render: (_value: any, row: CoupleUser) => (
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCouple(row)
              setEditModalOpen(true)
            }}
          >
            <Edit size={14} />
          </span>
          <span
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCouple(row)
              setViewModalOpen(true)
            }}
          >
            <Eye size={14} />
          </span>
          <span
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCouple(row)
              setDeleteModalOpen(true)
            }}
          >
            <Trash2 size={14} />
          </span>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full flex relative flex-col h-[calc(100vh-200px)]">
      {/* search + filter */}
      <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-[600px]">
          <Input
            type="text"
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm outline-0 w-full! placeholder:text-light-text text-light-text"
            containerClassName="border border-[#C9C9C9] w-full! rounded-lg glass-border bg-transparent"
          />
          <Dropdown
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            placeholder="Filter by Status"
            containerClassName="min-w-[160px]"
            triggerClassName="text-sm outline-0 px-4 glass-card py-2.5 border border-[#C9C9C9] rounded-lg text-white placeholder:text-light-text w-full"
            dropdownClassName="bg-[#350564] z-50"
            optionClassName="text-white border hover:bg-[#5FDA78]/20"
          />
        </div>
      </div>

      {/* table */}
      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-white/60 text-sm">
            Loading couples...
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-full text-red-400 text-sm">
            Failed to load couples. Please try again.
          </div>
        ) : (
          <Table
            data={couples}
            columns={customCoupleColumns}
            onRowClick={(row) => console.log("Row clicked:", row)}
            className="rounded-lg"
            emptyMessage="No couples found"
          />
        )}
      </div>

      {deleteModalOpen && selectedCouple && (
        <DeleteCouple
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() =>
            deleteCouple(selectedCouple.userId, {
              onSuccess: () => setDeleteModalOpen(false),
            })
          }
          isLoading={isDeleting}
        />
      )}
      {editModalOpen && selectedCouple && (
        <AddCouple
          onClose={() => setEditModalOpen(false)}
          editData={{
            id: selectedCouple.displayId,
            fullName: selectedCouple.fullName,
            partnerName: selectedCouple.partnerName,
            email: selectedCouple.email,
            contactNo: selectedCouple.contactNumber,
            dateTime: selectedCouple.createdOnUtc,
            status: recordStatusLabel(selectedCouple.recordStatus),
          }}
          onSubmit={(payload) =>
            updateCouple(
              { userId: selectedCouple.userId, payload },
              { onSuccess: () => setEditModalOpen(false) }
            )
          }
          isSubmitting={isUpdating}
          mode="edit"
        />
      )}
      {viewModalOpen && selectedCouple && (
        <ViewCouple
          onClose={() => setViewModalOpen(false)}
          coupleData={{
            id: selectedCouple.displayId,
            fullName: selectedCouple.fullName,
            partnerName: selectedCouple.partnerName,
            email: selectedCouple.email,
            contactNo: selectedCouple.contactNumber,
            dateTime: selectedCouple.createdOnUtc,
            status: recordStatusLabel(selectedCouple.recordStatus),
          }}
        />
      )}
    </div>
  )
}

export default page

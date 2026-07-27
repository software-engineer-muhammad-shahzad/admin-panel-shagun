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

const STATUS_OPTIONS = ["All", "Active", "Inactive", "Deleted"]

const statusToRecordStatus = (status: string): number | undefined => {
  if (status === "Active") return 1
  if (status === "Inactive") return 2
  if (status === "Deleted") return 3
  return undefined
}

const recordStatusLabel = (status: string | null | undefined): string => {
  if (status === "Active") return "Active"
  if (status === "Inactive") return "Inactive"
  return "Deleted"
}

const PAGE_SIZE = 10

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedCouple, setSelectedCouple] = useState<CoupleUser | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter])

  const recordStatus = statusToRecordStatus(statusFilter)
  const offset = (currentPage - 1) * PAGE_SIZE

  const { data, isLoading, isError } = useCoupleUsers({
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(recordStatus !== undefined ? { recordStatus } : {}),
    offset,
    length: PAGE_SIZE,
  })

  const couples = data?.items ?? []
  const totalOverall = data?.totalOverall ?? 0
  const totalPages = Math.ceil(totalOverall / PAGE_SIZE)

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
      key: "createdOn",
      label: "Date & Time",
      width: "160px",
      render: (_value: any, row: any) =>
        row?.resourceMetadata?.createdOn
          ? new Date(row.resourceMetadata.createdOn).toLocaleString()
          : "N/A",
    },
    {
      key: "resourceMetadata",
      label: "Status",
      width: "120px",
      render: (value: any) => {
        const label = recordStatusLabel(value?.recordStatus)
        const color =
          label === "Active" ? "#30B052" :
          label === "Deleted" ? "#FF6B6B" :
          "#FF0000"
        return (
          <span className="px-3 py-1 flex items-center w-fit gap-2 rounded glass-border text-xs" style={{ color }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
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
          />
        </div>
      </div>

      {/* table */}
      <div className="flex-1 overflow-auto scrollbar-hide">
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

      {editModalOpen && selectedCouple && (
        <AddCouple
          onClose={() => setEditModalOpen(false)}
          editData={{
            id: selectedCouple.displayId ?? "",
            fullName: selectedCouple.fullName,
            partnerName: selectedCouple.partnerName,
            email: selectedCouple.email,
            contactNo: selectedCouple.contactNumber,
            dateTime: selectedCouple.resourceMetadata?.createdOn ?? "",
            status: recordStatusLabel(selectedCouple.resourceMetadata?.recordStatus),
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
      {viewModalOpen && selectedCouple && (
        <ViewCouple
          onClose={() => setViewModalOpen(false)}
          coupleData={{
            id: selectedCouple.displayId ?? "",
            fullName: selectedCouple.fullName,
            partnerName: selectedCouple.partnerName,
            email: selectedCouple.email,
            contactNo: selectedCouple.contactNumber,
            dateTime: selectedCouple.resourceMetadata?.createdOn ?? "",
            status: recordStatusLabel(selectedCouple.resourceMetadata?.recordStatus),
          }}
        />
      )}
    </div>
  )
}

export default page

"use client"

import { useState, useEffect } from "react"
import { Edit, Eye, Trash2, X } from "lucide-react"
import DeleteCouple from "@/app/features/couple/DeleteCouple"
import AddCouple from "@/app/features/couple/AddCouple"
import ViewCouple from "@/app/features/couple/ViewCouple"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { useCoupleUsers } from "@/app/features/couple/hooks/useCoupleUsers"
import { useDeleteCouple } from "@/app/features/couple/hooks/useDeleteCouple"
import { useDeleteCoupleProfile } from "@/app/features/couple/hooks/useDeleteCoupleProfile"
import { useUpdateCouple } from "@/app/features/couple/hooks/useUpdateCouple"
import { CoupleUser } from "@/app/features/couple/types/coupleUser"
import { ResourceMetadata } from "@/app/features/broadcasts/types/broadcastUser"
import { baseURL } from "@/app/services/apiClient"
import { showToast } from "@/app/lib/toast"

const STATUS_OPTIONS = ["All", "Active", "Inactive", "Deleted"]

const statusToRecordStatus = (status: string): number | undefined => {
  if (status === "Active") return 1
  if (status === "Inactive") return 2
  if (status === "Deleted") return 3
  return undefined
}

const recordStatusLabel = (status: string | null | undefined): string => {
  if (status === "Active") return "Active"
  if (status === "Deleted") return "Deleted"
  return "Inactive"
}

const PAGE_SIZE = 10

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [profileDeleteModalOpen, setProfileDeleteModalOpen] = useState(false)
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
  const { mutate: deleteProfile, isPending: isDeletingProfile } = useDeleteCoupleProfile()
  const { mutate: updateCouple, isPending: isUpdating } = useUpdateCouple()

  const customCoupleColumns = [
    {
      key: "profileImageUrl",
      label: "Profile",
      width: "80px",
      render: (value: any, row: any) => {
        const initials = (row?.fullName ?? "?").charAt(0).toUpperCase()
        const imgSrc = value
          ? value.startsWith("http")
            ? value
            : `${baseURL.replace(/\/$/, "")}/${value.replace(/^\//, "")}`
          : null
        return (
          <div className="relative inline-block">
            {/* Avatar */}
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={row?.fullName ?? ""}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                className="w-9 h-9 rounded-full object-cover border border-[#5FDA78]/40"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#5FDA78]/20 border border-[#5FDA78]/40 flex items-center justify-center text-[#5FDA78] text-sm font-semibold">
                {initials}
              </div>
            )}

            {/* Delete icon pinned to top-right corner */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedCouple(row as CoupleUser)
                setProfileDeleteModalOpen(true)
              }}
              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow cursor-pointer"
            >
              <Trash2 size={9} className="text-white" />
            </button>
          </div>
        )
      },
    },
    {
      key: "userId",
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
          <button
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCouple(row)
              setEditModalOpen(true)
            }}
          >
            <Edit size={14} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCouple(row)
              setViewModalOpen(true)
            }}
          >
            <Eye size={14} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20"
            onClick={(e) => {
              if (row.resourceMetadata?.recordStatus === 'Deleted') { showToast.error('Couple is already deleted'); return; }
              e.stopPropagation()
              setSelectedCouple(row)
              setDeleteModalOpen(true)
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full flex relative flex-col h-[calc(100vh-200px)]">
      {/* search + filter */}
      <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b shrink-0 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-150">
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
                    className={`w-8 h-8 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${currentPage === item
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

      {editModalOpen && selectedCouple && (
        <AddCouple
          onClose={() => setEditModalOpen(false)}
          editData={{
            id: String(selectedCouple.userId),
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
            eventDate: selectedCouple.eventDate ?? "",
            resourceMetadata: selectedCouple.resourceMetadata as unknown as ResourceMetadata,
          }}
        />
      )}

      {/* Profile Delete Confirmation Modal */}
      {profileDeleteModalOpen && selectedCouple && (() => {
        const val = selectedCouple.profileImageUrl
        const imgSrc = val
          ? val.startsWith("http")
            ? val
            : `${baseURL.replace(/\/$/, "")}/${val.replace(/^\//, "")}`
          : null
        const initials = (selectedCouple.fullName ?? "?").charAt(0).toUpperCase()
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#330065CC] backdrop-blur-[34px]">
            <div className="glass-card border border-[#5FDA78] rounded-3xl p-6 w-[90%] max-w-sm flex flex-col items-center gap-5">
              {/* Close */}
              <div className="w-full flex justify-end">
                <button
                  onClick={() => setProfileDeleteModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Profile picture */}
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={selectedCouple.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#5FDA78]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#5FDA78]/20 border-2 border-[#5FDA78] flex items-center justify-center text-[#5FDA78] text-3xl font-bold">
                  {initials}
                </div>
              )}

              {/* Name */}
              <div className="text-center">
                <p className="text-white font-semibold text-lg">{selectedCouple.fullName}</p>
                {selectedCouple.partnerName && (
                  <p className="text-white/50 text-sm">& {selectedCouple.partnerName}</p>
                )}
              </div>

              {/* Message */}
              <p className="text-white/70 text-sm text-center">
                Are you sure you want to delete this couple? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setProfileDeleteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeletingProfile}
                  onClick={() =>
                    deleteProfile(selectedCouple.userId, {
                      onSuccess: () => setProfileDeleteModalOpen(false),
                    })
                  }
                  className="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {isDeletingProfile ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default page

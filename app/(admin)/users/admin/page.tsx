"use client"

import { useState, useEffect } from "react"
import { CirclePlus, Edit, Eye, Trash2 } from "lucide-react"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import DeleteRoleModal from "@/app/features/user/DeleteRoleModal"
import AddNewForm from "@/app/features/user/AddNewForm"
import ViewUser from "@/app/features/user/ViewUser"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { useDeleteAdmin } from "@/app/features/user/hooks/useDeleteAdmin"
import { useCreateAdmin } from "@/app/features/user/hooks/useCreateAdmin"
import { useUpdateAdmin } from "@/app/features/user/hooks/useUpdateAdmin"
import { AdminUser } from "@/app/features/user/types/adminUser"

const recordStatusLabel = (status: string | null | undefined): string => {
    if (status === "Active") return "Active"
    if (status === "Inactive") return "Inactive"
    return "Deleted"
}

const STATUS_OPTIONS = ["All", "Active", "Inactive", "Deleted"]

const statusToRecordStatus = (status: string): number | undefined => {
    if (status === "Active") return 1
    if (status === "Inactive") return 2
    if (status === "Deleted") return 3
    return undefined
}

const PAGE_SIZE = 10

const page = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [addNewModalOpen, setAddNewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
            setCurrentPage(1)
        }, 400)
        return () => clearTimeout(timer)
    }, [searchTerm])

    useEffect(() => { setCurrentPage(1) }, [statusFilter])

    const offset = (currentPage - 1) * PAGE_SIZE
    const recordStatus = statusToRecordStatus(statusFilter)

    const { data, isLoading, isError } = useAdminUsers({
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(recordStatus !== undefined ? { recordStatus } : {}),
        offset,
        length: PAGE_SIZE,
    })
    const admins = data?.items ?? []
    const totalOverall = data?.totalOverall ?? 0
    const totalPages = Math.ceil(totalOverall / PAGE_SIZE)

    const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin()
    const { mutate: createAdmin, isPending: isCreating } = useCreateAdmin()
    const { mutate: updateAdmin, isPending: isUpdating } = useUpdateAdmin()

    const customAdminColumns = [
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
            key: "moduleAccess",
            label: "Module Access",
            width: "130px",
            render: (value: any) => value ?? "—",
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
            render: (_value: any, row: AdminUser) => (
                <div className="flex items-center gap-2">
                    <span
                        className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUser(row)
                            setEditModalOpen(true)
                        }}
                    >
                        <Edit size={14} />
                    </span>
                    <span
                        className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUser(row)
                            setViewModalOpen(true)
                        }}
                    >
                        <Eye size={14} />
                    </span>
                    <span
                        className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUser(row)
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
            <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-[550px]">
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
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center">
                    <div
                        className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
                        onClick={() => setAddNewModalOpen(true)}
                    >
                        <CirclePlus size={15} />
                        <p className="text-[#360567] font-poppins text-md font-semibold text-nowrap">Add New</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto scrollbar-hide">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-white/60 text-sm">
                        Loading admins...
                    </div>
                ) : isError ? (
                    <div className="flex items-center justify-center h-full text-red-400 text-sm">
                        Failed to load admins. Please try again.
                    </div>
                ) : (
                    <Table
                        data={admins}
                        columns={customAdminColumns}
                        onRowClick={(row) => console.log("Row clicked:", row)}
                        className="rounded-lg"
                        emptyMessage="No admins found"
                    />
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-t border-white/10 shrink-0">
                    <p className="text-white/40 text-xs font-medium">
                        Showing <span className="text-white/70">{offset + 1}–{Math.min(offset + PAGE_SIZE, totalOverall)}</span> of <span className="text-white/70">{totalOverall}</span> results
                    </p>
                    <div className="flex items-center gap-1">
                        {/* Previous */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-white/20 bg-white/10 text-white/70 disabled:opacity-25 hover:bg-[#5FDA78]/20 hover:border-[#5FDA78] hover:text-[#5FDA78] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        >
                            ‹ Prev
                        </button>

                        {/* Page numbers with ellipsis */}
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

                        {/* Next */}
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

            {deleteModalOpen && selectedUser && (
                <DeleteRoleModal
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() =>
                        deleteAdmin(selectedUser.userId, {
                            onSuccess: () => setDeleteModalOpen(false),
                        })
                    }
                    isLoading={isDeleting}
                />
            )}
            {addNewModalOpen && (
                <AddNewForm
                    onClose={() => setAddNewModalOpen(false)}
                    onSubmit={(payload) =>
                        createAdmin(payload, {
                            onSuccess: () => setAddNewModalOpen(false),
                        })
                    }
                    isSubmitting={isCreating}
                />
            )}
            {editModalOpen && selectedUser && (
                <AddNewForm
                    onClose={() => setEditModalOpen(false)}
                    editData={{
                        id: selectedUser.displayId ?? "",
                        fullName: selectedUser.fullName,
                        email: selectedUser.email,
                        contactNo: selectedUser.contactNumber,
                        moduleAccess: selectedUser.moduleAccess ?? "",
                        status: recordStatusLabel(selectedUser.resourceMetadata?.recordStatus),
                    }}
                    onSubmit={(payload) =>
                        updateAdmin(
                            { userId: selectedUser.userId, payload },
                            { onSuccess: () => setEditModalOpen(false) }
                        )
                    }
                    isSubmitting={isUpdating}
                    mode="edit"
                />
            )}
            {viewModalOpen && selectedUser && (
                <ViewUser
                    onClose={() => setViewModalOpen(false)}
                    userData={{
                        id: selectedUser.displayId ?? "",
                        fullName: selectedUser.fullName,
                        email: selectedUser.email,
                        contactNo: selectedUser.contactNumber,
                        moduleAccess: selectedUser.moduleAccess ?? "",
                        status: recordStatusLabel(selectedUser.resourceMetadata?.recordStatus),
                    }}
                />
            )}
        </div>
    )
}

export default page

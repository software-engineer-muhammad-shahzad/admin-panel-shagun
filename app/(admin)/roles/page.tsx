"use client"

import { useState, useEffect } from "react"
import { CirclePlus, Edit, Eye, Trash2 } from "lucide-react"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { AdminUser } from "@/app/features/user/types/adminUser"
import AssignRoles from "@/app/features/roles/AssignRoles"
import DeleteRole from "@/app/features/roles/DeleteRole"
import ViewRole from "@/app/features/roles/ViewRole"
import EditRole from "@/app/features/roles/EditRole"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Dropdown from "@/app/shared/components/elements/Dropdown"

const STATUS_OPTIONS = [
    { label: "All", value: "" },
    { label: "Active", value: "1" },
    { label: "Inactive", value: "2" },
    { label: "Deleted", value: "3" },
]

const PAGE_SIZE = 10

const page = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isAssignRolesModalOpen, setIsAssignRolesModalOpen] = useState(false)
    const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false)
    const [isViewRoleModalOpen, setIsViewRoleModalOpen] = useState(false)
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
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

    const { data, isLoading } = useAdminUsers({
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(statusFilter ? { recordStatus: Number(statusFilter) } : {}),
        offset,
        length: PAGE_SIZE,
    })
    const admins = data?.items ?? []
    const totalOverall = data?.totalOverall ?? 0
    const totalPages = Math.ceil(totalOverall / PAGE_SIZE)

    const customRolesColumns = [
        {
            key: "displayId",
            label: "Admin ID",
            width: "100px",
            render: (value: any) => `#${value}`,
        },
        {
            key: "fullName",
            label: "Admin Full Name",
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
            key: "moduleAccess",
            label: "Modules",
            width: "150px",
            render: (value: any) => value || "—",
        },
        {
            key: "resourceMetadata",
            label: "Status",
            width: "120px",
            render: (value: any) => {
                const status: string = value?.recordStatus ?? "Inactive"
                const color =
                    status === "Active" ? "#30B052" :
                    status === "Deleted" ? "#FF6B6B" :
                    "#FF0000"
                return (
                    <span className="px-3 py-1 flex items-center w-fit gap-2 rounded glass-border text-xs" style={{ color }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        {status}
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
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(row); setIsEditRoleModalOpen(true) }}
                    >
                        <Edit size={14} />
                    </span>
                    <span
                        className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(row); setIsViewRoleModalOpen(true) }}
                    >
                        <Eye size={14} />
                    </span>
                    <span
                        className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20"
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(row); setIsDeleteRoleModalOpen(true) }}
                    >
                        <Trash2 size={14} />
                    </span>
                </div>
            ),
        },
    ]

    return (
        <>
            <div className="w-full flex relative flex-col h-[calc(100vh-200px)]">
                {/* Search bar */}
                <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
                    <div className="flex gap-2 w-full lg:max-w-[500px]">
                        <Input
                            type="text"
                            placeholder="Quick Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-sm outline-0 w-full! placeholder:text-light-text text-light-text"
                            containerClassName="border border-[#C9C9C9] w-full! rounded-lg glass-border bg-transparent"
                        />
                        <Dropdown
                            options={STATUS_OPTIONS.map((opt) => opt.label)}
                            value={STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label || "All"}
                            onChange={(label) => {
                                const opt = STATUS_OPTIONS.find((o) => o.label === label)
                                setStatusFilter(opt?.value ?? "")
                            }}
                            containerClassName="shrink-0"
                            triggerClassName="w-[120px]!"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center">
                        <div
                            className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
                            onClick={() => setIsAssignRolesModalOpen(true)}
                        >
                            <CirclePlus size={15} />
                            <p className="text-[#360567] text-md font-semibold text-nowrap">Assign Roles</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto scrollbar-hide">
                    <Table
                        data={admins}
                        columns={customRolesColumns}
                        className="rounded-lg"
                        emptyMessage={isLoading ? "Loading..." : "No admins found"}
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

            {isAssignRolesModalOpen && (
                <AssignRoles onClose={() => setIsAssignRolesModalOpen(false)} />
            )}
            {isDeleteRoleModalOpen && (
                <DeleteRole onClose={() => setIsDeleteRoleModalOpen(false)} userId={selectedUser?.userId} />
            )}
            {isViewRoleModalOpen && (
                <ViewRole onClose={() => setIsViewRoleModalOpen(false)} roleData={selectedUser} />
            )}
            {isEditRoleModalOpen && (
                <EditRole onClose={() => setIsEditRoleModalOpen(false)} editData={selectedUser} mode="edit" />
            )}
        </>
    )
}

export default page

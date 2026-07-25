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

const page = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [isAssignRolesModalOpen, setIsAssignRolesModalOpen] = useState(false)
    const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false)
    const [isViewRoleModalOpen, setIsViewRoleModalOpen] = useState(false)
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400)
        return () => clearTimeout(timer)
    }, [searchTerm])

    const queryParams = {
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(statusFilter ? { recordStatus: Number(statusFilter) } : {}),
    }
    const { data, isLoading } = useAdminUsers(
        Object.keys(queryParams).length > 0 ? queryParams : undefined
    )
    const admins = data?.items ?? []

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
                <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide">
                    <Table
                        data={admins}
                        columns={customRolesColumns}
                        className="rounded-lg"
                        emptyMessage={isLoading ? "Loading..." : "No admins found"}
                    />
                </div>
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

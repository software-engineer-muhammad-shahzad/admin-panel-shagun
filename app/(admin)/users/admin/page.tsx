"use client"

import { useState, useEffect } from "react"
import { CirclePlus, Edit, Eye, Trash2 } from "lucide-react"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import DeleteRoleModal from "@/app/features/user/DeleteRoleModal"
import AddNewForm from "@/app/features/user/AddNewForm"
import ViewUser from "@/app/features/user/ViewUser"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { useDeleteAdmin } from "@/app/features/user/hooks/useDeleteAdmin"
import { useCreateAdmin } from "@/app/features/user/hooks/useCreateAdmin"
import { useUpdateAdmin } from "@/app/features/user/hooks/useUpdateAdmin"
import { AdminUser } from "@/app/features/user/types/adminUser"

const recordStatusLabel = (status: number) =>
    status === 1 ? "Active" : "Inactive"

const page = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [addNewModalOpen, setAddNewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400)
        return () => clearTimeout(timer)
    }, [searchTerm])

    const { data, isLoading, isError } = useAdminUsers(
        debouncedSearch ? { search: debouncedSearch } : undefined
    )
    const admins = data?.items ?? []

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
            key: "createdOnUtc",
            label: "Date & Time",
            width: "160px",
            render: (value: any) =>
                value ? new Date(value).toLocaleString() : "N/A",
        },
        {
            key: "moduleAccess",
            label: "Module Access",
            width: "130px",
            render: (value: any) => value ?? "—",
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
                <div className="w-full lg:max-w-[350px]">
                    <Input
                        type="text"
                        placeholder="Quick Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-sm outline-0 w-full! placeholder:text-light-text text-light-text"
                        containerClassName="border border-[#C9C9C9] w-full! rounded-lg glass-border bg-transparent"
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

            <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide">
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
                        id: selectedUser.displayId,
                        fullName: selectedUser.fullName,
                        email: selectedUser.email,
                        contactNo: selectedUser.contactNumber,
                        moduleAccess: selectedUser.moduleAccess ?? "",
                        status: recordStatusLabel(selectedUser.recordStatus),
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
                        id: selectedUser.displayId,
                        fullName: selectedUser.fullName,
                        email: selectedUser.email,
                        contactNo: selectedUser.contactNumber,
                        moduleAccess: selectedUser.moduleAccess ?? "",
                        status: recordStatusLabel(selectedUser.recordStatus),
                    }}
                />
            )}
        </div>
    )
}

export default page

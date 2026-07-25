"use client"

import { useState, useEffect } from "react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { MoveLeft, X } from "lucide-react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { AdminUser, RecordStatus } from "@/app/features/user/types/adminUser"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { useUpdateAdmin } from "@/app/features/user/hooks/useUpdateAdmin"

interface EditRoleProps {
    onClose: () => void
    editData?: AdminUser | null
    mode?: "add" | "edit"
}

const STATUS_LABEL_MAP: Record<string, number> = {
    Active: RecordStatus.Active,
    Inactive: RecordStatus.Inactive,
    Deleted: RecordStatus.Deleted,
}

const EditRole = ({ onClose, editData, mode = "edit" }: EditRoleProps) => {
    const [formData, setFormData] = useState({
        id: editData?.displayId || "",
        adminName: editData?.fullName || "",
        email: editData?.email || "",
        modules: editData?.moduleAccess || "",
        status: editData?.resourceMetadata?.recordStatus ?? "Inactive",
    })

    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const { mutate: updateAdmin, isPending } = useUpdateAdmin()

    const { data: freshData } = useAdminUsers(
        editData?.userId
            ? { userId: editData.userId, recordStatus: editData.resourceMetadata?.recordStatus ?? undefined }
            : undefined
    )

    useEffect(() => {
        const user = freshData?.items?.[0]
        if (!user) return
        setFormData({
            id: user.displayId || "",
            adminName: user.fullName || "",
            email: user.email || "",
            modules: user.moduleAccess || "",
            status: user.resourceMetadata?.recordStatus ?? "Inactive",
        })
    }, [freshData])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!editData?.userId) return
        updateAdmin(
            {
                userId: editData.userId,
                payload: {
                    fullName: formData.adminName,
                    contactNumber: editData.contactNumber || "",
                    email: formData.email,
                    password: "",
                    userRole: "Admin",
                    moduleAccess: formData.modules,
                    isActive: formData.status === "Active",
                    recordStatus: STATUS_LABEL_MAP[formData.status] ?? RecordStatus.Inactive,
                    eventDate: new Date().toISOString(),
                },
            },
            {
                onSuccess: () => setShowSuccessModal(true),
            }
        )
    }

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        onClose()
    }

    return (
        <>
            <ModalLayer
                onClose={onClose}
                modalWidth="80%"
                modalHeight="80vh"
                className="glass-card border border-[#5FDA78] p-4 md:p-6 overflow-y-auto scrollbar-hide"
                overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                position="center"
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <MoveLeft className="text-white" />
                        <h2 className="text-white text-xl font-semibold">
                            {mode === "edit" ? "Edit Role" : "Add Role"}
                        </h2>
                    </div>
                    <Button
                        onClick={onClose}
                        className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                    >
                        <X size={20} className="group-hover:text-white" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <Input
                                type="text"
                                label="Admin ID"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Admin ID"
                                value={formData.id}
                                onChange={(e) => handleInputChange("id", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                type="text"
                                label="Admin Full Name"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Admin Full Name"
                                value={formData.adminName}
                                onChange={(e) => handleInputChange("adminName", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                type="text"
                                label="Email"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                type="text"
                                label="Module Access"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Module Access"
                                value={formData.modules}
                                onChange={(e) => handleInputChange("modules", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div className="w-full px-5 mt-3">
                            <Dropdown
                                label="Status"
                                options={["Active", "Inactive", "Deleted"]}
                                value={formData.status}
                                onChange={(value) => handleInputChange("status", value)}
                                placeholder="Select status"
                                containerClassName="w-full"
                                labelClassName="text-white text-sm ms-5 mb-2 block"
                                triggerClassName="text-sm outline-0 max-w-[700px]! px-5 glass-card py-5! border border-text-green rounded-[70px] glass-card text-white placeholder:text-light-text w-full bg-[#350564]/50"
                                dropdownClassName="bg-[#350564] z-999 ml-[-10px]! md:ml-[-51px]"
                                optionClassName="text-white border hover:bg-[#5FDA78]/20"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="border border-text-border max-w-[110px] md:max-w-[120px] font-semibold w-fit! px-8! py-2! bg-transparent text-white hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-[#5FDA78] text-[#360567] max-w-[110px] md:max-w-[120px] w-full font-semibold px-8! py-2! hover:bg-[#4FB860]"
                        >
                            {isPending ? "Saving..." : mode === "edit" ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </ModalLayer>

            {showSuccessModal && (
                <ModalLayer
                    onClose={handleCloseSuccessModal}
                    modalWidth="30%"
                    modalHeight="auto"
                    className="glass-card border border-[#5FDA78] p-6"
                    overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                    position="center"
                >
                    <div >
                        <h2 className="text-white text-xl font-semibold mb-2">
                            {mode === "edit" ? "Updated" : "Added"}
                        </h2>
                        <p className="text-white/70 text-sm mb-6">
                            Your role successfully {mode === "edit" ? "updated" : "added"}.
                        </p>
                        <div className="flex justify-end">
                            <Button
                                onClick={handleCloseSuccessModal}
                                className="bg-[#5FDA78] font-inter text-[#360567] max-w-[130px] font-semibold px-8! py-2! hover:bg-[#4FB860]"
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                </ModalLayer>
            )}
        </>
    )
}

export default EditRole

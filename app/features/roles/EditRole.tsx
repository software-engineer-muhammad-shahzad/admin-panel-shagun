"use client"

import { useState, useEffect } from "react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { MoveLeft, X } from "lucide-react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { AdminUser } from "@/app/features/user/types/adminUser"
import { RecordStatus } from "@/app/shared/enums"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { useUpdateAdmin } from "@/app/features/user/hooks/useUpdateAdmin"
import { ADMIN_MODULES, canonicalizeModules, parseModuleAccess } from "@/app/shared/adminModules"

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
        status: editData?.resourceMetadata?.recordStatus ?? "Inactive",
    })
    const [checkedModules, setCheckedModules] = useState<string[]>(
        () => canonicalizeModules(parseModuleAccess(editData?.moduleAccess))
    )

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
            status: user.resourceMetadata?.recordStatus ?? "Inactive",
        })
        setCheckedModules(canonicalizeModules(parseModuleAccess(user.moduleAccess)))
    }, [freshData])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const toggleModule = (module: string) => {
        setCheckedModules((prev) =>
            prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
        )
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
                    moduleAccess: checkedModules.join(","),
                    isActive: formData.status === "Active",
                    recordStatus: STATUS_LABEL_MAP[formData.status] ?? RecordStatus.Inactive,
                    eventDate: new Date().toISOString(),
                },
            },
            {
                onSuccess: () => onClose(),
            }
        )
    }

    return (
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
                                label="Email"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                                disabled={true}
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
                                disabled={true}
                            />
                        </div>                        

                        <div className="w-full px-5 mt-1">
                            <p className="text-white text-sm ms-0 mb-2">Module Access</p>
                            <div className="flex flex-wrap gap-3 sm:gap-5 px-1 py-2">
                                {ADMIN_MODULES.map((module) => (
                                    <label key={module} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={checkedModules.includes(module)}
                                            onChange={() => toggleModule(module)}
                                            className="w-4 h-4 accent-[#5FDA78] shrink-0"
                                        />
                                        <span className="text-white text-xs sm:text-sm whitespace-nowrap">{module}</span>
                                    </label>
                                ))}
                            </div>
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
    )
}

export default EditRole

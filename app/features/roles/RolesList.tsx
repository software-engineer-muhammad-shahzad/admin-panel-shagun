"use client"

import { useState } from "react"
import { X } from "lucide-react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import { useAssignModules } from "@/app/features/user/hooks/useAssignModules"
import { AdminUser } from "@/app/features/user/types/adminUser"

interface RolesListProps {
    onClose: () => void
    onParentClose: () => void
    user: AdminUser
}

const MODULES = ["Dashboard", "User Management", "Broadcasts", "Payments", "Roles and rights"]

const RolesList = ({ onClose, onParentClose, user }: RolesListProps) => {
    const [checkedModules, setCheckedModules] = useState<string[]>([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const { mutate: assignModules, isPending } = useAssignModules()

    const toggleModule = (module: string) => {
        setCheckedModules((prev) =>
            prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
        )
    }

    const handleAssign = () => {
        setErrorMsg(null)
        assignModules(
            {
                userId: user.userId,
                payload: {
                    userId: user.userId,
                    fullName: user.fullName,
                    contactNumber: user.contactNumber,
                    email: user.email,
                    password: "",
                    userRole: "Admin",
                    moduleAccess: checkedModules.join(", "),
                    isActive: user.resourceMetadata?.recordStatus === "Active",
                    eventDate: new Date().toISOString(),
                },
            },
            {
                onSuccess: () => setShowSuccess(true),
                onError: () => setErrorMsg("Failed to assign role. Please try again."),
            }
        )
    }

    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="min(95%, 680px)"
            modalHeight="auto"
            className="glass-card border border-[#5FDA78] p-4 sm:p-6"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-white text-lg sm:text-xl font-semibold">
                    Assign Role{user.fullName ? <span className="text-[#5FDA78]"> — {user.fullName}</span> : ""}
                </h2>
                <Button
                    onClick={onClose}
                    className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none shrink-0"
                >
                    <X size={18} className="group-hover:text-white" />
                </Button>
            </div>

            {/* Search + Module checkboxes */}
            <div className="flex flex-col gap-4">
                <Input
                    type="text"
                    placeholder="Quick Search..."
                    className="text-sm outline-0 w-full! placeholder:text-light-text text-light-text"
                    containerClassName="border border-[#C9C9C9] w-full! rounded-lg glass-border bg-transparent"
                />

                <div>
                    <p className="text-white/70 text-xs mb-2 ms-1">Module Access</p>
                    <div className="flex flex-wrap gap-3 sm:gap-5">
                        {MODULES.map((module) => (
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

                {errorMsg && (
                    <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
                <Button
                    onClick={onClose}
                    className="border border-[#C9C9C9] font-bold w-full sm:w-fit! px-8! py-2! bg-transparent text-white hover:bg-white/5"
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleAssign}
                    className="text-[#360567] font-bold w-full sm:w-fit! px-8! py-2! hover:bg-[#4FB860]"
                    disabled={isPending || checkedModules.length === 0}
                >
                    {isPending ? "Assigning..." : "Assign"}
                </Button>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <ModalLayer
                    onClose={() => setShowSuccess(false)}
                    modalWidth="min(90%, 360px)"
                    modalHeight="auto"
                    className="glass-card border border-[#5FDA78] p-6"
                    overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                    position="center"
                >
                    <div className="text-center">
                        <h3 className="text-white text-lg font-semibold mb-3">Successful</h3>
                        <p className="text-white/80 text-sm mb-6">Role has been successfully assigned.</p>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => {
                                    setShowSuccess(false)
                                    onClose()
                                    onParentClose()
                                }}
                                className="text-[#360567] font-semibold w-full sm:w-fit! px-8! py-2! hover:bg-[#4FB860]"
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                </ModalLayer>
            )}
        </ModalLayer>
    )
}

export default RolesList

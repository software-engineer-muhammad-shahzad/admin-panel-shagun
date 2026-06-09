import { useState } from "react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import AddedSuccessfully from "./AddedSuccessfully"
import { MoveLeft, X } from "lucide-react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { CreateAdminPayload, UserRole } from "./types/adminUser"

interface AddNewFormProps {
    onClose: () => void
    onSubmit?: (data: CreateAdminPayload) => void
    isSubmitting?: boolean
    editData?: {
        id: string
        fullName: string
        email: string
        contactNo: string
        moduleAccess: string
        status: string
    }
    mode?: "add" | "edit"
}

const MODULE_OPTIONS = ["Dashboard", "User Management", "Payments", "Roles", "Broadcasts"]

const USER_ROLE_OPTIONS: { label: string; value: UserRole }[] = [
    { label: "Super Admin", value: UserRole.SuperAdmin },
    { label: "1",       value: UserRole.Admin },
    { label: "2",      value: UserRole.Couple },
]

const AddNewForm = ({ onClose, onSubmit, isSubmitting, editData, mode = "add" }: AddNewFormProps) => {
    const [formData, setFormData] = useState({
        fullName: editData?.fullName || "",
        email: editData?.email || "",
        contactNumber: editData?.contactNo || "",
        password: "",
        moduleAccess: editData?.moduleAccess || "",
        userRole: UserRole.Admin,
        isActive: editData ? editData.status === "Active" : true,
        eventDate: "",
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit) {
            onSubmit({
                fullName: formData.fullName,
                contactNumber: formData.contactNumber,
                email: formData.email,
                password: formData.password,
                userRole: formData.userRole,
                moduleAccess: formData.moduleAccess,
                isActive: formData.isActive,
                eventDate: formData.eventDate
                    ? new Date(formData.eventDate).toISOString()
                    : new Date().toISOString(),
            })
        } else {
            setShowSuccessModal(true)
        }
    }

    return (
        <>
            <ModalLayer
                onClose={onClose}
                modalWidth="80%"
                modalHeight="80vh"
                className="glass-card border border-[#5FDA78] p-2 md:p-6 overflow-y-auto scrollbar-hide"
                overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                position="center"
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <MoveLeft className="text-white" />
                        <h2 className="text-white text-xl font-semibold">
                            {mode === "edit" ? "Edit Admin" : "Add New Admin"}
                        </h2>
                    </div>
                    <Button
                        onClick={onClose}
                        className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                    >
                        <X size={20} className="group-hover:text-white" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label="Full Name"
                            labelColor="ms-5 mb-1"
                            placeholder="Enter Full Name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                            containerClassName="border-none bg-transparent"
                        />

                        <Input
                            type="email"
                            label="Email"
                            labelColor="ms-5 mb-1"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                            containerClassName="border-none bg-transparent"
                        />

                        <Input
                            type="text"
                            label="Contact Number"
                            labelColor="ms-5 mb-1"
                            placeholder="Enter Contact Number"
                            value={formData.contactNumber}
                            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                            className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                            containerClassName="border-none bg-transparent"
                        />

                        {mode === "add" && (
                            <Input
                                type="password"
                                label="Password"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                                containerClassName="border-none bg-transparent"
                            />
                        )}

                        <Input
                            type="datetime-local"
                            label="Event Date"
                            labelColor="ms-5 mb-1"
                            value={formData.eventDate}
                            onChange={(e) => handleInputChange("eventDate", e.target.value)}
                            className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card text-light-text"
                            containerClassName="border-none bg-transparent"
                        />

                        <div className="w-full px-5 mt-3">
                            <Dropdown
                                label="Module Access"
                                options={MODULE_OPTIONS}
                                value={formData.moduleAccess}
                                onChange={(value) => handleInputChange("moduleAccess", value)}
                                placeholder="Select Module"
                                containerClassName="w-full"
                                labelClassName="text-white text-sm ms-5 mb-2 block"
                                triggerClassName="text-sm outline-0 max-w-[700px]! px-5 glass-card py-5! border border-text-green rounded-[70px] glass-card text-white placeholder:text-light-text w-full"
                                dropdownClassName="bg-[#350564] z-999 ml-[-10px]! md:ml-[-51px]"
                                optionClassName="text-white border hover:bg-[#5FDA78]/20"
                            />
                        </div>

                        {mode === "edit" && (
                            <div className="w-full px-5 mt-3">
                                <p className="text-white text-sm ms-5 mb-3">Status</p>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange("isActive", !formData.isActive)}
                                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${formData.isActive ? "bg-[#5FDA78]" : "bg-white/20"}`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${formData.isActive ? "translate-x-8" : "translate-x-1"}`}
                                    />
                                </button>
                                <span className={`ms-3 text-sm font-medium ${formData.isActive ? "text-[#5FDA78]" : "text-white/50"}`}>
                                    {formData.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                        )}

                        <div className="w-full px-5 mt-3">
                            <Dropdown
                                label="User Role"
                                options={USER_ROLE_OPTIONS.map((r) => r.label)}
                                value={USER_ROLE_OPTIONS.find((r) => r.value === formData.userRole)?.label ?? ""}
                                onChange={(label) => {
                                    const role = USER_ROLE_OPTIONS.find((r) => r.label === label)
                                    if (role) setFormData((prev) => ({ ...prev, userRole: role.value }))
                                }}
                                placeholder="Select Role"
                                containerClassName="w-full"
                                labelClassName="text-white text-sm ms-5 mb-2 block"
                                triggerClassName="text-sm outline-0 max-w-[700px]! px-5 glass-card py-5! border border-text-green rounded-[70px] glass-card text-white placeholder:text-light-text w-full"
                                dropdownClassName="bg-[#350564] z-999 ml-[-10px]! md:ml-[-51px]"
                                optionClassName="text-white border hover:bg-[#5FDA78]/20"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="border border-text-border max-w-[130px] font-semibold w-fit! px-8! py-2! bg-transparent text-white hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#5FDA78] text-[#360567] max-w-[130px] w-full font-semibold px-8! py-2! hover:bg-[#4FB860] disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : mode === "edit" ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </ModalLayer>

            {showSuccessModal && <AddedSuccessfully onClose={() => { setShowSuccessModal(false); onClose() }} mode={mode} />}
        </>
    )
}

export default AddNewForm

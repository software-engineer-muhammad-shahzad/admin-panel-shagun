import { useState } from "react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import AddedSuccessfully from "./AddedSuccessfully"
import { MoveLeft, X } from "lucide-react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { CreateAdminPayload } from "./types/adminUser"

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


const AddNewForm = ({ onClose, onSubmit, isSubmitting, editData, mode = "add" }: AddNewFormProps) => {
    const [formData, setFormData] = useState({
        fullName: editData?.fullName || "",
        email: editData?.email || "",
        contactNumber: editData?.contactNo || "",
        password: "",
        userRole: 2,
        status: editData?.status || "Active",
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: "" }))
    }

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
        handleInputChange("fullName", value)
    }

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")
        handleInputChange("contactNumber", value)
    }

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address"
        if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
        else if (formData.contactNumber.length < 7) newErrors.contactNumber = "Enter a valid contact number"
        if (mode === "add") {
            if (!formData.password) newErrors.password = "Password is required"
            else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const STATUS_MAP: Record<string, number> = { Active: 1, Inactive: 2, Deleted: 3 }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validate()) return
        if (onSubmit) {
            onSubmit({
                fullName: formData.fullName,
                contactNumber: formData.contactNumber,
                email: formData.email,
                password: formData.password,
                userRole: formData.userRole,
                moduleAccess: "",
                isActive: formData.status === "Active",
                recordStatus: STATUS_MAP[formData.status] ?? 2,
                eventDate: new Date().toISOString(),
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
                        <div>
                            <Input
                                type="text"
                                label="Full Name"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Full Name"
                                value={formData.fullName}
                                onChange={handleFullNameChange}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                                containerClassName="border-none bg-transparent"
                            />
                            {errors.fullName && <p className="text-red-400 text-xs mt-1 ms-5">{errors.fullName}</p>}
                        </div>

                        <div>
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
                            {errors.email && <p className="text-red-400 text-xs mt-1 ms-5">{errors.email}</p>}
                        </div>

                        <div>
                            <Input
                                type="text"
                                label="Contact Number"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Contact Number"
                                value={formData.contactNumber}
                                onChange={handleContactChange}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                                containerClassName="border-none bg-transparent"
                            />
                            {errors.contactNumber && <p className="text-red-400 text-xs mt-1 ms-5">{errors.contactNumber}</p>}
                        </div>

                        {mode === "add" && (
                            <div>
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
                                {errors.password && <p className="text-red-400 text-xs mt-1 ms-5">{errors.password}</p>}
                            </div>
                        )}


                        {mode === "edit" && (
                            <div className="w-full px-5 mt-3">
                                <Dropdown
                                    label="Status"
                                    options={["Active", "Inactive", "Deleted"]}
                                    value={formData.status}
                                    onChange={(value) => handleInputChange("status", value)}
                                    placeholder="Select Status"
                                    containerClassName="w-full"
                                    labelClassName="text-white text-sm ms-5 mb-2 block"
                                    triggerClassName="text-sm outline-0 max-w-[700px]! px-5 glass-card py-5! border border-text-green rounded-[70px] glass-card text-white placeholder:text-light-text w-full"
                                    dropdownClassName="bg-[#350564] z-999 ml-[-10px]! md:ml-[-51px]"
                                    optionClassName="text-white border hover:bg-[#5FDA78]/20"
                                />
                            </div>
                        )}

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

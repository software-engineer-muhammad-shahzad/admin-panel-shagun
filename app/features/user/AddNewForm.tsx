import { useMemo, useState } from "react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import AddedSuccessfully from "./AddedSuccessfully"
import { MoveLeft, X } from "lucide-react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import Dropdown from "@/app/shared/components/elements/Dropdown"
import { CreateAdminPayload } from "./types/adminUser"
import {
    EMAIL_MAX_LENGTH,
    FULL_NAME_MAX_LENGTH,
    PHONE_MAX_LENGTH,
    getFieldBorderClass,
    validateContactNumber,
    validateEmail,
    validateFullName,
    validatePassword,
} from "@/app/shared/validation/authFormValidation"

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
        contactNumber: (editData?.contactNo || "").replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH),
        password: "",
        userRole: 2,
        status: editData?.status || "Active",
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const setFieldError = (field: string, value: string) => {
        setErrors(prev => ({ ...prev, [field]: value }))
    }

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, FULL_NAME_MAX_LENGTH)
        setFormData(prev => ({ ...prev, fullName: value }))
        setFieldError("fullName", value.trim() ? validateFullName(value) : "")
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, EMAIL_MAX_LENGTH)
        setFormData(prev => ({ ...prev, email: value }))
        setFieldError("email", value.trim() ? validateEmail(value) : "")
    }

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH)
        setFormData(prev => ({ ...prev, contactNumber: value }))
        setFieldError("contactNumber", value ? validateContactNumber(value) : "")
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData(prev => ({ ...prev, password: value }))
        setFieldError("password", value ? validatePassword(value) : "")
    }

    const handleStatusChange = (value: string) => {
        setFormData(prev => ({ ...prev, status: value }))
    }

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}
        const fullNameError = validateFullName(formData.fullName)
        const emailError = validateEmail(formData.email)
        const contactError = validateContactNumber(formData.contactNumber)

        if (fullNameError) newErrors.fullName = fullNameError
        if (emailError) newErrors.email = emailError
        if (contactError) newErrors.contactNumber = contactError

        if (mode === "add") {
            const passwordError = validatePassword(formData.password)
            if (passwordError) newErrors.password = passwordError
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const isFormValid = useMemo(() => {
        if (validateFullName(formData.fullName)) return false
        if (validateEmail(formData.email)) return false
        if (validateContactNumber(formData.contactNumber)) return false
        if (mode === "add" && validatePassword(formData.password)) return false
        return true
    }, [formData, mode])

    const STATUS_MAP: Record<string, number> = { Active: 1, Inactive: 2, Deleted: 3 }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validate()) return
        if (onSubmit) {
            onSubmit({
                fullName: formData.fullName.trim(),
                contactNumber: formData.contactNumber,
                email: formData.email.trim(),
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

    const inputClass = (field: string) =>
        `text-sm outline-0 px-5 py-4 border ${getFieldBorderClass(errors[field])} rounded-[70px] glass-card placeholder:text-light-text text-light-text`

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
                                maxLength={FULL_NAME_MAX_LENGTH}
                                value={formData.fullName}
                                onChange={handleFullNameChange}
                                className={inputClass("fullName")}
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
                                maxLength={EMAIL_MAX_LENGTH}
                                value={formData.email}
                                onChange={handleEmailChange}
                                className={inputClass("email")}
                                containerClassName="border-none bg-transparent"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1 ms-5">{errors.email}</p>}
                        </div>

                        <div>
                            <Input
                                type="tel"
                                label="Contact Number"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Contact Number"
                                maxLength={PHONE_MAX_LENGTH}
                                value={formData.contactNumber}
                                onChange={handleContactChange}
                                className={inputClass("contactNumber")}
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
                                    onChange={handlePasswordChange}
                                    className={inputClass("password")}
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
                                    onChange={handleStatusChange}
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
                            disabled={isSubmitting || (mode === "add" && !isFormValid)}
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

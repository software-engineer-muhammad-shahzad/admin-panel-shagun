import { useState } from "react"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"
import Dropdown from "@/app/components/elements/Dropdown"
import AddedSuccessfully from "./AddedSuccessfully"
import { MoveLeft, X } from "lucide-react"

interface AddNewFormProps {
    onClose: () => void
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

const AddNewForm = ({ onClose, editData, mode = "add" }: AddNewFormProps) => {
    const [formData, setFormData] = useState({
        id: editData?.id || "",
        fullName: editData?.fullName || "",
        email: editData?.email || "",
        contactNo: editData?.contactNo || "",
        moduleAccess: editData?.moduleAccess || "",
        status: editData?.status || "Active"
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Here you would typically send the data to your API
        setShowSuccessModal(true)
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
                className="glass-card border border-[#5FDA78] p-2 md:p-6 overflow-y-auto scrollbar-hide"
                overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                position="center"
            >
                <div className="flex justify-between items-center mb-6"><div className="flex items-center gap-2">
                    <MoveLeft className="text-white" />
                    <h2 className="text-white text-xl font-semibold">{mode === "edit" ? "Edit User" : "Payment Configuration"}</h2>
                </div>
                    <Button
                        onClick={onClose}
                        className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                    >
                        <X size={20} className="group-hover:text-white" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <div className="w-full! ">
                            <Input
                                type="text"
                                label="ID"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter "
                                value={formData.id}
                                onChange={(e) => handleInputChange("id", e.target.value)}
                                className="text-sm outline-0 px-5 py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                label="Full Name"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Full Name"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                className="text-sm outline-0 px-5 py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                label="Contact Number"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Contact Number "
                                value={formData.contactNo}
                                onChange={(e) => handleInputChange("contactNo", e.target.value)}
                                className="text-sm outline-0 px-5 py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div>
                                  <Input
                      type="text"
                      label="Date & Time"
                      labelColor="ms-5 mb-1"
                      placeholder="Enter "
                      className="text-sm outline-0 px-5 py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                      containerClassName="border-none bg-transparent"
                    />
                        </div>
                        <div >
                                  <Input
                      type="text"
                      label="Email"
                      labelColor="ms-5 mb-1"
                      placeholder="Enter Email "
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="text-sm outline-0 px-5 w-full! py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                      containerClassName="border-none px-0! w-full! bg-transparent"
                    />
                        </div>

                        <div className="w-full px-5 mt-3">
                            <Dropdown
                                label="Module Access"
                                options={["Active", "Inactive"]}
                                value={formData.status}
                                onChange={(value) => handleInputChange("status", value)}
                                placeholder="Select status"
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
                            className="bg-[#5FDA78] text-[#360567] max-w-[130px] w-full font-semibold px-8! py-2! hover:bg-[#4FB860]"
                        >
                            {mode === "edit" ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </ModalLayer>
            
            {/* Success Modal */}
            {showSuccessModal && <AddedSuccessfully onClose={handleCloseSuccessModal} mode={mode} />}
        </>
    )
}

export default AddNewForm
"use client"

import { useState } from "react"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Button from "@/app/components/elements/Button"
import Input from "@/app/components/elements/Input"
import Dropdown from "@/app/components/elements/Dropdown"
import { MoveLeft, X } from "lucide-react"

interface EditRoleProps {
    onClose: () => void
    editData?: { 
        id: string; 
        adminName: string; 
        lastActive: string; 
        modules: string; 
        status: string; 
    }
    mode?: "add" | "edit"
}

const EditRole = ({ onClose, editData, mode = "edit" }: EditRoleProps) => {
    const [formData, setFormData] = useState({
        id: editData?.id || "",
        adminName: editData?.adminName || "",
        lastActive: editData?.lastActive || "",
        modules: editData?.modules || "",
        status: editData?.status || "Active",
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
        // Handle form submission logic here
        console.log("Form submitted:", formData)
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
                                label="Last Active"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Last Active"
                                value={formData.lastActive}
                                onChange={(e) => handleInputChange("lastActive", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                type="text"
                                label="Modules"
                                labelColor="ms-5 mb-1"
                                placeholder="Enter Modules"
                                value={formData.modules}
                                onChange={(e) => handleInputChange("modules", e.target.value)}
                                className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                                containerClassName="border-none bg-transparent"
                            />
                        </div>

                        <div className="w-full px-5 mt-3">
                            <Dropdown
                                label="Status"
                                options={["Active", "Inactive"]}
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
                            className="border border-text-border max-w-[110px] md:max-w-[120px] font-semibold w-fit! px-8! py-2! bg-transparent text-white hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#5FDA78] text-[#360567] max-w-[110px] md:max-w-[120px] w-full font-semibold px-8! py-2! hover:bg-[#4FB860]"
                        >
                            {mode === "edit" ? "Update" : "Add"}
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
                            className="bg-[#5FDA78] text-[#360567] max-w-[130px] font-semibold px-8! py-2! hover:bg-[#4FB860]"
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

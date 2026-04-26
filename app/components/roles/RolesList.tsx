"use client"

import { useState } from "react"
import { X, ChevronDown, Trash2 } from "lucide-react"
import Button from "@/app/components/elements/Button"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Input from "../elements/Input"
import DeleteRole from "./DeleteRole"

interface RolesListProps {
    onClose: () => void
    onParentClose: () => void
}

const RolesList = ({ onClose, onParentClose }: RolesListProps) => {
    const [selectedRole, setSelectedRole] = useState("Select Role")
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="80%"
            modalHeight="60vh"
            className="glass-card border border-[#5FDA78] p-6"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">Assign Role</h2>
                <Button
                    onClick={onClose}
                    className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                >
                    <X size={20} className="group-hover:text-white" />
                </Button>
            </div>
            {/* form */}

            <div className="p-4">
                <div className="flex items-center gap-4">
                    <div className=" flex-1">
                        <Input
                            type="text"
                            placeholder="Quick Search..."

                            className="text-sm outline-0  w-full!  placeholder:text-light-text text-light-text"
                        />
                    </div>
                    {/* checkbox div */}
                    <div className="flex gap-5 ">
                        <Input
                            type="checkbox"
                            label="Dashboard"
                            className="w-4 h-4 accent-[#5FDA78] "

                            containerClassName="p-0!  px-0! "
                            paddingClass="flex-row  items-center px-0!  gap-2"
                        />
                        <Input
                            type="checkbox"
                            label="User Management"
                            className="w-4 h-4 accent-[#5FDA78]"
                            containerClassName="border-none!"
                            paddingClass="flex-row  items-center  px-0! gap-2"
                        />
                        <Input
                            type="checkbox"
                            label="Broadcasts"
                            className="w-4 h-4 accent-[#5FDA78]"
                            containerClassName="border-none! flex! flex-row! "
                            paddingClass="flex-row  items-center  px-0! gap-2"
                        />
                        <Input
                            type="checkbox"
                            label="Payments"
                            className="w-4 h-4 accent-[#5FDA78]"
                            containerClassName="border-none! flex! flex-row! "
                            paddingClass="flex-row  items-center  px-0! gap-2"
                        />
                    </div>


                </div>
                {/* Button Cancel and Assign */}
                <div className="flex justify-center  gap-4 mt-10">
                    <Button
                        onClick={onClose}
                        className="border border-[#C9C9C9] font-bold w-fit! px-8! py-2! bg-transparent text-white hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="text-[#360567] font-bold w-fit! px-8! py-2! hover:bg-[#4FB860]"
                    >
                        Assign
                    </Button>
                </div>
            </div>
            {/* Confirmation Modal */}
            {isConfirmModalOpen && (
                <ModalLayer
                    onClose={() => setIsConfirmModalOpen(false)}
                    modalWidth="30%"
                    modalHeight="auto"
                    className="glass-card border border-[#5FDA78] p-6"
                    overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                    position="center"
                >
                    <div className="text-center">
                        <h3 className="text-white text-lg font-semibold mb-4">Successful
                        </h3>
                        <p className="text-white/80 text-sm mb-6">Your role successfully added.
                        </p>
                        <div className="flex justify-center gap-4">

                            <Button
                                onClick={() => {
                                    setIsConfirmModalOpen(false)
                                    onClose()
                                    onParentClose()
                                }}
                                className="text-[#360567] font-semibold w-fit! px-8! py-2! hover:bg-[#4FB860]"
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                </ModalLayer>
            )}
            {/* Delete Role Modal */}
            {isDeleteModalOpen && (
                <DeleteRole 
                    onClose={() => setIsDeleteModalOpen(false)}
                    roleName="Admin"
                />
            )}
        </ModalLayer>
    )
}

export default RolesList
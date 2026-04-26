"use client"

import { useState } from "react"
import { X, Trash2 } from "lucide-react"
import Button from "@/app/components/elements/Button"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"

interface DeleteRoleProps {
    onClose: () => void
    roleName?: string
}

const DeleteRole = ({ onClose, roleName = "Admin" }: DeleteRoleProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="40% sm:90%"
            modalHeight="auto"
            className="glass-card border border-[#5FDA78] p-6"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >


            <div className=" p-2 max-w-[250px] md:max-w-[300px]">

                <h3 className="font-semibold text-2xl  text-white">Delete</h3>

                <p className="text-white mt-4 font-light">Are you sure you want to delete this role?</p>
                {/* button No Yes */}
                <div className="flex justify-end  mt-7 gap-2">

                    <Button
                        onClick={onClose}
                        className="border border-text-green font-bold w-fit! px-8! py-2! bg-transparent text-green-text hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="text-white font-bold w-fit! px-8! py-2! hover:bg-[#4FB860]"
                    >
                        Yes
                    </Button>
                </div>
            </div>

            {/* Success Modal */}
            {isConfirmModalOpen && (
                <ModalLayer
                    onClose={() => setIsConfirmModalOpen(false)}
                    modalWidth="40% sm:90%"
                    modalHeight="auto"
                    className="glass-card border border-[#5FDA78] p-6"
                    overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                    position="center"
                >
                    <div className="text-center max-w-[250px] md:max-w-[300px]">
                      
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Successful
                        </h3>
                        <p className="text-white/80 text-sm mb-6">
                            Your role has been successfully deleted.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={() => {
                                    setIsConfirmModalOpen(false)
                                    onClose()
                                }}
                                className="text-[#360567] font-semibold w-fit! px-8! py-2! hover:bg-[#4FB860]"
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

export default DeleteRole
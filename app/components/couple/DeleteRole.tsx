import { useState } from "react"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Button from "../elements/Button"

interface DeleteRoleProps {
    onClose: () => void
}

const DeleteRole = ({ onClose }: DeleteRoleProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="40% sm:90%"
            modalHeight="auto"
            className="glass-card border border-[#5FDA78] p-4 sm:p-6"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            <div className="p-2 sm:p-4">
                <h3 className="font-semibold text-xl sm:text-2xl text-white">Delete</h3>
                <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base font-light">Are you sure you want to delete this role?</p>
                {/* button No Yes */}
               <div className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-7 gap-2 sm:gap-4">

                    <Button
                        onClick={onClose}
                        className="border border-text-green font-bold w-full sm:w-fit! px-6 sm:px-8! py-2! bg-transparent text-green-text hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="text-white font-bold w-full sm:w-fit! px-6 sm:px-8! py-2! hover:bg-[#4FB860]"
                    >
                        Assign
                    </Button>
                </div>
            </div>

            {/* Success Modal */}
            {isConfirmModalOpen && (
                <ModalLayer
                    onClose={() => setIsConfirmModalOpen(false)}
                    modalWidth="40% sm:90%"
                    modalHeight="auto"
                    className="glass-card border border-[#5FDA78] p-4 sm:p-6"
                    overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                    position="center"
                >
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                        </div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Successful
                        </h3>
                        <p className="text-white/80 text-sm mb-6">
                            Your role has been successfully deleted.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setIsConfirmModalOpen(false)
                                    onClose()
                                }}
                                className="bg-green-500 text-white font-semibold px-6 sm:px-8 py-2 hover:bg-green-600"
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </ModalLayer>
            )}
        </ModalLayer>
    )
}

export default DeleteRole
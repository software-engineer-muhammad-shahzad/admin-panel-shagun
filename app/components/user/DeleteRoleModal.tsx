import { useState } from "react"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Button from "../elements/Button"

interface DeleteRoleModalProps {
    onClose: () => void
}

const DeleteRoleModal = ({ onClose }: DeleteRoleModalProps) => {
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
                {/* button No Yes */}
                <div className="flex  justify-end mt-4 sm:mt-7 gap-2 sm:gap-4">
                    <Button
                        onClick={onClose}
                        className="border border-text-green font-bold w-full max-w-[120px] sm:w-fit! px-6 sm:px-8! py-2! bg-transparent text-green-text hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="text-white font-bold w-full max-w-[120px] sm:w-fit! px-6 sm:px-8! py-2! hover:bg-[#4FB860]"
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
                    className="glass-card border border-[#5FDA78] p-4 sm:p-6"
                    overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
                    position="center"
                >
                    <div >
                      
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Successful
                        </h3>
                        <p className="text-white/80 text-sm mb-6">
                            Your role has been successfully deleted.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                        onClick={onClose}
                        className="border border-text-green font-bold w-full max-w-[120px] sm:w-fit! px-6 sm:px-8! py-2! bg-text-green mt-3 text-white "
                    >
                        OK
                    </Button>
                        </div>
                    </div>
                </ModalLayer>
            )}
        </ModalLayer>
    )
}

export default DeleteRoleModal
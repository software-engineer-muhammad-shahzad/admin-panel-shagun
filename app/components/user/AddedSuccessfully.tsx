import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Button from "@/app/components/elements/Button"
import { Check, X } from "lucide-react"

interface AddedSuccessfullyProps {
    onClose: () => void
    mode?: "add" | "edit"
}

const AddedSuccessfully = ({ onClose, mode = "add" }: AddedSuccessfullyProps) => {
    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="40% sm:90%"
            modalHeight="auto"
            className="glass-card border border-[#5FDA78] p-6"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            <div className="flex flex-col  space-y-6">
              
                
                {/* Success Message */}
                <div>
                    <h2 className="text-white text-2xl font-semibold mb-2">{mode === "edit" ? "Updated" : "Added"}</h2>
                    <p className="text-white font-light  text-sm">Your information successfully {mode === "edit" ? "updated" : "added"}.</p>
                </div>
                
                {/* Close Button */}
                <div className="flex justify-end w-full mt-2">
                    <Button
                        onClick={onClose}
                        className="bg-[#5FDA78] text-white font-semibold  max-w-[120px] px-6! py-2! hover:bg-[#4FB860]"
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </ModalLayer>
    )
}

export default AddedSuccessfully
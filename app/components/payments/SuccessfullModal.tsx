"use client"

import { Check } from "lucide-react"
import Button from "@/app/components/elements/Button"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"

interface SuccessfullModalProps {
  onClose: () => void
}

const SuccessfullModal = ({ onClose }: SuccessfullModalProps) => {
  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="400px"
      modalHeight="auto"
      className="glass-card border border-[#5FDA78] p-6"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex flex-col   justify-center h-full p-2">
      

        {/* Success Message */}
        <h2 className="text-white text-3xl font-semibold mb-2 text-start">
        Successful
        </h2>
        <p className="text-white/80 text-start font-light mb-8">
          Your Configuration successfully added.
        </p>

        {/* Done Button */}
        <div className="flex justify-end">
        <Button
          onClick={onClose}
          className="w-full h-[14px] max-w-[100px] bg-[#5FDA78] text-white font-semibold hover:bg-[#4FB860] transition-colors"
        >
          Ok
        </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default SuccessfullModal
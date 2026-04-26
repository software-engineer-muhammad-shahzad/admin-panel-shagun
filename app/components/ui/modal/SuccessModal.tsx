"use client"

import { Check } from "lucide-react"
import Button from "@/app/components/elements/Button"
import ModalLayer from "./ModalLayer"

interface SuccessModalProps {
  onClose: () => void
  title?: string
  message?: string
  buttonText?: string
  secondaryButtonText?: string
  onSecondaryButtonClick?: () => void
}

const SuccessModal = ({ 
  onClose, 
  title = "Successful",
  message = "Your action has been completed successfully.",
  buttonText = "Ok",
  secondaryButtonText,
  onSecondaryButtonClick,

}: SuccessModalProps) => {
  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="400px"
      modalHeight="auto"
      className="glass-card border border-[#5FDA78] p-6"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex flex-col justify-center h-full p-2">
       

        {/* Success Message */}
        <h2 className="text-white text-3xl font-semibold mb-2 text-start">
          {title}
        </h2>
        <p className="text-white/80 text-start font-light mb-8">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-[5px]">
          {secondaryButtonText && (
            <Button
              onClick={onSecondaryButtonClick || onClose}
              className="w-full h-[14px] max-w-[100px] border border-[#C9C9C9] font-light bg-transparent text-white hover:bg-white/5 transition-colors"
            >
              {secondaryButtonText}
            </Button>
          )}
          <Button
            onClick={onClose}
            className="w-full h-[14px] max-w-[100px] bg-[#5FDA78] text-white font-light hover:bg-[#4FB860] transition-colors"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default SuccessModal

"use client"

import { useState } from "react"
import { X, ChevronDown, MoveLeft } from "lucide-react"
import Button from "@/app/components/elements/Button"
import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import RolesList from "./RolesList"

interface AssignRolesProps {
  onClose: () => void
}

const AssignRoles = ({ onClose }: AssignRolesProps) => {
  const [selectedRole, setSelectedRole] = useState("Select Role")
  const [isRolesListOpen, setIsRolesListOpen] = useState(false)

  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="70%"
      modalHeight="60vh"
      className="glass-card border border-[#5FDA78] p-4 sm:p-6"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
             <MoveLeft  className="text-white"/>
            <h2 className="text-white text-xl font-semibold">Payment Configuration</h2>
            </div>
        <Button
          onClick={onClose}
          className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
        >
          <X size={20} className="group-hover:text-white" />
        </Button>
      </div>

      <div className="flex flex-col gap-6 h-full">
        {/* username and assign now  button*/}
        <div className="flex justify-between ">
          <div className="flex gap-5">
            <div className="w-6 h-6 flex justify-center items-center rounded-[5px] text-white border border-[#5FDA78]">1</div>
            <p className="text-white">Ahmad Ali</p>
          </div>
          <button 
            onClick={() => setIsRolesListOpen(true)}
            className="glass-card text-sm  text-[#30B052] py-1 px-3 rounded-2xl"
          >
            Assign Now
          </button>
        </div> 
        {/* 2 */}
        
        <div className="flex justify-between ">
          <div className="flex gap-5">
            <div className="w-6 h-6 flex justify-center items-center rounded-[5px] text-white border border-[#5FDA78]">1</div>
            <p className="text-white">Ahmad Ali</p>
          </div>
          <button 
            onClick={() => setIsRolesListOpen(true)}
            className="glass-card text-sm  text-[#30B052] py-1 px-3 rounded-2xl"
          >
            Assign Now
          </button>
        </div>
        {/* 3 */}
        
        <div className="flex justify-between ">
          <div className="flex gap-5">
            <div className="w-6 h-6 flex justify-center items-center rounded-[5px] text-white border border-[#5FDA78]">1</div>
            <p className="text-white">Ahmad Ali</p>
          </div>
          <button 
            onClick={() => setIsRolesListOpen(true)}
            className="glass-card text-sm  text-[#30B052] py-1 px-3 rounded-2xl"
          >
            Assign Now
          </button>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-5">
          <Button
            onClick={onClose}
            className="text-white font-light w-fit! px-8! py-2! hover:bg-[#4FB860]"
          >
            Close
          </Button>
        </div>
      </div>
      
      {/* RolesList Modal */}
      {isRolesListOpen && (
        <RolesList 
          onClose={() => setIsRolesListOpen(false)}
          onParentClose={onClose}
        />
      )}
    </ModalLayer>
  )
}

export default AssignRoles
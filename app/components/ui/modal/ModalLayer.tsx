"use client"

import { ReactNode } from "react"





interface ModalLayerProps {

  children: ReactNode

  onClose?: () => void           // required: callback to close modal

  overlayColor?: string

  modalWidth?: string

  modalHeight?: string

  className?: string

  position?: "center" | "bottom" | "responsive"

}



const ModalLayer = ({

  children,

  onClose,

  overlayColor = "bg-[#330065CC] backdrop-blur-[20px]",

  modalHeight = "380px",

  modalWidth = "100%",

  className = "",

  position = "responsive", 

}: ModalLayerProps) => {

  return (

    <div

      className={`fixed inset-0  z-[9999] ${

        position === "responsive" 

          ? "flex md:items-center md:justify-center items-end justify-center" 

          : position === "bottom" 

            ? "flex items-end justify-end" 

            : "flex items-center justify-center"

      } ${

        position === "bottom" || position === "responsive" 

          ? " overflow-hidden" 

          : ""

      } ${overlayColor}`}

      onClick={onClose} // click outside triggers close



    >

      <div

        className={`${className} ${

          position === "bottom" || position === "responsive" 

            ? "rounded-t-2xl overflow-hidden" 

            : "rounded-2xl overflow-hidden"

        } ${modalWidth || ""}`}

        style={{ height: modalHeight, width: modalWidth }}

        onClick={(e: any) => e.stopPropagation()} // prevent closing when clicking inside modal

      >

        {children}

      </div>

    </div>

  )

}



export default ModalLayer
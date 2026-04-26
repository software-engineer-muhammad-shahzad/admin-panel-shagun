import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Button from "./Button"

interface DropdownProps {
  options: string[]
  placeholder?: string
  label?: string
  value?: string
  onChange?: (value: string) => void
  containerClassName?: string
  triggerClassName?: string
  dropdownClassName?: string
  optionClassName?: string
  labelClassName?: string
}

const Dropdown = ({ 
  options, 
  placeholder = "Select an option", 
  label, 
  value, 
  onChange, 
  containerClassName = "",
  triggerClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  labelClassName = ""
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className={`block text-white text-sm mb-2 ${labelClassName}`}>{label}</label>
      )}
      
      <Button
        onClick={toggleDropdown}
        className={`flex items-center justify-between bg-transparent text-sm! border border-green-text rounded-2xl py-1.5! px-3 w-full max-w-[130px] gap-2 text-white hover:text-[#5FDA78] transition-colors ${triggerClassName}`}
      >
        <p className="text-xs text-left flex-1">{selectedValue || placeholder}</p>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className={`absolute top-full mt-2 ml-[-50px] scrollbar-hide bg-[#391F68] rounded-lg border border-[#5FDA78] shadow-lg z-50 max-w-[120px] max-h-[120px] overflow-y-auto ${dropdownClassName}`}>
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full text-left border-none rounded-none! text-sm! px-4 py-2! text-white bg-transparent hover:bg-[#5FDA78]/20 transition-colors ${optionClassName}`}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown

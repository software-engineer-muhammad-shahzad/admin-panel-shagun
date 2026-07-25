import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      {label && (
        <label className={`block text-white text-sm mb-2 ${labelClassName}`}>{label}</label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`flex gap-2 bg-transparent rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full justify-center border border-[#5FDA78] hover:bg-[#5FDA78]/10 transition-colors duration-300 ${triggerClassName}`}
      >
        <p className="text-[#5FDA78] text-md font-semibold text-nowrap flex-1 text-left">{selectedValue || placeholder}</p>
        <ChevronDown className={`w-4 h-4 text-[#5FDA78] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-1 left-0 right-0 bg-transparent border border-[#5FDA78] rounded-2xl shadow-lg z-50 max-h-[240px] overflow-y-auto scrollbar-hide backdrop-blur-sm ${dropdownClassName}`}>
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left text-sm px-4 py-2.5 font-medium transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                selectedValue === option
                  ? "bg-[#5FDA78] text-[#360567]"
                  : "text-[#5FDA78] bg-transparent hover:bg-[#5FDA78]/20"
              } ${optionClassName}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown

"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export interface SearchableDropdownOption {
  label: string
  value: string | number
}

interface SearchableDropdownProps {
  options: SearchableDropdownOption[]
  placeholder?: string
  label?: string
  value?: string | number | null
  onChange?: (option: SearchableDropdownOption) => void
  onSearchChange?: (search: string) => void
  searchPlaceholder?: string
  isLoading?: boolean
  containerClassName?: string
  triggerClassName?: string
  dropdownClassName?: string
  optionClassName?: string
  labelClassName?: string
  openUpward?: boolean
}

const SearchableDropdown = ({
  options,
  placeholder = "Select an option",
  label,
  value,
  onChange,
  onSearchChange,
  searchPlaceholder = "Search...",
  isLoading = false,
  containerClassName = "",
  triggerClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  labelClassName = "",
  openUpward = false,
}: SearchableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch)
    onSearchChange?.(nextSearch)
  }

  const handleSelect = (option: SearchableDropdownOption) => {
    onChange?.(option)
    setIsOpen(false)
    setSearch("")
    onSearchChange?.("")
  }

  return (
    <div ref={containerRef} className={`relative w-full ${containerClassName}`}>
      {label && (
        <label className={`block text-white text-[14px] mb-1 ${labelClassName}`}>{label}</label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex gap-2 bg-transparent rounded-[70px] py-4 px-5 cursor-pointer items-center w-full border border-[#5FDA78] hover:bg-[#5FDA78]/10 transition-colors duration-300 min-h-[52px] ${triggerClassName}`}
      >
        <p className="text-light-text text-sm flex-1 text-left truncate">
          {selectedOption?.label || placeholder}
        </p>
        <ChevronDown className={`w-4 h-4 text-[#5FDA78] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 bg-[#350564] border border-[#5FDA78] rounded-2xl shadow-lg z-50 overflow-hidden ${
            openUpward ? "bottom-full mb-1" : "top-full mt-1"
          } ${dropdownClassName}`}
        >
          <div className="p-2 border-b border-[#5FDA78]/30">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 text-sm text-white bg-transparent outline-none placeholder:text-light-text"
            />
          </div>

          <div className="max-h-[200px] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <p className="text-white/60 text-sm px-4 py-3">Loading...</p>
            ) : options.length === 0 ? (
              <p className="text-white/60 text-sm px-4 py-3">No results found</p>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left text-sm px-4 py-2.5 font-medium transition-colors cursor-pointer ${
                    selectedOption?.value === option.value
                      ? "bg-[#5FDA78] text-[#360567]"
                      : "text-[#5FDA78] bg-transparent hover:bg-[#5FDA78]/20"
                  } ${optionClassName}`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown

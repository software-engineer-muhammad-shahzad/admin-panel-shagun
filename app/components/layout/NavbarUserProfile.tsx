"use client"

import { useState } from "react"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"

interface NavbarUserProfileProps {
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

const NavbarUserProfile = ({ sidebarOpen, setSidebarOpen }: NavbarUserProfileProps = {}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
        className="flex items-center gap-2 cursor-pointer sm:gap-3 p-2 rounded-xl hover:bg-[#5FDA78]/20 transition-colors"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#5FDA78]">
          {/* Placeholder profile image - replace with actual image src */}
          <div className="w-full h-full bg-gradient-to-br from-[#5FDA78] to-[#370666] flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-white text-sm font-medium">John Doe</p>
          <p className="text-white/70 text-xs">Administrator</p>
        </div>
        <ChevronDown 
          size={15} 
          className={`text-white transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {profileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-[#391F68] rounded-xl border border-[#5FDA78] shadow-lg z-[100]">
          <div className="p-3 sm:p-4 border-b border-[#5FDA78]/30">
            <p className="text-white font-medium text-sm">John Doe</p>
            <p className="text-white/70 text-xs sm:text-sm">john.doe@example.com</p>
          </div>
          <div className="py-2">
            <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-white hover:bg-[#5FDA78]/20 transition-colors">
              <User size={15} />
              <span className="text-xs sm:text-sm">Profile</span>
            </button>
            <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-white hover:bg-[#5FDA78]/20 transition-colors">
              <Settings size={15} />
              <span className="text-xs sm:text-sm">Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-white hover:bg-[#5FDA78]/20 transition-colors">
              <LogOut size={15} />
              <span className="text-xs sm:text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavbarUserProfile
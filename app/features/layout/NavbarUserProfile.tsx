"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import Image from "next/image"
import { clearStorage } from "@/app/utils/storage/storageHelper"
import { useUserProfile } from "@/app/features/user/hooks/useUserProfile"
import { baseURL } from "@/app/services/apiClient"

interface NavbarUserProfileProps {
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

const NavbarUserProfile = ({ sidebarOpen, setSidebarOpen }: NavbarUserProfileProps = {}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const router = useRouter()

  const { data: profile } = useUserProfile()

  const fullName = profile?.fullName ?? "Admin"
  const email = profile?.email ?? ""
  const profileImageUrl = profile?.profileImageUrl
    ? `${baseURL}/${profile.profileImageUrl}`
    : null

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = () => {
    clearStorage("local")
    router.replace("/login")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
        className="flex items-center gap-2 cursor-pointer sm:gap-3 p-2 rounded-xl hover:bg-[#5FDA78]/20 transition-colors"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#5FDA78] shrink-0">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={fullName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#5FDA78] to-[#370666] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{initials}</span>
            </div>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-white text-sm font-medium">{fullName}</p>
          <p className="text-white/70 text-xs">Administrator</p>
        </div>
        <ChevronDown
          size={15}
          className={`text-white transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {profileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 sm:w-56 bg-[#391F68] rounded-xl border border-[#5FDA78] shadow-lg z-[100]">
          <div className="p-3 sm:p-4 border-b border-[#5FDA78]/30">
            <p className="text-white font-medium text-sm truncate">{fullName}</p>
            <p className="text-white/70 text-xs sm:text-sm truncate">{email}</p>
            {profile?.contactNumber && (
              <p className="text-white/50 text-xs mt-0.5">{profile.contactNumber}</p>
            )}
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-white hover:bg-[#5FDA78]/20 transition-colors"
            >
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

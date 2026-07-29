"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut } from "lucide-react"
import Image from "next/image"
import { clearStorage, getData } from "@/app/utils/storage/storageHelper"
import Button from "@/app/shared/components/elements/Button"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { useUserProfile } from "@/app/features/user/hooks/useUserProfile"
import { AuthData } from "@/app/features/auth/types/auth"
import { baseURL } from "@/app/services/apiClient"

interface NavbarUserProfileProps {
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

const NavbarUserProfile = ({ sidebarOpen, setSidebarOpen }: NavbarUserProfileProps = {}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const { data: profile } = useUserProfile()
  const authData = getData<AuthData>("authData", "local")

  const fullName = profile?.fullName ?? authData?.fullName ?? "Admin"
  const email = profile?.email ?? authData?.email ?? ""
  const role = authData?.role ?? ""
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

  const openLogoutConfirm = () => {
    setProfileDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  return (
    <div ref={containerRef} className="relative flex items-center self-center">
      <Button
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
        className="flex! items-center gap-2 cursor-pointer sm:gap-3 p-2! rounded-xl! hover:bg-[#5FDA78]/20! transition-colors bg-transparent! border-none! text-white w-auto!"
      >
        <div className="w-10 h-10  sm:w-14 sm:h-14  rounded-full overflow-hidden border border-[#5FDA78] shrink-0">
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
          <p className="text-white text-base font-medium font-poppins">{fullName}</p>
          <p className="text-white text-[14px] font-poppins">{role}</p>
        </div>
        <ChevronDown
          size={17}
          className={`text-white font-bold transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Dropdown menu */}
      {profileDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 sm:w-56 bg-[#391F68] rounded-xl border border-[#5FDA78] shadow-lg z-[100]">
          <div className="p-3 sm:p-4 border-b border-[#5FDA78]/30">
            <p className="text-white font-medium text-sm truncate">{fullName}</p>
            <p className="text-white/70 text-xs sm:text-sm truncate">{email}</p>
            {profile?.contactNumber && (
              <p className="text-white/50 text-xs mt-0.5">{profile.contactNumber}</p>
            )}
          </div>
          <div className="py-2">
            <Button
              onClick={openLogoutConfirm}
              className="w-[calc(100%-16px)]! mx-2 flex! items-center gap-2 sm:gap-3 px-3! py-2! bg-transparent! border-none! text-white! hover:bg-[#5FDA78]/20! rounded-lg! justify-start!"
            >
              <LogOut size={15} />
              <span className="text-xs sm:text-sm">Logout</span>
            </Button>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <ModalLayer
          onClose={() => setShowLogoutConfirm(false)}
          modalWidth="min(95%, 400px)"
          modalHeight="auto"
          className="glass-card border border-[#5FDA78] p-4 sm:p-6"
          overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
          position="center"
        >
          <h3 className="font-semibold text-lg sm:text-xl text-white">Logout</h3>
          <p className="text-white/80 mt-3 text-sm sm:text-base">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => setShowLogoutConfirm(false)}
              className="border border-[#C9C9C9] font-semibold px-8! py-2! bg-transparent text-white hover:bg-white/5"
            >
              No
            </Button>
            <Button
              onClick={handleLogout}
              className="text-[#360567] font-semibold px-8! py-2! hover:bg-[#4FB860]"
            >
              Yes
            </Button>
          </div>
        </ModalLayer>
      )}
    </div >
  )
}

export default NavbarUserProfile

"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import NavbarUserProfile from "./NavbarUserProfile"

interface NavbarProps {
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users/admin": "User Management (Admin)",
  "/users/couple": "User Management (Couple)",
  "/roles": "Role & Rights",
  "/broadcasts/notification": "Broadcasts (Notifications)",
  "/broadcasts/announcement": "Broadcasts (Announcements)",
  "/payments": "Payments",
}

const getPageTitle = (pathname: string): string => {
  return PAGE_TITLES[pathname] ?? "Dashboard"
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps = {}) => {
  const pathname = usePathname()

  return (
    <div className="rounded-[30px] h-full flex justify-between items-center px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {setSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:text-[#5FDA78] transition-colors p-1"
          >
            <Menu size={20} />
          </button>
        )}
        <p className="text-white font-medium font-figtree text-3xl sm:text-lg">
          {getPageTitle(pathname)}
        </p>
      </div>

      <NavbarUserProfile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  )
}

export default Navbar

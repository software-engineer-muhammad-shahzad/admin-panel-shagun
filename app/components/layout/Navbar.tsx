"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu } from "lucide-react"
import NavbarUserProfile from "./NavbarUserProfile"

interface NavbarProps {
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps = {}) => {

  return (
    <div className="rounded-[30px] flex justify-between items-center p-3 sm:p-4">
      <div className="flex items-center gap-3">
        {/* Hamburger menu button - only on mobile */}
        {setSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:text-[#5FDA78] transition-colors p-1"
          >
            <Menu size={20} />
          </button>
        )}
        <p className="text-white font-semibold text-base sm:text-lg">Dashboard</p>
      </div>

      {/* Profile dropdown component */}
      <NavbarUserProfile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  )
}

export default Navbar
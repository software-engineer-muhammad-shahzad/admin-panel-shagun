"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "../components/layout/Sidebar"
import Navbar from "../components/layout/Navbar"
import { Menu, X } from "lucide-react"


const layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    // Auto-hide sidebar on responsive screens when route changes
    useEffect(() => {
        const handleRouteChange = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false)
            }
        }

        window.addEventListener('resize', handleRouteChange)
        return () => {
            window.removeEventListener('resize', handleRouteChange)
        }
    }, [pathname])

    // Handle route changes
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false)
        }
    }, [pathname])

    return (
        <div className="h-screen flex bg-[#350366] overflow-hidden">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-[#320065] z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 lg:relative lg:inset-auto lg:left-auto z-50
                ${sidebarOpen ? 'translate-x-0   ' : '-translate-x-full lg:translate-x-0'}
                transition-transform duration-300 ease-in-out
                border border-[#5FDA78] px-4 sm:px-6 py-4 sm:py-6 rounded-none lg:rounded-[30px] 
                w-[240px] sm:w-[265px]   md:glass-card shrink-0
                h-full lg:h-auto
                lg:mt-4 lg:ml-4 lg:mr-4 lg:mb-4
                overflow-y-auto lg:overflow-y-visible  glass-card
            `}>
                <Sidebar />
                {/* Mobile close button */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 lg:hidden text-white hover:text-[#5FDA78] transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden mt-4 lg:mt-4 mr-4 lg:mr-4 mb-4 lg:mb-4">
                {/* Mobile navbar - always visible with hamburger button */}
                <div className="lg:hidden shrink-0 glass-card rounded-[30px] border-[0.5px] border-[#5FDA78] mx-4 mt-4">
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>

                {/* Desktop navbar - fixed */}
                <div className="hidden h-[80px] lg:block shrink-0 glass-card items-center rounded-[30px] border-[0.5px] border-[#5FDA78] mx-4 mt-4">
                    <Navbar />
                </div>
            
                {/* Main content - proper scrolling within borders */}
                <main className="glass-card rounded-[30px] mt-5 lg:mt-5 border-[0.5px] border-[#5FDA78] flex-1 min-h-0 overflow-hidden mx-4 mb-4 lg:mx-4 lg:mb-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default layout
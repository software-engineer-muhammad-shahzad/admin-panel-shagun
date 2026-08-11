"use client"

import { useState } from "react"
import { X, MoveLeft } from "lucide-react"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import RolesList from "./RolesList"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import { useAdminUsers } from "@/app/features/user/hooks/useAdminUsers"
import { AdminUser } from "@/app/features/user/types/adminUser"
import { UserRole } from "@/app/shared/enums"

interface AssignRolesProps {
  onClose: () => void
}

const AssignRoles = ({ onClose }: AssignRolesProps) => {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

  const { data, isLoading } = useAdminUsers({
    search: search || undefined,
    userRole: UserRole.Admin,
  })
  const users = data?.items ?? []

  const isAdminRole = (role?: string) => {
    if (role == null) return false
    return role.trim().toLowerCase() === 'admin'
  }

  const filtered = users.filter((u) => {
    if (!isAdminRole(u.userRole)) return false
    if (u.moduleAccess?.trim()) return false
    if (!search) return true
    const q = search.toLowerCase()
    return (
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  })

  return (
    <ModalLayer
      onClose={onClose}
      modalWidth="min(95%, 700px)"
      modalHeight="80vh"
      className="glass-card border border-[#5FDA78] p-4 sm:p-6 flex flex-col"
      overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
      position="center"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <MoveLeft size={18} className="text-white shrink-0" />
          <h2 className="text-white text-lg sm:text-xl font-semibold">Assign Roles</h2>
        </div>
        <Button
          onClick={onClose}
          className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none shrink-0"
        >
          <X size={18} className="group-hover:text-white" />
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4 shrink-0">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm outline-0 w-full! placeholder:text-light-text text-light-text"
          containerClassName="border border-[#C9C9C9] w-full! rounded-lg glass-border bg-transparent"
        />
      </div>

      {/* User List */}
      <div className="flex flex-col gap-2 sm:gap-3 overflow-y-auto flex-1 min-h-0 scrollbar-hide pr-1">
        {isLoading ? (
          <p className="text-white/60 text-sm text-center py-8">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/60 text-sm text-center py-8">No users found</p>
        ) : (
          filtered.map((user, index) => (
            <div
              key={user.userId}
              className="flex items-center justify-between gap-3 px-3 py-2 sm:py-3 rounded-xl glass-border"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md text-white text-xs font-semibold border border-[#5FDA78] shrink-0">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs sm:text-sm font-medium truncate">{user.fullName || "—"}</p>
                  <p className="text-white/50 text-xs truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className="glass-card text-xs sm:text-sm text-[#30B052] py-1 px-2 sm:px-3 rounded-2xl hover:bg-[#5FDA78]/20 transition-colors shrink-0 whitespace-nowrap"
              >
                Assign Now
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-4 shrink-0">
        <Button
          onClick={onClose}
          className="text-white font-light w-full sm:w-fit! px-8! py-2! hover:bg-[#4FB860]"
        >
          Close
        </Button>
      </div>

      {/* RolesList Modal */}
      {selectedUser && (
        <RolesList
          onClose={() => setSelectedUser(null)}
          onParentClose={onClose}
          user={selectedUser}
        />
      )}
    </ModalLayer>
  )
}

export default AssignRoles

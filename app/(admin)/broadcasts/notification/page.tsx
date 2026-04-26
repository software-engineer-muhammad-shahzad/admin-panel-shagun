"use client"

import { useState } from "react"
import Table from "@/app/components/elements/Table";
import Input from "@/app/components/elements/Input";
import { filterData } from "@/app/lib/utils/SearchUtils";
import { announcementData, announcementColumns } from "@/app/components/data/MockData";
import { CirclePlus, Eye } from "lucide-react";
import NotificationModal from "@/app/components/notifications/NotificationModal";
import ViewNotification from "@/app/components/notifications/ViewNotification";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [notificationData, setNotificationData] = useState<any>(null)

  // Filter payments based on search term using SearchUtils
  const filteredPayments = filterData(announcementData, searchTerm);

  return (
    <div className="w-full  flex relative flex-col  h-[calc(100vh-200px)]">
      {/* search - fixed at top */}
      <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
        <div className="w-full   lg:max-w-[350px]">
          <Input
            type="text"
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm outline-0  w-full!  placeholder:text-light-text text-light-text"
            containerClassName="border border-[#C9C9C9] w-full!  rounded-lg glass-border bg-transparent"
          />
        </div>
        {/* calendar and  payment configuration */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center">
          <div 
            className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
            onClick={() => setIsModalOpen(true)}
          >
             <CirclePlus size={15} />
             <p className="text-[#360567] text-md font-semibold text-nowrap">Add New</p>
          </div>
        </div>

      </div>
      {/* table - scrollable */}
      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide ">
        <Table
          data={filteredPayments}
          columns={announcementColumns.map(col => 
            col.key === "Action" 
              ? {
                  ...col,
                  render: (value: any, row: any, index: number) => (
                    <span 
                      className="w-8 h-8 p-1 py-1 flex items-center justify-center border border-white/10  gap-2 rounded-full glass-border text-xs cursor-pointer hover:bg-white/5"
                      onClick={(e) => {
                        e.stopPropagation()
                        setNotificationData(row)
                        setIsViewModalOpen(true)
                      }}
                    >
                      <Eye size={14} />
                    </span>
                  )
                }
              : col
          )}
          onRowClick={(row, index) => console.log("Row clicked:", row, index)}
          className="rounded-lg"
          emptyMessage="No payments found"
        />
      </div>

      {/* Notification Modal */}
      {isModalOpen && (
        <NotificationModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
      
      {/* View Notification Modal */}
      {isViewModalOpen && <ViewNotification onClose={() => setIsViewModalOpen(false)} notificationData={notificationData} />}
    </div>
  )
}

export default page
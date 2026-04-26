"use client"

import { useState } from "react"
import Table from "@/app/components/elements/Table";
import Input from "@/app/components/elements/Input";
import { filterData } from "@/app/lib/utils/SearchUtils";
import { coupleData } from "@/app/components/data/MockData";
import { CirclePlus, Edit, Eye, Trash2 } from "lucide-react";
import DeleteCouple from "@/app/components/couple/DeleteCouple";
import AddCouple from "@/app/components/couple/AddCouple";
import ViewCouple from "@/app/components/couple/ViewCouple";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editData, setEditData] = useState<any>(null)

  // Custom couple columns with delete functionality
  const customCoupleColumns = [
    {
        key: "id",
        label: "ID",
        width: "100px",
        render: (value: any, row: any, index: number) => `#${value}`
    },
    {
        key: "adminName",
        label: " Full Name",
        width: "180px",
        render: (value: any, row: any, index: number) => value || "N/A"
    },
    {
        key: "partnerName",
        label: "Patner Name",
        width: "100px",
        render: (value: any, row: any, index: number) => `#${value}`
    },
    {
        key: "contactNo",
        label: "Contact No.",
        width: "100px",
        render: (value: any, row: any, index: number) => `#${value}`
    },
    {
        key: "email",
        label: " Email",
        width: "180px",
        render: (value: any, row: any, index: number) => value || "N/A"
    },
    {
        key: "coupleId",
        label: "Date & Time",
        width: "120px",
        render: (value: any, row: any, index: number) => value
    },
    {
        key: "lastActive",
        label: "Status",
        width: "120px",
        render: (value: any, row: any, index: number) => (
            <span className={`px-3 py-1 flex items-center w-fit gap-2 rounded  glass-border text-xs ${value === "Active" ? " text-[#30B052]" :
                value === "Inactive" ? " text-[#FF0000]" :
                    ""
                }`}>
                <div className={`w-2 h-2 rounded-full ${value === "Active" ? "bg-[#30B052]" :
                    value === "Inactive" ? "bg-[#FF0000]" : "bg-gray-600"
                    }`}></div>
                {value}
            </span>
        )
    },
    {
        key: "Action",
        label: "Action",
        render: (value: any, row: any, index: number) => (
            <div className="flex items-center gap-2">
                {/* Edit */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
                    onClick={(e) => {
                        e.stopPropagation()
                        setEditData(row)
                        setEditModalOpen(true)
                    }}>
                    <Edit size={14} />
                </span>
                {/* View */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5"
                    onClick={(e) => {
                        e.stopPropagation()
                        setEditData(row)
                        setViewModalOpen(true)
                    }}>
                    <Eye size={14} />
                </span>
                {/* Delete */}
                <span 
                    className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20"
                    onClick={(e) => {
                        e.stopPropagation()
                        setDeleteModalOpen(true)
                    }}
                >
                    <Trash2 size={14} />
                </span>
            </div>
        )
    }
  ]

  // Filter payments based on search term using SearchUtils
  const filteredPayments = filterData(coupleData, searchTerm);

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
      </div>
      {/* table - scrollable */}
      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide ">
        <Table
          data={filteredPayments}
          columns={customCoupleColumns}
          onRowClick={(row, index) => console.log("Row clicked:", row, index)}
          className="rounded-lg"
          emptyMessage="No payments found"
        />
      </div>
      {/* Delete Couple Modal */}
      {deleteModalOpen && <DeleteCouple onClose={() => setDeleteModalOpen(false)} />}
      
      {/* Edit Couple Modal */}
      {editModalOpen && <AddCouple onClose={() => setEditModalOpen(false)} editData={editData} mode="edit" />}
      
      {/* View Couple Modal */}
      {viewModalOpen && <ViewCouple onClose={() => setViewModalOpen(false)} coupleData={editData} />}
    </div>
  )
}

export default page
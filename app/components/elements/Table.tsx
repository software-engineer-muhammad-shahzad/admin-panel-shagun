"use client"

import React from "react"

interface TableColumn<T> {
  key: string
  label: string
  render?: (value: T, row: any, index: number) => React.ReactNode
  className?: string
  width?: string
}

interface TableAction {
  label: string
  onClick: (row: any, index: number) => void
  className?: string
  icon?: React.ReactNode
}

interface TableProps<T> {
  data: any[]
  columns: TableColumn<T>[]
  actions?: TableAction[]
  className?: string
  onRowClick?: (row: any, index: number) => void
  emptyMessage?: string
  loading?: boolean
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  className = "",
  onRowClick,
  emptyMessage = "No data available",
  loading = false
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto scrollbar-hide ${className}`}>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-white text-sm">Loading...</div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-white text-sm">{emptyMessage}</div>
        </div>
      ) : (
        <table className="w-full text-sm" style={{ tableLayout: 'auto' }}>
          <thead>
            <tr className="border-b border-[#C9C9C9]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left py-3 px-6  text-nowrap text-[16px] font-semibold text-[#8E8E8E] ${column.className || ""}`}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="text-right py-3 px-4 font-medium text-light-text">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#C9C9C9]   hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={() => onRowClick?.(row, index)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-3 px-6 font-medium text-nowrap text-white ${column.className || ""}`}
                    // style={{ color: '#8E8E8E' }}
                  >
                    {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="py-3 px-4 ">
                    <div className="flex justify-end gap-2 ">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row, index)}
                          className={`flex items-center gap-2 border px-3 py-1.5 rounded text-xs transition-colors ${
                            action.className || "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Table
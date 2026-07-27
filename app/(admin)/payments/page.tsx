"use client"

import { useRef, useState, useEffect } from "react"
import { CalendarDays, CirclePlus, ImagePlus, MoveLeft, X } from "lucide-react"
import Image from "next/image"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import SuccessModal from "@/app/shared/components/modal/SuccessModal"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Button from "@/app/shared/components/elements/Button"
import { useAddGift } from "@/app/features/payments/hooks/useAddGift"
import { useGetPaymentConfig } from "@/app/features/payments/hooks/useGetPaymentConfig"
import { useGetTransactions } from "@/app/features/payments/hooks/useGetTransactions"
import { baseURL } from "@/app/services/apiClient"

const MAX_IMAGES = 4

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Completed: { bg: "bg-green-500/20", text: "text-green-400", dot: "bg-green-400" },
  Failed: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-400" },
  Processing: { bg: "bg-blue-500/20", text: "text-blue-400", dot: "bg-blue-400" },
  Pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400" },
  Cancelled: { bg: "bg-gray-500/20", text: "text-gray-400", dot: "bg-gray-400" },
}

const transactionColumns = [
  {
    key: "id",
    label: "Txn ID",
    width: "90px",
    render: (value: any) => value ? `#${value}` : "—",
  },
  {
    key: "guestFullName",
    label: "Guest",
    width: "150px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "greetingMediaType",
    label: "Gift",
    width: "80px",
    render: (value: any) =>
      value === "Image" ? "Card" : value === "Video" ? "Video" : "—",
  },
  {
    key: "attach",
    label: "Attach",
    width: "80px",
    render: (_value: any, row: any) => row?.greetingMediaType ? "Yes" : "No",
  },
  {
    key: "attachFee",
    label: "Attach Fee",
    width: "105px",
    render: (_value: any, row: any) => {
      const fee = (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0)
      return `£${fee.toFixed(2)}`
    },
  },
  {
    key: "totalPaid",
    label: "Total Paid",
    width: "105px",
    render: (_value: any, row: any) => {
      const total = (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0) + (row?.platformFee ?? 0) + (row?.stripeFee ?? 0)
      return `£${total.toFixed(2)}`
    },
  },
  {
    key: "feePercent",
    label: "Fee %",
    width: "80px",
    render: (_value: any, row: any) => {
      const giftTotal = (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0)
      if (!giftTotal) return "—"
      return `${((row?.platformFee ?? 0) / giftTotal * 100).toFixed(0)}%`
    },
  },
  {
    key: "platformFee",
    label: "Platform Fee",
    width: "115px",
    render: (value: any) => `£${Number(value ?? 0).toFixed(2)}`,
  },
  {
    key: "stripeFee",
    label: "Stripe Fee",
    width: "105px",
    render: (value: any) => `£${Number(value ?? 0).toFixed(2)}`,
  },
  {
    key: "platformNet",
    label: "Platform Net",
    width: "115px",
    render: (_value: any, row: any) => {
      const net = (row?.platformFee ?? 0) - (row?.stripeFee ?? 0)
      return `£${net.toFixed(2)}`
    },
  },
  {
    key: "netToCouple",
    label: "Net to Couple",
    width: "125px",
    render: (_value: any, row: any) => {
      const net = (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0) - (row?.platformFee ?? 0)
      return `£${net.toFixed(2)}`
    },
  },
  {
    key: "status",
    label: "Status",
    width: "120px",
    render: (value: any) => {
      const c = STATUS_COLORS[value] ?? { bg: "bg-white/10", text: "text-white/60", dot: "bg-white/40" }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 w-fit ${c.bg} ${c.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
          {value ?? "—"}
        </span>
      )
    },
  },
]

const PAGE_SIZE = 10

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [appliedStart, setAppliedStart] = useState("")
  const [appliedEnd, setAppliedEnd] = useState("")
  const dateRangeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(e.target as Node)) {
        setDateRangeOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null])
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null])
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const EMPTY_FORM = { cardPrice: "", videoPrice: "", platformFee: "" }
  const [formFields, setFormFields] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [existingImageUrls, setExistingImageUrls] = useState<(string | null)[]>([null, null, null, null])

  const resetForm = () => {
    setFormFields(EMPTY_FORM)
    setFormErrors({})
    setExistingImageUrls([null, null, null, null])
  }

  const openModal = async () => {
    resetForm()
    setIsModalOpen(true)
    const result = await refetch()
    const config = result.data
    if (config) {
      setFormFields({
        cardPrice: config.cardPrice != null ? String(config.cardPrice) : "",
        videoPrice: config.videoPrice != null ? String(config.videoPrice) : "",
        platformFee: config.platformFeePercent != null ? String(config.platformFeePercent) : "",
      })
      const urls: (string | null)[] = [null, null, null, null]
      config.greetingCards?.slice(0, MAX_IMAGES).forEach((card, i) => {
        if (card.cardImagePath) urls[i] = `${baseURL.replace(/\/$/, "")}/${card.cardImagePath}`
      })
      setExistingImageUrls(urls)
    }
  }

  const closeModal = () => {
    resetForm()
    setIsModalOpen(false)
  }

  const handlePriceInput = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
    setFormFields(prev => ({ ...prev, [field]: value }))
    setFormErrors(prev => ({ ...prev, [field]: "" }))
  }

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {}
    if (!formFields.cardPrice) errs.cardPrice = "Card price is required"
    else if (isNaN(Number(formFields.cardPrice)) || Number(formFields.cardPrice) <= 0) errs.cardPrice = "Enter a valid positive price"
    if (!formFields.videoPrice) errs.videoPrice = "Video price is required"
    else if (isNaN(Number(formFields.videoPrice)) || Number(formFields.videoPrice) <= 0) errs.videoPrice = "Enter a valid positive price"
    if (formFields.platformFee === "") errs.platformFee = "Platform fee is required"
    else if (isNaN(Number(formFields.platformFee)) || Number(formFields.platformFee) < 0 || Number(formFields.platformFee) > 100) errs.platformFee = "Enter a value between 0 and 100"
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const { mutate: addGift, isPending } = useAddGift()
  const { refetch } = useGetPaymentConfig()

  useEffect(() => { setCurrentPage(1) }, [searchTerm, appliedStart, appliedEnd])

  const { data: rawTransactions, isLoading } = useGetTransactions({
    ...(searchTerm ? { search: searchTerm } : {}),
    ...(appliedStart ? { startDate: new Date(appliedStart).toISOString() } : {}),
    ...(appliedEnd ? { endDate: new Date(appliedEnd).toISOString() } : {}),
  })

  const allTransactions = Array.isArray(rawTransactions) ? rawTransactions : []
  const totalOverall = allTransactions.length
  const totalPages = Math.ceil(totalOverall / PAGE_SIZE)
  const offset = (currentPage - 1) * PAGE_SIZE
  const transactions = allTransactions.slice(offset, offset + PAGE_SIZE)

  const handleImageSelect = (index: number, file: File) => {
    const newImages = [...images]
    newImages[index] = file
    setImages(newImages)

    const newPreviews = [...previews]
    newPreviews[index] = URL.createObjectURL(file)
    setPreviews(newPreviews)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages[index] = null
    setImages(newImages)

    const newPreviews = [...previews]
    if (previews[index]) URL.revokeObjectURL(previews[index]!)
    newPreviews[index] = null
    setPreviews(newPreviews)
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    const selectedFiles = images.filter((f): f is File => f !== null)
    const hasExisting = existingImageUrls.some(Boolean)
    if (selectedFiles.length === 0 && !hasExisting) return

    addGift(
      {
        images: selectedFiles,
        cardPrice: Number(formFields.cardPrice),
        videoPrice: Number(formFields.videoPrice),
        platformFeePercent: Number(formFields.platformFee),
      },
      {
        onSuccess: () => {
          closeModal()
          setIsSuccessModalOpen(true)
          setImages([null, null, null, null])
          setPreviews([null, null, null, null])
          refetch()
        },
      }
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* search - fixed at top */}
      <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b shrink-0 gap-4">
        <div className="w-full lg:max-w-[350px]">
          <Input
            type="text"
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm outline-0 w-full placeholder:text-light-text text-light-text"
            containerClassName="border border-[#C9C9C9] w-full rounded-lg glass-border bg-transparent"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center">
          {/* Date Range Picker */}
          <div ref={dateRangeRef} className="relative w-full sm:w-auto">
            <button
              onClick={() => setDateRangeOpen(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 border border-[#5FDA78] rounded-full text-sm text-white bg-[#5FDA78]/10 shadow-[0_0_18px_rgba(95,218,120,0.2)] hover:bg-[#5FDA78]/20 hover:shadow-[0_0_24px_rgba(95,218,120,0.35)] transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <CalendarDays size={15} className="text-[#5FDA78]" />
              <span>
                {appliedStart && appliedEnd
                  ? `${appliedStart} → ${appliedEnd}`
                  : appliedStart
                    ? `From ${appliedStart}`
                    : "Select Range"}
              </span>
            </button>

            {dateRangeOpen && (
              <div className="absolute top-full mt-2 right-0 z-50 bg-[#1e0040] border border-[#5FDA78]/50 rounded-2xl p-4 flex flex-col gap-3 w-64 shadow-2xl">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-white/90 font-medium">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="bg-[#2a0050] border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#5FDA78] transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-white/90 font-medium">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-[#2a0050] border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#5FDA78] transition-colors w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAppliedStart("")
                      setAppliedEnd("")
                      setStartDate("")
                      setEndDate("")
                      setDateRangeOpen(false)
                    }}
                    className="flex-1 py-1.5 text-xs rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => {
                      setAppliedStart(startDate)
                      setAppliedEnd(endDate)
                      setDateRangeOpen(false)
                    }}
                    disabled={!startDate || !endDate}
                    className="flex-1 py-1.5 text-xs rounded-lg bg-[#5FDA78] text-[#360567] font-semibold hover:bg-[#4FB860] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
            onClick={openModal}
          >
            <CirclePlus size={15} />
            <p className="text-[#360567] font-poppins text-md font-semibold text-nowrap">Payment Configuration</p>
          </div>
        </div>
      </div>

      {/* table - scrollable */}
      <div className="flex-1 overflow-auto scrollbar-hide">
        <Table
          data={transactions}
          columns={transactionColumns}
          className="rounded-lg"
          emptyMessage={isLoading ? "Loading..." : "No transactions found"}
        />
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center py-4 pb-8">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-[#5FDA78]  disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...")
                acc.push(p)
                return acc
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span key={`ellipsis-${idx}`} className="w-8 text-center text-white/30 text-sm">...</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item as number)}
                    className={`w-8 h-8 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${currentPage === item
                      ? "bg-white text-[#360567]"
                      : "text-[#999999] hover:text-white"
                      }`}
                  >
                    {item}
                  </button>
                )
              )
            }

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-[#5FDA78]  disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Payment Configuration Modal */}
      {isModalOpen && (
        <ModalLayer
          onClose={closeModal}
          modalWidth="80%"
          modalHeight="80vh"
          className="glass-card border border-[#5FDA78] p-4 sm:p-6"
          overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
          position="center"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <MoveLeft className="text-white" />
              <h2 className="text-white text-xl font-semibold">Payment Configuration</h2>
            </div>
            <Button
              onClick={closeModal}
              className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
            >
              <X size={20} className="group-hover:text-white" />
            </Button>
          </div>

          <div className="flex flex-col gap-4 max-h-[60vh] p-2 overflow-y-auto scrollbar-hide">

            {/* Image Upload Grid */}
            <div>
              <p className="text-white text-sm font-medium mb-3 ms-1">
                Gift Images <span className="text-[#C9C9C9] font-light">(max {MAX_IMAGES})</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: MAX_IMAGES }).map((_, index) => (
                  <div key={index} className="relative">
                    <input
                      ref={fileInputRefs[index]}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageSelect(index, file)
                        e.target.value = ""
                      }}
                    />

                    {previews[index] ? (
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#5FDA78]">
                        <Image src={previews[index]!} alt={`gift-${index + 1}`} fill className="object-cover" />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ) : existingImageUrls[index] ? (
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/30">
                        <Image src={existingImageUrls[index]!} alt={`existing-${index + 1}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={() => fileInputRefs[index].current?.click()}
                            className="text-xs text-white bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors"
                          >
                            Replace
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRefs[index].current?.click()}
                        className="w-full aspect-square rounded-2xl border border-dashed border-[#5FDA78]/50 flex flex-col items-center justify-center gap-2 hover:border-[#5FDA78] hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <ImagePlus size={22} className="text-[#5FDA78]/70" />
                        <span className="text-[#C9C9C9] text-xs text-center leading-tight">
                          Select Image
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs Group */}
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <Input
                  type="text"
                  label="Card Price (in £)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter"
                  value={formFields.cardPrice}
                  onChange={handlePriceInput("cardPrice")}
                  className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
                {formErrors.cardPrice && <p className="text-red-400 text-xs mt-1 ms-5">{formErrors.cardPrice}</p>}
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  label="Video Price (in £)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter"
                  value={formFields.videoPrice}
                  onChange={handlePriceInput("videoPrice")}
                  className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
                {formErrors.videoPrice && <p className="text-red-400 text-xs mt-1 ms-5">{formErrors.videoPrice}</p>}
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  label="SD Platform Fee (in %)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter"
                  value={formFields.platformFee}
                  onChange={handlePriceInput("platformFee")}
                  className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
                {formErrors.platformFee && <p className="text-red-400 text-xs mt-1 ms-5">{formErrors.platformFee}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-2">
              <Button
                onClick={closeModal}
                className="border border-[#C9C9C9] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! bg-transparent text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={(images.every((f) => f === null) && existingImageUrls.every((u) => !u)) || isPending}
                className="text-[#360567] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! hover:bg-[#4FB860] disabled:opacity-50"
              >
                {isPending ? "Uploading..." : "Submit"}
              </Button>
            </div>
          </div>
        </ModalLayer>
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          onClose={() => setIsSuccessModalOpen(false)}
          title="Successful"
          message="Your Configuration successfully added."
          buttonText="Ok"
        />
      )}
    </div>
  )
}

export default Page

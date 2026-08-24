"use client"

import { useRef, useState, useEffect } from "react"
import { CalendarDays, CirclePlus, Copy, ImagePlus, MoveLeft, X } from "lucide-react"
import { showToast } from "@/app/lib/toast"
import Image from "next/image"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Button from "@/app/shared/components/elements/Button"
import { useUpdatePricing } from "@/app/features/payments/hooks/useUpdatePricing"
import { useGetTransactions } from "@/app/features/payments/hooks/useGetTransactions"
import { paymentService } from "@/app/features/payments/services/paymentService"
import { formatDateTime } from "@/app/shared/Common"

const MAX_IMAGES = 4

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Completed: { bg: "bg-green-500/20", text: "text-green-400", dot: "bg-green-400" },
  Failed: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-400" },
  Processing: { bg: "bg-blue-500/20", text: "text-blue-400", dot: "bg-blue-400" },
  Pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400" },
  Cancelled: { bg: "bg-gray-500/20", text: "text-gray-400", dot: "bg-gray-400" },
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    showToast.success("Copied", "Copied to clipboard")
  } catch {
    showToast.error("Copy failed", "Could not copy to clipboard")
  }
}

const CopyableId = ({
  value,
  display,
}: {
  value: string | number | null | undefined
  display: string
}) => {
  if (value == null || value === "") return <span>—</span>

  return (
    <span className="inline-flex items-center gap-1.5 max-w-full">
      <span className="truncate" title={display}>{display}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          copyToClipboard(String(value))
        }}
        className="shrink-0 p-0.5 rounded hover:bg-white/10 text-[#5FDA78] hover:text-white transition-colors cursor-pointer"
        title="Copy"
        aria-label="Copy"
      >
        <Copy size={13} />
      </button>
    </span>
  )
}

const transactionColumns = [
  {
    key: "transactionNumber",
    label: "Txn ID",
    width: "110px",
    render: (value: any) => (
      <CopyableId value={value} display={value ? `${value}` : "—"} />
    ),
  },
  {
    key: "paymentIntentId",
    label: "Stripe Txn ID",
    width: "160px",
    render: (value: any) => (
      <CopyableId value={value} display={value ? String(value) : "—"} />
    ),
  },
  {
    key: "guestFullName",
    label: "Guest",
    width: "150px",
    render: (value: any) => value || "N/A",
  },
  {
    key: "coupleFullName",
    label: "Couple",
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
    key: "attachFee",
    label: "Attach Fee",
    width: "105px",
    render: (_value: any, row: any) => {
      const fee = (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0)
      return `${row?.currencySymbol ?? '£' }${fee.toFixed(2)}`
    },
  },
  {
    key: "giftedAmount",
    label: "Gifted Amount",
    width: "105px",
    render: (_value: any, row: any) => {
      return `${row?.currencySymbol ?? '£' }${(row?.giftedAmount ?? 0).toFixed(2)}`
    },
  },
  {
    key: "platformPercentage",
    label: "Fee %",
    width: "80px",
    render: (_value: any, row: any) => {
      return `${(row?.platformPercentage ?? 0)}%`
    },
  },
  {
    key: "platformFee",
    label: "Platform Fee",
    width: "115px",
    render: (value: any, row: any) => `${row?.currencySymbol ?? '£' }${(value ?? 0).toFixed(2)}`,
  },
  {
    key: "stripeFee",
    label: "Stripe Fee",
    width: "105px",
    render: (value: any) => `£${(value ?? 0).toFixed(2)}`,
  },
  {
    key: "platformNet",
    label: "Platform Net",
    width: "115px",
    render: (_value: any, row: any) => {
      const net = (row?.platformFee ?? 0) + (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0);
      return `${row?.currencySymbol ?? '£' }${net.toFixed(2)}`
    },
  },
    {
    key: "totalAmount",
    label: "Total Amount",
    width: "125px",
    render: (_value: any, row: any) => {
      let total = (row?.wishingCardAmount ?? 0) + (row?.wishingVideoAmount ?? 0) + (row?.giftedAmount ?? 0) + (row?.platformFee ?? 0)
      return `${row?.currencySymbol ?? '£' }${total.toFixed(2)}`
    },
  },
  {
    key: "transferredToCoupleAmount",
    label: "Net to Couple",
    width: "125px",
    render: (_value: any, row: any) => {      
      return `${row?.currencySymbol ?? '£' }${row.transferredToCoupleAmount?.toFixed(2)}`
    },
  },
  {
    key: "transactionDate",
    label: "Transaction Date/Time",
    width: "125px",
    render: (_value: any, row: any) => {      
      return row.transactionDate ? `${formatDateTime(row.transactionDate)}` : "N/A"
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
  const [existingCardIds, setExistingCardIds] = useState<(number | null)[]>([null, null, null, null])
  // Survives remove + re-attach; copied on load so state mutations cannot clear it
  const slotCardIdsRef = useRef<(number | null)[]>([null, null, null, null])
  // Binds card id to the File at select-time (remove + re-attach safe)
  const fileCardIdMapRef = useRef(new WeakMap<File, number>())
  const [pricingId, setPricingId] = useState<number | null>(null)

  const resetForm = () => {
    setFormFields(EMPTY_FORM)
    setFormErrors({})
    setExistingImageUrls([null, null, null, null])
    setExistingCardIds([null, null, null, null])
    slotCardIdsRef.current = [null, null, null, null]
    fileCardIdMapRef.current = new WeakMap<File, number>()
    setPricingId(null)
  }

  const toPriceInputValue = (value: number | null | undefined) => {
    if (value == null || Number.isNaN(Number(value))) return ""
    return String(Number(value))
  }

  const validateCardPrice = (value: string) => {
    if (!value.trim()) return "Card price is required"
    const num = Number(value)
    if (isNaN(num) || num < 0) return "Enter a valid price"
    return ""
  }

  const validateVideoPrice = (value: string) => {
    if (!value.trim()) return "Video price is required"
    const num = Number(value)
    if (isNaN(num) || num < 0) return "Enter a valid price"
    return ""
  }

  const validatePlatformFee = (value: string) => {
    if (!value.trim()) return "Platform fee is required"
    const num = Number(value)
    if (isNaN(num) || num < 0 || num > 100) return "Enter a value between 0 and 100"
    return ""
  }

  const validateImages = (
    nextImages: (File | null)[] = images,
    nextExistingUrls: (string | null)[] = existingImageUrls
  ) => {
    const hasImages = nextImages.some(Boolean) || nextExistingUrls.some(Boolean)
    return hasImages ? "" : "Please upload at least one gift image"
  }

  const isFormValid =
    !validateCardPrice(formFields.cardPrice) &&
    !validateVideoPrice(formFields.videoPrice) &&
    !validatePlatformFee(formFields.platformFee) &&
    !validateImages()

  const openModal = async () => {
    resetForm()
    setImages([null, null, null, null])
    setPreviews([null, null, null, null])
    setIsModalOpen(true)

    try {
      const config = await paymentService.getPaymentConfig()

      if (!config) return

      const cardPrice = toPriceInputValue(config.cardPrice)
      const videoPrice = toPriceInputValue(config.videoPrice)
      const platformFee = toPriceInputValue(config.platformFeePercent)

      setFormFields({
        cardPrice,
        videoPrice,
        platformFee,
      })
      setPricingId(config.id ?? null)

      const urls: (string | null)[] = [null, null, null, null]
      const ids: (number | null)[] = [null, null, null, null]

      const cards = [...(config.greetingCards ?? [])]
        .filter((card) => card?.id != null)
        .sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
        .slice(0, MAX_IMAGES)

      cards.forEach((card, i) => {
        const slot =
          card.orderNo != null && card.orderNo >= 1 && card.orderNo <= MAX_IMAGES
            ? card.orderNo - 1
            : i

        ids[slot] = card.id
        const url = card.imageUrl ?? (card as { cardUrl?: string | null }).cardUrl
        if (url) urls[slot] = url
      })

      setExistingImageUrls([...urls])
      setExistingCardIds([...ids])
      slotCardIdsRef.current = [...ids]
      setFormErrors({
        cardPrice: validateCardPrice(cardPrice),
        videoPrice: validateVideoPrice(videoPrice),
        platformFee: validatePlatformFee(platformFee),
        images: validateImages([null, null, null, null], urls),
      })
    } catch {
      setFormErrors({
        cardPrice: "Failed to load pricing",
        videoPrice: "Failed to load pricing",
        platformFee: "Failed to load pricing",
      })
    }
  }

  const closeModal = () => {
    resetForm()
    setIsModalOpen(false)
  }

  const handlePriceInput = (field: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
    if (field === "cardPrice" || field === "videoPrice") {
      if (value !== "" && Number(value) > 500) return
    }
    if (field === "platformFee") {
      if (value !== "" && Number(value) > 100) return
    }
    setFormFields(prev => ({ ...prev, [field]: value }))

    const validators = {
      cardPrice: validateCardPrice,
      videoPrice: validateVideoPrice,
      platformFee: validatePlatformFee,
    } as const

    setFormErrors(prev => ({ ...prev, [field]: validators[field](value) }))
  }

  const getInputBorderClass = (field: string) =>
    formErrors[field] ? "border-red-400" : "border-[#5FDA78]"

  const { mutate: updatePricing, isPending } = useUpdatePricing()

  useEffect(() => { setCurrentPage(1) }, [searchTerm, appliedStart, appliedEnd])

  const offset = (currentPage - 1) * PAGE_SIZE

  const { data: transactionData, isLoading } = useGetTransactions({
    ...(searchTerm ? { search: searchTerm } : {}),
    ...(appliedStart ? { startDate: new Date(appliedStart).toISOString() } : {}),
    ...(appliedEnd ? { endDate: new Date(appliedEnd).toISOString() } : {}),
    offset,
    length: PAGE_SIZE,
  })

  const transactions = transactionData?.items ?? []
  const totalOverall = transactionData?.totalOverall ?? 0
  const totalPages = Math.ceil(totalOverall / PAGE_SIZE)

  const handleImageSelect = (index: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      setFormErrors((prev) => ({ ...prev, images: "Only image files are allowed" }))
      return
    }

    // Preserve original gift-card id across remove + re-attach
    const preservedId = slotCardIdsRef.current[index] ?? existingCardIds[index]
    if (preservedId != null && preservedId > 0) {
      fileCardIdMapRef.current.set(file, preservedId)
      slotCardIdsRef.current[index] = preservedId
    }

    const newImages = [...images]
    newImages[index] = file
    setImages(newImages)

    const newPreviews = [...previews]
    if (previews[index]) URL.revokeObjectURL(previews[index]!)
    newPreviews[index] = URL.createObjectURL(file)
    setPreviews(newPreviews)

    const newExistingUrls = [...existingImageUrls]
    newExistingUrls[index] = null
    setExistingImageUrls(newExistingUrls)

    setExistingCardIds((prev) => {
      const next = [...prev]
      if (preservedId != null && preservedId > 0) next[index] = preservedId
      return next
    })

    setFormErrors((prev) => ({ ...prev, images: validateImages(newImages, newExistingUrls) }))
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages[index] = null
    setImages(newImages)

    const newPreviews = [...previews]
    if (previews[index]) URL.revokeObjectURL(previews[index]!)
    newPreviews[index] = null
    setPreviews(newPreviews)

    const newExistingUrls = [...existingImageUrls]
    newExistingUrls[index] = null
    setExistingImageUrls(newExistingUrls)

    // Keep existingCardIds so remove + re-attach still sends the original card id
    setFormErrors((prev) => ({ ...prev, images: validateImages(newImages, newExistingUrls) }))
  }

  const handleSubmit = () => {
    if (!isFormValid) return

    // Only include slots with a newly selected file (ImageFile is required by API).
    // Existing unchanged images are left as-is on the server.
    const giftCards: { id?: number; orderNo?: number; imageFile: File }[] = []
    let displayOrder = 1

    for (let i = 0; i < MAX_IMAGES; i++) {
      const file = images[i]
      const existingUrl = existingImageUrls[i]
      const existingId =
        (file ? fileCardIdMapRef.current.get(file) : undefined) ??
        slotCardIdsRef.current[i] ??
        existingCardIds[i]

      if (!file && !existingUrl) continue

      if (file) {
        giftCards.push({
          id: existingId ?? 0,
          orderNo: displayOrder,
          imageFile: file,
        })
      }
      displayOrder += 1
    }

    const isUpdate = pricingId != null

    updatePricing(
      {
        isUpdate,
        id: isUpdate ? pricingId! : 0,
        cardPrice: Number(formFields.cardPrice),
        videoPrice: Number(formFields.videoPrice),
        platformFeePercent: Number(formFields.platformFee),
        giftCards: giftCards.length ? giftCards : null,
      },
      {
        onSuccess: () => {
          closeModal()
          setImages([null, null, null, null])
          setPreviews([null, null, null, null])
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
          className="glass-card border border-[#5FDA78] p-4 sm:p-6 flex flex-col"
          overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
          position="center"
        >
          <div className="flex justify-between items-center mb-4 shrink-0">
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

          <div className="flex flex-col gap-4 flex-1 min-h-0 p-2 overflow-y-auto scrollbar-hide">

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
                      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-[#5FDA78]">
                        <Image src={previews[index]!} alt={`gift-${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 z-10 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ) : existingImageUrls[index] ? (
                      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/30">
                        <Image src={existingImageUrls[index]!} alt={`existing-${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 z-10 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRefs[index].current?.click()}
                        className={`w-full aspect-[9/16] rounded-2xl border border-dashed flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer ${
                          formErrors.images ? "border-red-400" : "border-[#5FDA78]/50 hover:border-[#5FDA78]"
                        }`}
                      >
                        <ImagePlus size={22} className={formErrors.images ? "text-red-400" : "text-[#5FDA78]/70"} />
                        <span className="text-[#C9C9C9] text-xs text-center leading-tight">
                          Select Image
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {formErrors.images && <p className="text-red-400 text-xs mt-2 ms-1">{formErrors.images}</p>}
            </div>

            {/* Inputs Group */}
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <Input
                  type="text"
                  label="Card Price (in £)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter"
                  maxLength={3}
                  value={formFields.cardPrice}
                  onChange={handlePriceInput("cardPrice")}
                  className={`text-sm outline-0 px-5 py-4 border ${getInputBorderClass("cardPrice")} rounded-[70px] glass-card placeholder:text-light-text text-light-text`}
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
                  maxLength={3}
                  value={formFields.videoPrice}
                  onChange={handlePriceInput("videoPrice")}
                  className={`text-sm outline-0 px-5 py-4 border ${getInputBorderClass("videoPrice")} rounded-[70px] glass-card placeholder:text-light-text text-light-text`}
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
                  maxLength={2}
                  value={formFields.platformFee}
                  onChange={handlePriceInput("platformFee")}
                  className={`text-sm outline-0 px-5 py-4 border ${getInputBorderClass("platformFee")} rounded-[70px] glass-card placeholder:text-light-text text-light-text`}
                  containerClassName="border-none bg-transparent"
                />
                {formErrors.platformFee && <p className="text-red-400 text-xs mt-1 ms-5">{formErrors.platformFee}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons — pinned below scroll area */}
          <div className="flex justify-center gap-4 mt-4 pt-2 shrink-0">
            <Button
              onClick={closeModal}
              className="border border-[#C9C9C9] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isPending}
              className="text-[#360567] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! hover:bg-[#4FB860] disabled:opacity-50"
            >
              {isPending ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </ModalLayer>
      )}

    </div>
  )
}

export default Page

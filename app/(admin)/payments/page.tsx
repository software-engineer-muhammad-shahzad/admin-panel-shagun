"use client"

import { useRef, useState } from "react"
import { CirclePlus, ImagePlus, MoveLeft, X } from "lucide-react"
import Image from "next/image"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import SuccessModal from "@/app/shared/components/modal/SuccessModal"
import Input from "@/app/shared/components/elements/Input"
import Table from "@/app/shared/components/elements/Table"
import Button from "@/app/shared/components/elements/Button"
import { useAddGift } from "@/app/features/payments/hooks/useAddGift"
import { useGetPaymentConfig } from "@/app/features/payments/hooks/useGetPaymentConfig"
import { baseURL } from "@/app/services/apiClient"

const MAX_IMAGES = 4

const greetingCardColumns = [
  { key: "id", label: "ID" },
  {
    key: "cardImagePath",
    label: "Image",
    render: (value: any) =>
      value ? (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20">
          <Image
            src={`${baseURL}/${value}`}
            alt="card"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <span className="text-[#C9C9C9] text-xs">—</span>
      ),
  },
  {
    key: "cardPrice",
    label: "Card Price",
    render: (value: any) => `£${Number(value).toFixed(2)}`,
  },
  {
    key: "videoPrice",
    label: "Video Price",
    render: (value: any) => `£${Number(value).toFixed(2)}`,
  },
  {
    key: "platformFeePercent",
    label: "Platform Fee",
    render: (value: any) => `${Number(value).toFixed(2)}%`,
  },
  {
    key: "createdOn",
    label: "Created On",
    render: (value: any) => (value ? new Date(value).toLocaleDateString() : "—"),
  },
  {
    key: "recordStatus",
    label: "Status",
    render: (value: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 1 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
        }`}
      >
        {value === 1 ? "Active" : "Inactive"}
      </span>
    ),
  },
]

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null])
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null])
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const { mutate: addGift, isPending } = useAddGift()
  const { data: paymentConfig, isLoading, refetch } = useGetPaymentConfig()

  const greetingCards = paymentConfig?.greetingCards ?? []

  const filtered = greetingCards.filter((card) =>
    String(card.id).includes(searchTerm) ||
    card.cardImagePath.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    const selectedFiles = images.filter((f): f is File => f !== null)
    if (selectedFiles.length === 0) return

    addGift(selectedFiles, {
      onSuccess: () => {
        setIsModalOpen(false)
        setIsSuccessModalOpen(true)
        setImages([null, null, null, null])
        setPreviews([null, null, null, null])
        refetch()
      },
    })
  }

  return (
    <div className="w-full flex relative flex-col h-[calc(100vh-200px)]">
      {/* search - fixed at top */}
      <div className="flex flex-col  lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
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
          <div className="w-full sm:w-auto sm:max-w-[200px]">
            <Input
              type="date"
              placeholder="Select Date"
              className="text-sm outline-0 placeholder:text-light-text text-light-text"
              containerClassName="border border-green-text rounded-lg glass-border bg-transparent"
            />
          </div>
          <div
            className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <CirclePlus size={15} />
            <p className="text-[#360567] font-poppins text-md font-semibold text-nowrap">Payment Configuration</p>
          </div>
        </div>
      </div>

      {/* table - scrollable */}
      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide">
        <Table
          data={filtered}
          columns={greetingCardColumns}
          className="rounded-lg"
          emptyMessage={isLoading ? "Loading..." : "No greeting cards found"}
        />
      </div>

      {/* Payment Configuration Modal */}
      {isModalOpen && (
        <ModalLayer
          onClose={() => setIsModalOpen(false)}
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
              onClick={() => setIsModalOpen(false)}
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
                        <Image
                          src={previews[index]!}
                          alt={`gift-${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <X size={12} className="text-white" />
                        </button>
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
                  className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  label="Video Price (in £)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter"
                  className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  label="SD Platform Fee (in %)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter"
                  className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="border border-[#C9C9C9] font-semibold w-full max-w-[100px]! md:w-fit! px-12! py-2! bg-transparent text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={images.every((f) => f === null) || isPending}
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

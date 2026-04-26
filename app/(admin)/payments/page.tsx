"use client"

import { useState } from "react"
import Table from "@/app/components/elements/Table";
import Input from "@/app/components/elements/Input";
import Button from "@/app/components/elements/Button";
import { filterData } from "@/app/lib/utils/SearchUtils";
import { paymentsData, paymentsColumns } from "@/app/components/data/MockData";
import { CirclePlus, MoveLeft, X } from "lucide-react";
import ModalLayer from "@/app/components/ui/modal/ModalLayer";
import SuccessModal from "@/app/components/ui/modal/SuccessModal";
import Image from "next/image";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const filteredPayments = filterData(paymentsData, searchTerm);

  return (
    <div className="w-full flex relative flex-col h-[calc(100vh-200px)]">
      {/* search - fixed at top */}
      <div className="flex flex-col lg:flex-row justify-between border-[#C9C9C9] px-4 lg:px-6 py-4 lg:py-6 border-b flex-shrink-0 gap-4">
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
              className="text-sm outline-0 placeholder:text-light-text text-light-text "
              containerClassName="border border-green-text rounded-lg glass-border bg-transparent"
            />
          </div>
          <div
            className="flex gap-2 bg-[#5FDA78] rounded-[56px] py-[10px] px-3 cursor-pointer items-center w-full sm:w-auto justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <CirclePlus size={15} />
            <p className="text-[#360567] text-md font-semibold text-nowrap">Payment Configuration</p>
          </div>
        </div>
      </div>

      {/* table - scrollable */}
      <div className="flex-1 h-[calc(100vh-200px)] overflow-auto scrollbar-hide ">
        <Table
          data={filteredPayments}
          columns={paymentsColumns}
          onRowClick={(row, index) => console.log("Row clicked:", row, index)}
          className="rounded-lg"
          emptyMessage="No payments found"
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
             <MoveLeft  className="text-white"/>
            <h2 className="text-white text-xl font-semibold">Payment Configuration</h2>
            </div>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none   "
            >
              <X size={20} className="group-hover:text-white" />
            </Button>
          </div>

          <div className="flex flex-col gap-2 max-h-[60vh] p-2 overflow-y-auto scrollbar-hide sm:overflow-y-visible">
            {/* Inputs Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2   md:px-5  gap-4 w-full">

              <div className="flex justify-center sm:justify-start">

                <Image src="/images/dashboard/imagePayment.svg" alt="error" width={100} height={100} />
              </div>
              {/* Stripe Fee */}
              <div className="flex-1 ">
                <Input
                  type="text"
                  label="Card Price (in £)"
                  labelColor="ms-5 mb-1"
                  paddingClass="px-0! md:px-5!"
                  placeholder="Enter "
                  className="text-sm outline-0 px-5 py-4 w-full!  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Platform Fee */}
               <div className="flex-1 ">
                <Input
                  type="text"
                  label="Video Price (in £) "
                  labelColor="ms-5 mb-1"
                  placeholder="Enter "
                    paddingClass="px-0! md:px-5!"
                  className="text-sm outline-0 px-5 py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
                  containerClassName="border-none bg-transparent"
                />
              </div>

              {/* Attachment Fee */}
               <div className="flex-1">
                <Input
                  type="text"
                  label="SD Platform Fee (in %)"
                  labelColor="ms-5 mb-1"
                  placeholder="Enter "
                    paddingClass="px-0! md:px-5!"
                  className="text-sm outline-0 px-5 py-4  border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text"
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
                onClick={() => {
                  setIsModalOpen(false)
                  setIsSuccessModalOpen(true)
                }}
                className="text-[#360567] font-semibold  w-full max-w-[100px]! md:w-fit! px-12! py-2! hover:bg-[#4FB860]"
              >
                Submit
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
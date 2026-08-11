import { useState } from "react"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { MoveLeft, X } from "lucide-react"
import { ResourceMetadata } from "../broadcasts/types/broadcastUser"
import { formatDateTime } from "@/app/shared/Common"
import { baseURL } from "@/app/services/apiClient"

interface ViewCoupleProps {
    onClose: () => void
    coupleData: {
        userId: number
        displayId: string
        fullName: string
        partnerName: string
        email: string
        contactNo: string
        eventDate: string
        resourceMetadata: ResourceMetadata | null
        profileImageUrl?: string | null
    }
}

const ViewCouple = ({ onClose, coupleData }: ViewCoupleProps) => {
    const [imgFailed, setImgFailed] = useState(false)
    const raw = coupleData.profileImageUrl
    const imgSrc = raw && !imgFailed
        ? raw.startsWith("http")
            ? raw
            : `${baseURL.replace(/\/$/, "")}/${raw.replace(/^\//, "")}`
        : null
    const initials = (coupleData.fullName ?? "?").charAt(0).toUpperCase()

    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="80%"
            modalHeight="80vh"
            className="glass-card border border-[#5FDA78] p-4 md:p-6 overflow-y-auto scrollbar-hide"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <MoveLeft className="text-white" />
                    <h2 className="text-white text-xl font-semibold">Couple Details</h2>
                </div>
                <Button
                    onClick={onClose}
                    className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                >
                    <X size={20} className="group-hover:text-white" />
                </Button>
            </div>

            <div className="flex justify-center mb-6">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={coupleData.fullName}
                        onError={() => setImgFailed(true)}
                        className="w-28 h-28 rounded-full object-cover border-2 border-[#5FDA78]"
                    />
                ) : (
                    <div className="w-28 h-28 rounded-full bg-[#5FDA78]/20 border-2 border-[#5FDA78] flex items-center justify-center text-[#5FDA78] text-3xl font-bold">
                        {initials}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <Input
                        type="text"
                        label="ID"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter ID"
                        value={coupleData.userId.toString()}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Full Name"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Full Name"
                        value={coupleData.fullName}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Partner Name"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Partner Name"
                        value={coupleData.partnerName}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Contact Number"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Contact Number"
                        value={coupleData.contactNo}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Email"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Email"
                        value={coupleData.email}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Date & Time"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Date & Time"
                        value={formatDateTime(coupleData.resourceMetadata?.createdOn)}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

            </div>

            <div className="flex justify-center gap-4 mt-8">
                <Button
                    onClick={onClose}
                    className="bg-[#5FDA78] text-[#360567] max-w-[120px]! font-semibold px-8! py-2! hover:bg-[#4FB860]"
                >
                    Close
                </Button>
            </div>
        </ModalLayer>
    )
}

export default ViewCouple
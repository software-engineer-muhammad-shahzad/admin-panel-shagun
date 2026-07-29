import Button from "@/app/shared/components/elements/Button"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { Announcement } from "@/app/features/broadcasts/types/announcement"
import { MoveLeft, X } from "lucide-react"

interface ViewAnnouncementProps {
    onClose: () => void
    announcementData: Announcement | null
}

const labelClass = "text-white text-[14px] mb-1 block text-left"
const inputClass =
    "w-full text-sm text-left outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card text-light-text bg-[#350564]/50"
const textareaClass =
    "w-full text-sm text-left px-5 py-4 border border-[#5FDA78] rounded-[24px] glass-card bg-[#350564]/50 text-light-text outline-none resize-none min-h-[120px] scrollbar-hide"

const ViewAnnouncement = ({ onClose, announcementData }: ViewAnnouncementProps) => {
    if (!announcementData) return null

    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="min(95%, 480px)"
            modalHeight="auto"
            className="glass-card border border-[#5FDA78] p-4 sm:p-5 overflow-y-auto scrollbar-hide"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <MoveLeft className="text-white" size={18} />
                    <h2 className="text-white text-lg font-semibold">Announcement Details</h2>
                </div>
                <Button
                    onClick={onClose}
                    className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                >
                    <X size={20} className="group-hover:text-white" />
                </Button>
            </div>

            <div className="flex flex-col gap-4 w-full text-left">
                <div className="w-full">
                    <label className={labelClass}>Admin Full Name</label>
                    <input
                        type="text"
                        value={announcementData.adminFullName || "—"}
                        disabled
                        className={inputClass}
                    />
                </div>

                <div className="w-full">
                    <label className={labelClass}>Announcement Message</label>
                    <textarea
                        readOnly
                        value={announcementData.content || ""}
                        className={textareaClass}
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
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

export default ViewAnnouncement

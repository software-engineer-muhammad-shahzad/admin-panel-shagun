import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Button from "@/app/components/elements/Button"
import Input from "@/app/components/elements/Input"
import { MoveLeft, X } from "lucide-react"

interface ViewNotificationProps {
    onClose: () => void
    notificationData: {
        id: string
        adminName: string
        coupleId: string
        coupleName: string
        lastActive: string
        message: string
    }
}

const ViewNotification = ({ onClose, notificationData }: ViewNotificationProps) => {
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
                    <h2 className="text-white text-xl font-semibold">Notification Details</h2>
                </div>
                <Button
                    onClick={onClose}
                    className="text-white w-8! h-8! p-2! group rounded-full! hover:text-[#5FDA78] transition-colors bg-transparent border-none"
                >
                    <X size={20} className="group-hover:text-white" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <Input
                        type="text"
                        label="Admin ID"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Admin ID"
                        value={notificationData.id}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Admin Full Name"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Admin Full Name"
                        value={notificationData.adminName}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Couple ID"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Couple ID"
                        value={notificationData.coupleId}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Name"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Name"
                        value={notificationData.coupleName}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full">
                    <Input
                        type="text"
                        label="Last Active"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Last Active"
                        value={notificationData.lastActive}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full md:col-span-2">
                    <Input
                        type="text"
                        label="Announcement Message"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter Announcement Message"
                        value={notificationData.message}
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

export default ViewNotification

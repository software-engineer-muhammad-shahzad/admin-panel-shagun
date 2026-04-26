import ModalLayer from "@/app/components/ui/modal/ModalLayer"
import Button from "@/app/components/elements/Button"
import Input from "@/app/components/elements/Input"
import { X } from "lucide-react"

interface ViewUserProps {
    onClose: () => void
    userData: {
        id: string
        fullName: string
        email: string
        contactNo: string
        moduleAccess: string
        status: string
    }
}

const ViewUser = ({ onClose, userData }: ViewUserProps) => {
    return (
        <ModalLayer
            onClose={onClose}
            modalWidth="80%"
            modalHeight="80vh"
            className="glass-card border border-[#5FDA78] p-2 md:p-6 overflow-y-auto scrollbar-hide"
            overlayColor="bg-[#330065CC] backdrop-blur-[34px]"
            position="center"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-white text-xl font-semibold">User Details</h2>
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
                        label="ID"
                        labelColor="ms-5 mb-1"
                        placeholder="Enter ID"
                        value={userData.id}
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
                        value={userData.fullName}
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
                        value={userData.contactNo}
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
                        value={userData.email}
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
                        value={userData.moduleAccess}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full px-5 mt-3">
                    <Input
                        type="text"
                        label="Module Access"
                        labelColor="ms-5 mb-1"
                        placeholder="Module Access"
                        value={userData.status}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <Button
                    onClick={onClose}
                    className="bg-[#5FDA78] max-w-[120px]! text-white font-semibold px-8! py-2! hover:bg-[#4FB860]"
                >
                    Close
                </Button>
            </div>
        </ModalLayer>
    )
}

export default ViewUser

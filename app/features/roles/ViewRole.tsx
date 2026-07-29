import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import ModalLayer from "@/app/shared/components/modal/ModalLayer"
import { MoveLeft, X } from "lucide-react"
import { AdminUser } from "@/app/features/user/types/adminUser"
import { ADMIN_MODULES, canonicalizeModules, parseModuleAccess } from "@/app/shared/adminModules"

interface ViewRoleProps {
    onClose: () => void
    roleData: AdminUser | null
}

const ViewRole = ({ onClose, roleData }: ViewRoleProps) => {
    if (!roleData) return null

    const checkedModules = canonicalizeModules(parseModuleAccess(roleData.moduleAccess))

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
                    <h2 className="text-white text-xl font-semibold">Role Details</h2>
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
                        label="Email"
                        labelColor="ms-5 mb-1"
                        value={roleData.email}
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
                        value={roleData.fullName}
                        disabled={true}
                        className="text-sm outline-0 px-5 py-4 border border-[#5FDA78] rounded-[70px] glass-card placeholder:text-light-text text-light-text bg-[#350564]/50"
                        containerClassName="border-none bg-transparent"
                    />
                </div>

                <div className="w-full md:col-span-2 px-5 mt-1">
                    <p className="text-white text-sm mb-2">Module Access</p>
                    <div className="flex flex-wrap gap-3 sm:gap-5 px-1 py-2">
                        {ADMIN_MODULES.map((module) => (
                            <label key={module} className="flex items-center gap-2 cursor-default">
                                <input
                                    type="checkbox"
                                    checked={checkedModules.includes(module)}
                                    disabled
                                    readOnly
                                    className="w-4 h-4 shrink-0 appearance-none rounded border-2 border-[#5FDA78] bg-transparent checked:bg-[#5FDA78] checked:border-[#5FDA78] disabled:opacity-100 relative checked:after:content-[''] checked:after:absolute checked:after:left-[4px] checked:after:top-[1px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-[#360567] checked:after:rotate-45"
                                />
                                <span className="text-white text-xs sm:text-sm whitespace-nowrap">{module}</span>
                            </label>
                        ))}
                    </div>
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

export default ViewRole

"use client"
import Link from "next/link"
import ModalLayer from "../../ui/modal/ModalLayer"

interface PasswordSucessfullyChangeModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const PasswordSucessfullyChangeModal = ({ isModalOpen, setIsModalOpen }: PasswordSucessfullyChangeModalProps) => {
  return (
    <>
        {isModalOpen && (
            <ModalLayer 
                onClose={() => setIsModalOpen(false)} 
                className="z-9999  border-[0.97px] rounded-[40px]! border-[#5FDA78]" 
                modalHeight="auto"
                modalWidth=" w-full max-w-[300px] sm:mx-w-[350px] md:max-w-[400px] "
                position="center"
            >
                <div className="py-7 px-5 glass-card w-full rounded-[40px]">
                    <p className="font-semibold text-3xl text-white mb-2">Successful</p>
                    <p className="font-light text-white text-lg">Your password has been successfully updated.</p>
                    <div className="flex justify-end mt-4">
                        <Link 
                            href='/login' 
                            type="submit" 
                            onClick={() => setIsModalOpen(false)} 
                            className="px-5 py-2 text-xl text-[#FFFFFF] transition-all duration-300 hover:bg-[#4ecb68] bg-[#5FDA78] rounded-[38px]"
                        >
                            Close
                        </Link>
                    </div>
                </div>
            </ModalLayer>
        )}
    </>
  )
}

export default PasswordSucessfullyChangeModal;
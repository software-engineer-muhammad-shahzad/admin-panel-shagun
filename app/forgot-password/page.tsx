import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import LeftBannerText from "../components/auth/LeftBannerText"
import ForgotPasswordform from "../components/auth/forgotpassword/ForgotPasswordForm"




const page = () => {

    
  return (
     <div className="bg-[#350366] min-h-screen flex items-center w-full md:pt-15 px-6 md:px-20  overflow-auto">
      <Link href="/login" className="fixed z-[9999] top-10 left-2 sm:left-6 md:left-8 text-white flex items-center cursor-pointer bg-[#350366] px-3 py-1 rounded"><ChevronLeft /><span className="border-b border-transparent hover:border-white transition-all duration-300 ml-2">Login</span></Link>
          
      {/* form */}
      <div className="flex md:flex-row mt-14 md:mt-0 flex-col w-full h-full  md:items-center  relative z-100">
        <div className="flex-1 ">
          <LeftBannerText />
        </div>
        <div className="flex-1 mt-10  lg:mt-0 md:ps-10 lg:ps-20 ">
          <ForgotPasswordform/>
        </div>
      </div>

    {/* left-center-bottom image at natural size */}
       <div className="fixed -top-22.5 right-0 md:top-10 md:left-0 md:right-auto">
              <Image
                src="/images/auth-images/left-rainbow.png"
                alt="Rainbow"
                width={700}
                height={700}
                className="object-contain scale-x-[-1] md:scale-x-100"
              />
            </div>
    </div>
  )
}

export default page
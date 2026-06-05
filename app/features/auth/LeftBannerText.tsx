import Image from "next/image"


const LeftBannerText = () => {
  return (
     <>
        <div className="flex  gap-2">
          <div className="w-10 h-10">
            <Image src="/images/auth-images/shagun-logo.svg" alt="shagun-logo" width={100} height={100}/>
            </div>
            <div className="flex flex-col text-white ">
              <h1 className="font-extrabold">Shagun Direct</h1>
              <p className="text-[10px] font-extralight">Skip the Envelope, Send the Love.</p>
            </div>
            </div>
            {/* secure access */}
             <div className="mt-5 md:mt-6">
          <p className="text-white text-md md:text-xl font-figtree">Secure access to smarter.</p>
          <h1 className="text-[25px]  md:text-6xl font-normal text-[#D9D9D9] mt-1 leading-8.5 md:leading-normal  md:mt-3  font-manrope">Celebrate Love,<br/> Gift Digitally</h1>
        </div>
          

        </>
  )
}

export default LeftBannerText
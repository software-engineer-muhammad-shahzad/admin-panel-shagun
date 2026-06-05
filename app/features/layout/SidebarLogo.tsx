import Image from "next/image"

const SidebarLogo = () => {
    return (
        <>
 <div className="flex gap-3">

                {/* logo */}
                <div>

                    <Image src="/images/auth-images/shagun-logo.svg" alt="shagun-logo" width={52} height={61} />
                </div>
                {/* name */}
                <div className="flex flex-col text-white ">
                    <p className="text-sm font-semibold">Shagun Direct</p>
                    <p className="text-[8px] font-light">Skip the Envelope, Send the Love.</p>
                </div>
            </div>

        </>









    )
}

export default SidebarLogo
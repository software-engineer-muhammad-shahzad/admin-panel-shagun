import SidebarLogo from "./SidebarLogo"
import SidebarTabs from "./SidebarTabs"

const Sidebar = () => {
    return (
        <div className="rounded-[30px]  flex flex-col  ">
            {/* logo */}
            <SidebarLogo />
            {/* tabs */}
            <SidebarTabs />
        </div>
    )
}

export default Sidebar
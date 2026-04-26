"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { DashboardTab, UserManagement, BroadcastTab, PaymentTab } from "../icons/Icons";
import { sidebarLinks } from "../data/MockData";

// Icon components with proper typing
type IconComponent = React.FC<{ color?: string }>;

const iconComponents: { [key: string]: IconComponent } = {
    DashboardTab,
    UserManagement,
    BroadcastTab,
    PaymentTab,
};

const SidebarTabs = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Close dropdown when route changes, but keep dropdowns open if on their respective routes
    useEffect(() => {
        const isBroadcastRoute = pathname?.includes('/broadcasts');
        const isUserManagementRoute = pathname?.includes('/users');
        
        if (!isBroadcastRoute && !isUserManagementRoute) {
            setOpenMenu(null);
        } else if (isBroadcastRoute && !openMenu) {
            setOpenMenu('Broadcasts');
        } else if (isUserManagementRoute && !openMenu) {
            setOpenMenu('User Management');
        }
    }, [pathname]);

    return (
        <ul className="mt-8 sm:mt-12 w-full">
            {sidebarLinks.map((item) => {
                // If has children (dropdown)
                if (item.children) {
                    return (
                        <li key={item.name}>
                            <button
                                onClick={() => {
                                    if (item.path) {
                                        router.push(item.path);
                                    }
                                    setOpenMenu(openMenu === item.name ? null : item.name);
                                }}
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`flex items-center mt-2 justify-between w-full px-3 sm:px-4 py-2 sm:py-2 rounded-2xl sm:rounded-4xl transition-all duration-300 ease-in-out
    hover:bg-[#8FE8A8] ${openMenu === item.name ? "bg-[#8FE8A8] text-dark-text" : hoveredItem === item.name ? "text-dark-text" : "text-light-text"}`}
                            >
                                <div
                                    className={`flex items-center gap-2 sm:gap-3 transition-all duration-300
      ${openMenu === item.name ? "font-semibold" : "font-medium"}`}
                                >
                                    {item.icon && iconComponents[item.icon] ?
                                        React.createElement(iconComponents[item.icon], {
                                            color: hoveredItem === item.name || openMenu === item.name ? "#330065" : "#DDDDDD"
                                        }) : null
                                    }
                                    {item.name}
                                </div>
                            </button>
                            {/* Submenu */}
                            {openMenu === item.name && (
                                <ul className="ml-8 mt-1">
                                    {item.children.map((sub) => (
                                        <li key={sub.path}>
                                            <Link
                                                href={sub.path}
                                                className={`block px-4 py-2 mt-1 rounded transition-all duration-300 ease-in-out ${pathname === sub.path
                                                    ? " text-[#5FDA78] font-semibold rounded-4xl"
                                                    : "text-light-text hover:bg-[#8FE8A8] hover:text-dark-text font-medium rounded-4xl"
                                                    }`}
                                            >
                                                <div className="flex items-center  justify-between">
                                                    {sub.name}
                                                    <ChevronRight size={14} />
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                }

                // Normal link
                return (
                    <li key={item.path} className="mt-1">
                        <Link
                            href={item.path}
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => setOpenMenu(null)}
                            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-2xl sm:rounded-4xl transition-all duration-300 ease-in-out ${pathname === item.path
                                ? "bg-green-500 text-dark-text font-semibold"
                                : hoveredItem === item.name ? "text-dark-text hover:bg-[#8FE8A8] font-medium" : "text-light-text hover:bg-[#8FE8A8] hover:text-dark-text font-medium"
                                }`}
                        >
                            {item.icon && iconComponents[item.icon] ?
                                React.createElement(iconComponents[item.icon], {
                                    color: pathname === item.path || hoveredItem === item.name ? "#330065" : "#DDDDDD"
                                }) : null
                            }
                            {item.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default SidebarTabs;
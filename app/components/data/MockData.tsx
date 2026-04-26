import { Edit, Eye, Trash2 } from "lucide-react";

// sidebar Links data
export const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "DashboardTab" },

    {
        name: "User Management",
        path: "/users/admin",
        icon: "UserManagement",
        children: [
            { name: "Admins", path: "/users/admin" },
            { name: "Couple", path: "/users/couple" },
        ],
    },
    { name: "Role & Rights", path: "/roles", icon: "UserManagement" },
    {
        name: "Broadcasts",
        path: "/broadcasts/notification",
        icon: "BroadcastTab",
        children: [
            { name: "Notifications", path: "/broadcasts/notification" },
            { name: "Announcements", path: "/broadcasts/announcement" },
        ],
    },

    { name: "Payments", path: "/payments", icon: "PaymentTab" },
];

// Dashboard cards data
export const dashboardCards = [
    {
        id: 1,
        title: "Total Couple Accounts",
        value: 120,
        percentage: 5.2,
        percentageText: "This Month",
        icon: "/images/dashboard/user-profile.svg",
        color: "#5FDA784D"
    },
    {
        id: 2,
        title: "Total Admin Accounts",
        value: 15,
        percentage: 3.8,
        percentageText: "This Month",
        icon: "/images/dashboard/user-admin.svg",
        color: "#5FDA784D"
    },
    {
        id: 3,
        title: "Active Couple Accounts",
        value: 98,
        percentage: 12.5,
        percentageText: "This Month",
        icon: "/images/dashboard/active-couple.svg",
        color: "#5FDA784D"
    },
    {
        id: 4,
        title: "Active Admin Accounts",
        value: 12,
        percentage: 8.3,
        percentageText: "This Month",
        icon: "/images/dashboard/active-admin.svg",
        color: "#5FDA784D"
    },
    {
        id: 5,
        title: "Total Transactions",
        value: 12,
        percentage: 18.7,
        percentageText: "This Month",
        icon: "/images/dashboard/total-transaction.svg",
        color: "#5FDA784D"
    },
    {
        id: 6,
        title: "SD Platform Amount",
        value: 45,
        percentage: 22.1,
        percentageText: "This Month",
        icon: "/images/dashboard/total-transaction.svg",
        color: "#5FDA784D"
    },
    {
        id: 7,
        title: "Attachment Amount",
        value: 234,
        percentage: 15.4,
        percentageText: "This Month",
        icon: "/images/dashboard/active-couple.svg",
        color: "#5FDA784D"
    },
    {
        id: 8,
        title: "Stripe Deduction",
        value: 37,
        percentage: 9.6,
        percentageText: "This Month",
        icon: "/images/dashboard/stripe-deduction.svg",
        color: "#5FDA784D"
    }
];

// LollipopChart mock data
export const lollipopChartMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const lollipopChartValues = [18000, 22000, 14000, 9000, 4000, 12000, 18000, 9000, 11000, 18000, 22000, 18000, 23000, 28000, 18000, 31000];

export const lollipopChartCategories = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];

export const lollipopChartOptions = {
    chart: {
        type: "line" as const, // Using 'line' as the base for mixed charts
        toolbar: { show: false },
        background: "transparent",
    },
    // This makes the "stick" very thin like the image
    plotOptions: {
        bar: {
            columnWidth: "10%",
            borderRadius: 0,
        },
    },
    // Colors: Index 0 is the Bar (stick), Index 1 is the Scatter (dot)
    colors: ["#5FDA78", "#5FDA78"],

    stroke: {
        width: [4, 0], // Thick line for the bar, no border for the dot
    },

    markers: {
        size: 6,
        colors: ["#5FDA78"],
        strokeColors: "#fff", // White border around the dot like the image
        strokeWidth: 2,
        hover: { size: 8 }
    },

    grid: {
        borderColor: "rgba(255, 255, 255, 0.1)", // Subtle lines
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
    },

    xaxis: {
        categories: lollipopChartCategories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#94a3b8" } }
    },

    yaxis: {
        min: 0,
        max: 35000,
        tickAmount: 3, // Shows 0, 10k, 20k, 30k
        labels: { style: { colors: "#94a3b8" } }
    },

    tooltip: { theme: "dark" },
};

export const lollipopChartSeries = [
    {
        name: "Payments",
        type: "bar",
        data: lollipopChartValues,
    },
    {
        name: "Point",
        type: "scatter",
        data: lollipopChartValues,
    },
];

// Payments columns configuration
export const paymentsColumns = [
    {
        key: "Txn ID",
        label: "Txn ID",
        width: "80px"
    },
    {
        key: "Guest",
        label: "Guest",
        width: "120px"
    },
    {
        key: "Gift",
        label: "Gift",
        width: "100px"
    },
    {
        key: "Attach",
        label: "Attach",
        width: "100px"
    },
    {
        key: "Attach Fee",
        label: "Attach Fee",
        width: "100px",
        render: (value: any, row: any, index: number) => `$${value.toFixed(2)}`
    },
    {
        key: "Total Paid",
        label: "Total Paid",
        width: "100px",
        render: (value: any, row: any, index: number) => `$${value.toFixed(2)}`
    },
    {
        key: "Fee %",
        label: "Fee %",
        width: "100px",
        render: (value: any, row: any, index: number) => `${value}%`
    },
    {
        key: "Platform Fee",
        label: "Platform Fee",
        width: "100px",
        render: (value: any, row: any, index: number) => `$${value.toFixed(2)}`
    },
    {
        key: "Stripe Fee",
        label: "Stripe Fee",
        width: "100px",
        render: (value: any, row: any, index: number) => `$${value.toFixed(2)}`
    },
    {
        key: "Platform Net",
        label: "Platform Net",
        width: "100px",
        render: (value: any, row: any, index: number) => `$${value.toFixed(2)}`
    },
    {
        key: "Net to Couple",
        label: "Net to Couple",
        width: "100px",
        render: (value: any, row: any, index: number) => `$${value.toFixed(2)}`
    },
    {
        key: "Status",
        label: "Status",
        render: (value: any, row: any, index: number) => (
            <span className={`px-3 py-1 flex items-center w-fit gap-2 rounded  glass-border text-xs ${value === "Completed" ? " text-[#30B052]" :
                value === "Pending" ? " text-[#E7E933]" :
                    value === "Failed" ? " text-red-600" :
                        value === "Processing" ? " text-[#2673FF]" :
                            value === "Cancelled" ? " text-[#FF6E17]" :
                                " text-white"
                }`}>

                {/*  circle*/}
                <div className={`w-2 h-2 rounded-full ${value === "Completed" ? "bg-[#30B052]" :
                    value === "Pending" ? "bg-[#E7E933]" :
                        value === "Failed" ? "bg-red-600" :
                            value === "Processing" ? "bg-blue-600" :
                                value === "Cancelled" ? "bg-orange-600" :
                                    "bg-gray-600"
                    }`}></div>
                {value}
            </span>
        )
    }

];

// Payments mock data
export const paymentsData = [
    {
        "Txn ID": "TXN001",
        "Guest": "John Doe",
        "Gift": "Wedding Gift",
        "Attach": "Photo Album",
        "Attach Fee": 25,
        "Total Paid": 2500,
        "Fee %": 2.5,
        "Platform Fee": 62.50,
        "Stripe Fee": 75.00,
        "Platform Net": 2362.50,
        "Net to Couple": 2287.50,
        "Status": "Completed"
    },
    {
        "Txn ID": "TXN002",
        "Guest": "Jane Smith",
        "Gift": "Cash Gift",
        "Attach": "Video Message",
        "Attach Fee": 15,
        "Total Paid": 1800,
        "Fee %": 2.5,
        "Platform Fee": 45.00,
        "Stripe Fee": 54.00,
        "Platform Net": 1701.00,
        "Net to Couple": 1647.00,
        "Status": "Pending"
    },
    {
        "Txn ID": "TXN003",
        "Guest": "Bob Johnson",
        "Gift": "Gift Card",
        "Attach": "Digital Card",
        "Attach Fee": 10,
        "Total Paid": 3200,
        "Fee %": 2.5,
        "Platform Fee": 80.00,
        "Stripe Fee": 96.00,
        "Platform Net": 3024.00,
        "Net to Couple": 2928.00,
        "Status": "Failed"
    },
    {
        "Txn ID": "TXN001",
        "Guest": "John Doe",
        "Gift": "Wedding Gift",
        "Attach": "Photo Album",
        "Attach Fee": 25,
        "Total Paid": 2500,
        "Fee %": 2.5,
        "Platform Fee": 62.50,
        "Stripe Fee": 75.00,
        "Platform Net": 2362.50,
        "Net to Couple": 2287.50,
        "Status": "Processing"
    },
    {
        "Txn ID": "TXN002",
        "Guest": "Jane Smith",
        "Gift": "Cash Gift",
        "Attach": "Video Message",
        "Attach Fee": 15,
        "Total Paid": 1800,
        "Fee %": 2.5,
        "Platform Fee": 45.00,
        "Stripe Fee": 54.00,
        "Platform Net": 1701.00,
        "Net to Couple": 1647.00,
        "Status": "Cancelled"
    },
    {
        "Txn ID": "TXN003",
        "Guest": "Bob Johnson",
        "Gift": "Gift Card",
        "Attach": "Digital Card",
        "Attach Fee": 10,
        "Total Paid": 3200,
        "Fee %": 2.5,
        "Platform Fee": 80.00,
        "Stripe Fee": 96.00,
        "Platform Net": 3024.00,
        "Net to Couple": 2928.00,
        "Status": "Failed"
    }
];

// announcement daat

export const announcementData = [
    {
        id: "TXN001",
        adminName: "John Doe",
        coupleId: "CP001",
        coupleName: "Ali & Sara",
        lastActive: "2 mins ago",
        message: "Wedding Gift received successfully",
    },
    {
        id: "TXN002",
        adminName: "Jane Smith",
        coupleId: "CP002",
        coupleName: "Ahmed & Hina",
        lastActive: "10 mins ago",
        message: "Cash Gift pending confirmation",
    },
    {
        id: "TXN003",
        adminName: "Bob Johnson",
        coupleId: "CP003",
        coupleName: "Usman & Ayesha",
        lastActive: "1 hour ago",
        message: "Gift Card transaction failed",
    },
    {
        id: "TXN004",
        adminName: "John Doe",
        coupleId: "CP004",
        coupleName: "Bilal & Noor",
        lastActive: "5 mins ago",
        message: "Processing wedding gift",
    },
    {
        id: "TXN005",
        adminName: "Jane Smith",
        coupleId: "CP005",
        coupleName: "Zain & Fatima",
        lastActive: "20 mins ago",
        message: "Transaction cancelled by user",
    },
    {
        id: "TXN006",
        adminName: "Bob Johnson",
        coupleId: "CP006",
        coupleName: "Hamza & Iqra",
        lastActive: "2 hours ago",
        message: "Payment failed due to error",
    },
];
// announcements columns



export const announcementColumns = [
    {
        key: "id", // Matches "id" in data
        label: "Admin ID",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any, row: any, index: number) => `#${value}`
    },
    {
        key: "adminName", // Matches "adminName" in data
        label: "Admin Full Name",
        width: "180px",
        render: (value: any, row: any, index: number) => value || "N/A" // Strings don't use .toFixed()
    },
    {
        key: "coupleId",
        label: "Couple ID",
        width: "120px",
        render: (value: any, row: any, index: number) => value
    },
    {
        key: "coupleName",
        label: "Name",
        width: "150px",
        render: (value: any, row: any, index: number) => value
    },
    {
        key: "lastActive",
        label: "Last Active",
        width: "120px",
        render: (value: any, row: any, index: number) => value
    },
    {
        key: "message",
        label: "Announcement Message",
        width: "250px",
        render: (value: any, row: any, index: number) => value
    },
    {
        key: "Action",
        label: "Action",
        render: (value: any, row: any, index: number) => (
            <span className=" w-8 h-8 p-1 py-1 flex items-center justify-center border border-white/10  gap-2 rounded-full glass-border text-xs cursor-pointer hover:bg-white/5">
                <Eye size={14} />
            </span>
        )
    }
];

// notifications data

export const notificationData = [
    {
        id: "TXN001",
        adminName: "John Doe",
        coupleId: "CP001",
        coupleName: "Ali & Sara",
        lastActive: "2 mins ago",
        message: "Wedding Gift received successfully",
    },
    {
        id: "TXN002",
        adminName: "Jane Smith",
        coupleId: "CP002",
        coupleName: "Ahmed & Hina",
        lastActive: "10 mins ago",
        message: "Cash Gift pending confirmation",
    },
    {
        id: "TXN003",
        adminName: "Bob Johnson",
        coupleId: "CP003",
        coupleName: "Usman & Ayesha",
        lastActive: "1 hour ago",
        message: "Gift Card transaction failed",
    },
    {
        id: "TXN004",
        adminName: "John Doe",
        coupleId: "CP004",
        coupleName: "Bilal & Noor",
        lastActive: "5 mins ago",
        message: "Processing wedding gift",
    },
    {
        id: "TXN005",
        adminName: "Jane Smith",
        coupleId: "CP005",
        coupleName: "Zain & Fatima",
        lastActive: "20 mins ago",
        message: "Transaction cancelled by user",
    },
    {
        id: "TXN006",
        adminName: "Bob Johnson",
        coupleId: "CP006",
        coupleName: "Hamza & Iqra",
        lastActive: "2 hours ago",
        message: "Payment failed due to error",
    },
];
// announcements columns



export const notificationColumns = [
    {
        key: "id", // Matches "id" in data
        label: "Admin ID",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "adminName", // Matches "adminName" in data
        label: "Admin Full Name",
        width: "180px",
        render: (value: string) => value || "N/A" // Strings don't use .toFixed()
    },
    {
        key: "coupleId",
        label: "Couple ID",
        width: "120px",
        render: (value: string) => value
    },
    {
        key: "coupleName",
        label: "Name",
        width: "150px",
        render: (value: string) => value
    },
    {
        key: "lastActive",
        label: "Last Active",
        width: "120px",
        render: (value: string) => value
    },
    {
        key: "message",
        label: "Notification Message",
        width: "250px",
        render: (value: string) => value
    },
    {
        key: "Action",
        label: "Action",
        render: () => (
            <span className=" w-8 h-8 p-1 py-1 flex items-center justify-center border border-white/10  gap-2 rounded-full glass-border text-xs cursor-pointer hover:bg-white/5">
                <Eye size={14} />
            </span>
        )
    }
];

// roles and rights

export const rolesData = [
    {
        id: "TXN001",
        adminName: "John Doe",
        coupleId: "CP001",
        coupleName: "Ali & Sara",
        lastActive: "Active",
        message: "Wedding Gift received successfully",
    },
    {
        id: "TXN002",
        adminName: "Jane Smith",
        coupleId: "CP002",
        coupleName: "Ahmed & Hina",
        lastActive: "Inactive",
        message: "Cash Gift pending confirmation",
    },
    {
        id: "TXN003",
        adminName: "Bob Johnson",
        coupleId: "CP003",
        coupleName: "Usman & Ayesha",
        lastActive: "Active",
        message: "Gift Card transaction failed",
    },
    {
        id: "TXN004",
        adminName: "John Doe",
        coupleId: "CP004",
        coupleName: "Bilal & Noor",
        lastActive: "Inactive",
        message: "Processing wedding gift",
    },
    {
        id: "TXN005",
        adminName: "Jane Smith",
        coupleId: "CP005",
        coupleName: "Zain & Fatima",
        lastActive: "Active",
        message: "Transaction cancelled by user",
    },
    {
        id: "TXN006",
        adminName: "Bob Johnson",
        coupleId: "CP006",
        coupleName: "Hamza & Iqra",
        lastActive: "Inactive",
        message: "Payment failed due to error",
    },
];
// announcements columns



export const rolesColumns = [
    {
        key: "id", // Matches "id" in data
        label: "Admin ID",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "adminName", // Matches "adminName" in data
        label: "Admin Full Name",
        width: "180px",
        render: (value: string) => value || "N/A" // Strings don't use .toFixed()
    },
    {
        key: "coupleId",
        label: "Last Active",
        width: "120px",
        render: (value: string) => value
    },
    {
        key: "coupleName",
        label: "Modules",
        width: "150px",
        render: (value: string) => value
    },
    {
        key: "lastActive",
        label: "Status",
        width: "120px",
        render: (value: string) => (
            <span className={`px-3 py-1 flex items-center w-fit gap-2 rounded  glass-border text-xs ${value === "Active" ? " text-[#30B052]" :
                value === "Inactive" ? " text-[#FF0000]" :
                    ""
                }`}>

                {/*  circle*/}
                <div className={`w-2 h-2 rounded-full ${value === "Active" ? "bg-[#30B052]" :
                    value === "Inactive" ? "bg-[#FF0000]" : "bg-gray-600"
                    }`}></div>
                {value}
            </span>
        )
    },


    {
        key: "Action",
        label: "Action",
        render: () => (
            <div className="flex items-center gap-2">
                {/* Edit */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5">
                    <Edit size={14} />
                </span>
                {/* View */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5">
                    <Eye size={14} />
                </span>



                {/* Delete */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20">
                    <Trash2 size={14} />
                </span>

            </div>
        )
    }

];

// Couple

export const coupleData = [
    {
        id: "TXN001",
        adminName: "John Doe",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Ali & Sara",
        lastActive: "Active",
        message: "Wedding Gift received successfully",
    },
    {
        id: "TXN002",
        adminName: "Jane Smith",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Ahmed & Hina",
        lastActive: "Inactive",
        message: "Cash Gift pending confirmation",
    },
    {
        id: "TXN003",
        adminName: "Bob Johnson",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Usman & Ayesha",
        lastActive: "Active",
        message: "Gift Card transaction failed",
    },
    {
        id: "TXN004",
        adminName: "John Doe",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Bilal & Noor",
        lastActive: "Inactive",
        message: "Processing wedding gift",
    },
    {
        id: "TXN005",
        adminName: "Jane Smith",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Zain & Fatima",
        lastActive: "Active",
        message: "Transaction cancelled by user",
    },
    {
        id: "TXN006",
        adminName: "Bob Johnson",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Hamza & Iqra",
        lastActive: "Inactive",
        message: "Payment failed due to error",
    },
];
// couple columns



export const coupleColumns = [
    {
        key: "id", // Matches "id" in data
        label: "ID",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "adminName", // Matches "adminName" in data
        label: " Full Name",
        width: "180px",
        render: (value: string) => value || "N/A" // Strings don't use .toFixed()
    },
    {
        key: "id", // Matches "id" in data
        label: "Patner Name",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "id", // Matches "id" in data
        label: "Contact No.",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "adminName", // Matches "adminName" in data
        label: " Email",
        width: "180px",
        render: (value: string) => value || "N/A" // Strings don't use .toFixed()
    },
    {
        key: "coupleId",
        label: "Date & Time",
        width: "120px",
        render: (value: string) => value
    },
    {
        key: "lastActive",
        label: "Status",
        width: "120px",
        render: (value: string) => (
            <span className={`px-3 py-1 flex items-center w-fit gap-2 rounded  glass-border text-xs ${value === "Active" ? " text-[#30B052]" :
                value === "Inactive" ? " text-[#FF0000]" :
                    ""
                }`}>

                {/*  circle*/}
                <div className={`w-2 h-2 rounded-full ${value === "Active" ? "bg-[#30B052]" :
                    value === "Inactive" ? "bg-[#FF0000]" : "bg-gray-600"
                    }`}></div>
                {value}
            </span>
        )
    },


    {
        key: "Action",
        label: "Action",
        render: () => (
            <div className="flex items-center gap-2">
                {/* Edit */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5">
                    <Edit size={14} />
                </span>
                {/* View */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5">
                    <Eye size={14} />
                </span>



                {/* Delete */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20">
                    <Trash2 size={14} />
                </span>

            </div>
        )
    }

];


//admin coluumns

export const adminData = [
    {
        id: "TXN001",
        adminName: "John Doe",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Ali & Sara",
        lastActive: "Active",
        message: "Wedding Gift received successfully",
    },
    {
        id: "TXN002",
        adminName: "Jane Smith",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Ahmed & Hina",
        lastActive: "Inactive",
        message: "Cash Gift pending confirmation",
    },
    {
        id: "TXN003",
        adminName: "Bob Johnson",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Usman & Ayesha",
        lastActive: "Active",
        message: "Gift Card transaction failed",
    },
    {
        id: "TXN004",
        adminName: "John Doe",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Bilal & Noor",
        lastActive: "Inactive",
        message: "Processing wedding gift",
    },
    {
        id: "TXN005",
        adminName: "Jane Smith",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Zain & Fatima",
        lastActive: "Active",
        message: "Transaction cancelled by user",
    },
    {
        id: "TXN006",
        adminName: "Bob Johnson",
        coupleId: "02, Feb 2026 10:30PM",
        coupleName: "Hamza & Iqra",
        lastActive: "Inactive",
        message: "Payment failed due to error",
    },
];
// couple columns



export const adminColumns = [
    {
        key: "id", // Matches "id" in data
        label: "ID",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "adminName", // Matches "adminName" in data
        label: " Full Name",
        width: "180px",
        render: (value: string) => value || "N/A" // Strings don't use .toFixed()
    },
    {
        key: "id", // Matches "id" in data
        label: "Contact No.",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
     {
        key: "adminName", // Matches "adminName" in data
        label: " Email",
        width: "180px",
        render: (value: string) => value || "N/A" // Strings don't use .toFixed()
    },
     {
        key: "coupleId",
        label: "Date & Time",
        width: "120px",
        render: (value: string) => value
    },
      {
        key: "id", // Matches "id" in data
        label: "Module Access",
        width: "100px",
        // No .toFixed() needed for IDs usually
        render: (value: any) => `#${value}`
    },
    {
        key: "lastActive",
        label: "Status",
        width: "120px",
        render: (value: string) => (
            <span className={`px-3 py-1 flex items-center w-fit gap-2 rounded  glass-border text-xs ${value === "Active" ? " text-[#30B052]" :
                value === "Inactive" ? " text-[#FF0000]" :
                    ""
                }`}>

                {/*  circle*/}
                <div className={`w-2 h-2 rounded-full ${value === "Active" ? "bg-[#30B052]" :
                    value === "Inactive" ? "bg-[#FF0000]" : "bg-gray-600"
                    }`}></div>
                {value}
            </span>
        )
    },


    {
        key: "Action",
        label: "Action",
        render: () => (
            <div className="flex items-center gap-2">
                {/* Edit */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5">
                    <Edit size={14} />
                </span>
                {/* View */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-white/5">
                    <Eye size={14} />
                </span>



                {/* Delete */}
                <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full glass-border cursor-pointer hover:bg-red-500/20">
                    <Trash2 size={14} />
                </span>

            </div>
        )
    }

];


const endpoints = {
  // admin management
  auth: {
    signIn: "/Auth/login",
    forgotPassword: "/Auth/forgotpassword",
    verifyOtp: "/Auth/verifysignup",
    getUserProfile: (userId: number) => `/usermanagement/users/${userId}`
  },
  admin: {
    getAdmin: "/usermanagement/users/admins",
    deleteAdmin: (userId: number) => `/usermanagement/users/${userId}`,
    createAdmin: "/usermanagement/users/create",
    updateAdmin: (userId: number) => `/usermanagement/users/${userId}`,
  },

  // couple management
  couple: {
    getCouple: "/usermanagement/users/couples",
    deleteCouple: (userId: number) => `/usermanagement/users/${userId}`,
    updateCouple: (userId: number) => `/usermanagement/users/${userId}`,
  },
  BroadDast: {
    getCouples: "/usermanagement/users/couples",
    createAnnouncement: "/notifications/createannouncement",
    getNotification: "/notifications/getannouncements",
  },
  payments: {
    addGift: "/payments/pricing",
    showGift: "/payments/pricing",
  },
  dashboard: {
    getCardsDetails: "/usermanagement/dashboard/cards",
    getTotalTransactionsOverview: "/payments/dashboard/transactionsoverview",
    getTotalUsersChartsDetails: "/usermanagement/dashboard/totaluserschart",
    getTotalPaymentCharts: "/payments/dashboard/totalpaymentschart",
  },
};

export default endpoints;

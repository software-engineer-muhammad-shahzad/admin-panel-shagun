const endpoints = {
  // admin management
  auth: {
    signIn: "/Auth/login",
    forgotPassword: "/Auth/forgotpassword",
    verifyOtp: "/Auth/verifysignup",
    getUserProfile: (userId: number) => `/usermanagement/users/${userId}`,
  },
  admin: {
    getAdmin: "/usermanagement/users/admins",
    deleteAdmin: (userId: number) => `/usermanagement/users/${userId}`,
    createAdmin: "/usermanagement/users/create",
    updateAdmin: (userId: number) => `/usermanagement/users/${userId}`,
    assignModules: (userId: number) =>
      `/usermanagement/users/${userId}/admins/assignmodules`,
  },

  // couple management
  couple: {
    getCouple: "/usermanagement/users/couples",
    deleteCouple: (userId: number) => `/usermanagement/users/${userId}`,
    updateCouple: (userId: number) => `/usermanagement/users/${userId}`,

    deleteUserProfilePhoto: (userId: number) => `/usermanagement/users/${userId}/profile/photo`,
  },
  BroadDast: {
    getCouples: "/usermanagement/users/couples",
    createAnnouncement: "/notifications/createannouncement",
    getNotification: "/notifications/getannouncements",
  },
  payments: {
    updatePricing: "/payments/pricing",
    showGift: "/payments/pricing",
    getTransactions: "/payments/getpaymentslist",
  },
  dashboard: {
    getCardsDetails: "/usermanagement/dashboard/cards",
    getPaymentCards: "/payments/dashboard/cards",
    getTotalTransactionsOverview: "/payments/dashboard/transactionsoverview",
    getTotalUsersChartsDetails: "/usermanagement/dashboard/totaluserschart",
    getTotalPaymentCharts: "/payments/dashboard/totalpaymentschart",
  },
  notification: {
    getNotificationList: "/notifications/notificationslist",
    createNotification: "/notifications/createbyadmin",
  },
};

export default endpoints;

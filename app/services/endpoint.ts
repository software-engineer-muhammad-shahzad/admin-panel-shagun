const endpoints = {
  // admin management
  auth: {
    signIn: "/Auth/login",
    forgotPassword:"/Auth/forgotpassword",
    verifyOtp:"/Auth/verifysignup"
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
};

export default endpoints;

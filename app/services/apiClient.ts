import axios, { InternalAxiosRequestConfig } from "axios"

interface AxiosRequestConfigWithSkipAuth extends InternalAxiosRequestConfig {
  skipAuth?: boolean
}

// Prefer the explicit app/env API_URL, then NEXT_PUBLIC_API_URL, then server API_URL
const baseURL =
  
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof process !== "undefined" ? process.env.API_URL : undefined) ||
  ""

if (!baseURL && process.env.NODE_ENV !== "production") {
  // Helpful during development to surface missing env config
  // eslint-disable-next-line no-console
  console.warn(
    "Missing API base URL: set NEXT_PUBLIC_API_URL (or API_URL for server) in your .env.local or app/.env"
  )
}

export { baseURL }

/**
 * Axios instance
 */
const apiClient = axios.create({
  baseURL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});


// request interceptor

apiClient.interceptors.request.use(
  (config) => {
    const requestConfig = config as AxiosRequestConfigWithSkipAuth

    if (typeof window !== "undefined") {
      const skipAuth = requestConfig.skipAuth === true

      if (!skipAuth) {
        const raw = localStorage.getItem("authData")
        const token = raw ? JSON.parse(raw)?.token : null

        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`
        }
      }
    }

    return requestConfig
  },
  (error) => Promise.reject(error)
);

// response interceptor

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 🔐 unauthorized handling
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("authData");
      window.location.href = "/login";
    }

    console.error(
      "API Error:",
      error?.response?.data || error.message
    );

    return Promise.reject(error);
  }
);


export default apiClient;

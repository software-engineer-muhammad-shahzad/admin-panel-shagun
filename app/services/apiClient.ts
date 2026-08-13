import axios, { InternalAxiosRequestConfig } from "axios"

interface AxiosRequestConfigWithSkipAuth extends InternalAxiosRequestConfig {
  skipAuth?: boolean
}

/** Real backend API — never use the FE portal host */
export const PRODUCTION_API_URL = "https://adminapis.shagundirect.com/api"

const FRONTEND_HOSTS = [
  "portal.shagundirect.com",
  "www.portal.shagundirect.com",
]

const normalizeApiBaseUrl = (url?: string | null): string => {
  if (!url?.trim()) return ""
  const trimmed = url.trim().replace(/\/+$/, "")
  if (/\/api$/i.test(trimmed)) return trimmed
  return `${trimmed}/api`
}

const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return ""
  }
}

const isFrontendHost = (hostname: string): boolean =>
  FRONTEND_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`))

const isLocalApiUrl = (url: string): boolean => {
  const host = getHostname(url)
  return host === "localhost" || host === "127.0.0.1"
}

/**
 * Resolve API base URL.
 * Never return empty — empty baseURL makes Axios call the FE origin
 * (e.g. https://portal.shagundirect.com/Auth/login).
 */
const resolveApiBaseUrl = (): string => {
  const raw =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.API_URL?.trim() ||
    ""

  const normalized = normalizeApiBaseUrl(raw)

  if (normalized) {
    // Portal FE URL misconfigured as API
    if (isFrontendHost(getHostname(normalized))) {
      return PRODUCTION_API_URL
    }
    return normalized
  }

  // Prefer local API only during next dev
  if (process.env.NODE_ENV !== "production") {
    return "https://adminapis.shagundirect.com/api"
  }

  return PRODUCTION_API_URL
}

let baseURL = resolveApiBaseUrl()

export { baseURL }

const apiClient = axios.create({
  baseURL,
})

apiClient.interceptors.request.use(
  (config) => {
    const requestConfig = config as AxiosRequestConfigWithSkipAuth

    // Runtime guard: if the app is served from the portal FE, always hit the real API
    if (typeof window !== "undefined") {
      const pageHost = window.location.hostname.toLowerCase()
      const currentBase = String(requestConfig.baseURL || apiClient.defaults.baseURL || "")

      if (
        isFrontendHost(pageHost) ||
        !currentBase ||
        isFrontendHost(getHostname(currentBase))
      ) {
        requestConfig.baseURL = PRODUCTION_API_URL
        apiClient.defaults.baseURL = PRODUCTION_API_URL
      } else if (isLocalApiUrl(currentBase) && isFrontendHost(pageHost)) {
        requestConfig.baseURL = PRODUCTION_API_URL
        apiClient.defaults.baseURL = PRODUCTION_API_URL
      }
    }

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
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const url = error?.config?.url ?? ""
    const isLoginEndpoint = url.includes("/Auth/login") || url.includes("/auth/login")

    if (status === 401 && !isLoginEndpoint && typeof window !== "undefined") {
      localStorage.removeItem("authData")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default apiClient

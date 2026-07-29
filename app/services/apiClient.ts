import axios, { InternalAxiosRequestConfig } from "axios"

interface AxiosRequestConfigWithSkipAuth extends InternalAxiosRequestConfig {
  skipAuth?: boolean
}

const PRODUCTION_API_URL = "https://adminapis.shagundirect.com/api"

/** Frontend hosts that must never be used as the API base */
const FRONTEND_HOSTS = [
  "portal.shagundirect.com",
  "localhost:3000",
  "127.0.0.1:3000",
]

const normalizeApiBaseUrl = (url?: string | null): string => {
  if (!url?.trim()) return ""
  const trimmed = url.trim().replace(/\/+$/, "")
  if (/\/api$/i.test(trimmed)) return trimmed
  return `${trimmed}/api`
}

const isFrontendUrl = (url: string): boolean => {
  try {
    const host = new URL(url).host.toLowerCase()
    return FRONTEND_HOSTS.some(
      (fe) => host === fe.toLowerCase() || host.endsWith(`.${fe.toLowerCase()}`)
    )
  } catch {
    return false
  }
}

const resolveApiBaseUrl = (): string => {
  const raw =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.API_URL?.trim() ||
    ""

  const normalized = normalizeApiBaseUrl(raw)

  // Misconfigured env pointing at the FE portal → ignore and use real API
  if (normalized && isFrontendUrl(normalized)) {
    // eslint-disable-next-line no-console
    console.warn(
      `NEXT_PUBLIC_API_URL points at frontend (${raw}). Using ${PRODUCTION_API_URL} instead.`
    )
    return PRODUCTION_API_URL
  }

  if (normalized) return normalized

  // Empty env: local stays empty (dev must set .env.local); production uses API host
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.warn(
      `NEXT_PUBLIC_API_URL is missing. Falling back to ${PRODUCTION_API_URL}`
    )
    return PRODUCTION_API_URL
  }

  // eslint-disable-next-line no-console
  console.warn(
    "Missing NEXT_PUBLIC_API_URL. Set it in .env.local (e.g. https://localhost:44382/api)"
  )
  return ""
}

const baseURL = resolveApiBaseUrl()

export { baseURL }

const apiClient = axios.create({
  baseURL,
})

apiClient.interceptors.request.use(
  (config) => {
    const requestConfig = config as AxiosRequestConfigWithSkipAuth

    // Safety: never allow relative calls against the FE origin in the browser
    if (!requestConfig.baseURL && typeof window !== "undefined") {
      requestConfig.baseURL = PRODUCTION_API_URL
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

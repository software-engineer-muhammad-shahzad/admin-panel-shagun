"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getData, clearStorage } from "@/app/utils/storage/storageHelper"
import { AUTH_KEY } from "./hooks/useSignIn"
import { AuthData } from "./types/auth"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const authData = getData<AuthData>(AUTH_KEY, "local")

        if (!authData?.token) {
            router.replace("/login")
            return
        }

        const expiresAt = new Date(authData.expiresAtUtc).getTime()
        const remaining = expiresAt - Date.now()

        if (remaining <= 0) {
            clearStorage("local")
            router.replace("/login")
            return
        }

        setAuthorized(true)

        const timer = setTimeout(() => {
            clearStorage("local")
            router.replace("/login")
        }, remaining)

        return () => clearTimeout(timer)
    }, [router])

    if (!authorized) return null

    return <>{children}</>
}

export default AuthGuard

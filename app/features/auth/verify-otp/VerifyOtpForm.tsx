"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/navigation"
import { Delete } from "lucide-react"
import Input from '@/app/shared/components/elements/Input'
import Button from '@/app/shared/components/elements/Button'
import { useVerifyOtp } from '../hooks/useVerifyOtp'
import { useForgotPassword } from '../hooks/useForgotPassword'
import { getData, saveData } from '@/app/utils/storage/storageHelper'
import { FORGOT_PASSWORD_EMAIL_KEY, OTP_EXPIRES_AT_KEY, OTP_DURATION_SECONDS } from '../hooks/useForgotPassword'
import { showToast } from '@/app/lib/toast'

interface VerifyOtpFormProps {

    source: string,
    showPaymentSuccess: boolean,
    setShowPaymentSuccess: (value: boolean) => void

}
const VerifyOtpForm = ({ source, showPaymentSuccess: _showPaymentSuccess, setShowPaymentSuccess }: VerifyOtpFormProps) => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(OTP_DURATION_SECONDS)
    // Absolute wall-clock timestamp the OTP expires at — the source of truth for
    // the countdown. `timeLeft` is always recomputed from this, never decremented
    // on its own, so a background/throttled tab can't leave the display stale.
    const expiresAtRef = useRef<number>(0)
    const router = useRouter()
    const { mutate: verifyOtp, isPending } = useVerifyOtp()
    const { mutate: forgotPassword, isPending: isResending } = useForgotPassword()

    const handleVerifyOtp = () => {
        if (source === "payment") {
            setShowPaymentSuccess(true)
            return
        }

        if (source === "forgot-password") {
            const email = getData<string>(FORGOT_PASSWORD_EMAIL_KEY, "local")
            if (!email) return

            verifyOtp(
                { email, otp: otp.join("") },
                { onSuccess: () => router.push("/set-password") }
            )
            return
        }

        router.push("/dashboard")
    }

    // Resyncs the displayed countdown from the absolute expiry — call this on every
    // tick and whenever the tab regains visibility, instead of trusting a running
    // decrement (which drifts once a background tab gets throttled by the browser).
    const syncTimeLeft = () => {
        setTimeLeft(Math.max(0, Math.floor((expiresAtRef.current - Date.now()) / 1000)))
    }

    const setOtpExpiry = (expiresAt: number) => {
        expiresAtRef.current = expiresAt
        saveData(OTP_EXPIRES_AT_KEY, expiresAt, "local")
        syncTimeLeft()
    }

    const restartTimer = () => {
        setOtpExpiry(Date.now() + OTP_DURATION_SECONDS * 1000)
        setOtp(['', '', '', '', '', ''])
    }

    const handleResendOtp = () => {
        if (timeLeft > 0 || isResending) return

        if (source === "forgot-password") {
            const email = getData<string>(FORGOT_PASSWORD_EMAIL_KEY, "local")
            if (!email) {
                showToast.error("Session expired", "Please restart the forgot password flow.")
                return
            }

            forgotPassword(email, {
                onSuccess: () => {
                    // useForgotPassword's onSuccess persisted a fresh expiry to storage —
                    // re-read it here so our ref/countdown line up with the stored value.
                    const freshExpiry = getData<number>(OTP_EXPIRES_AT_KEY, "local")
                    setOtpExpiry(freshExpiry ?? Date.now() + OTP_DURATION_SECONDS * 1000)
                    setOtp(['', '', '', '', '', ''])
                },
            })
            return
        }

        // No real resend endpoint for the demo flows (payment/default) — just restart the local countdown
        restartTimer()
    }

    // Countdown is derived from a persisted expiry timestamp (set when the OTP was
    // sent) instead of a fresh in-memory value, so refreshing this page doesn't
    // restart the timer — it just resumes from however much time is actually left.
    //
    // Each tick recomputes timeLeft from that absolute timestamp rather than
    // decrementing the previous value: browsers throttle (or pause) setInterval
    // in a background tab, and this flow requires switching away to check email
    // for the code, so a naive decrement can fall behind real elapsed time and
    // still show a few seconds left after the backend has already expired the OTP.
    // Resyncing on `visibilitychange` snaps the display to the truth the moment
    // the tab is focused again, instead of waiting for a throttled tick.
    useEffect(() => {
        const stored = getData<number>(OTP_EXPIRES_AT_KEY, "local")
        expiresAtRef.current = stored ?? Date.now() + OTP_DURATION_SECONDS * 1000
        if (!stored) saveData(OTP_EXPIRES_AT_KEY, expiresAtRef.current, "local")
        syncTimeLeft()

        const interval = setInterval(syncTimeLeft, 1000)
        document.addEventListener("visibilitychange", syncTimeLeft)
        return () => {
            clearInterval(interval)
            document.removeEventListener("visibilitychange", syncTimeLeft)
        }
    }, [])

    useEffect(() => {
        if (otp.every(d => d !== '')) {
            console.log('OTP complete:', otp.join(''))
        }
    }, [otp])
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()

        const pastedData = e.clipboardData.getData('text').trim()

        // Only allow numbers
        if (!/^\d+$/.test(pastedData)) return

        const digits = pastedData.slice(0, 6).split('') // limit to 6 digits
        const newOtp = [...otp]

        digits.forEach((digit, index) => {
            newOtp[index] = digit
        })

        setOtp(newOtp)

        // Focus last filled input
        const lastIndex = digits.length - 1
        const input = document.getElementById(`otp-${lastIndex}`) as HTMLInputElement
        input?.focus()
    }
    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
                nextInput?.focus()
            }
        }
    }

    const handleKeyPress = (key: string) => {
        const emptyIndex = otp.findIndex(digit => digit === '')
        if (emptyIndex !== -1 && key >= '0' && key <= '9') {
            handleOtpChange(emptyIndex, key)
        }
    }

    const handleBackspace = () => {
        const lastFilledIndex = otp.map((digit, index) => digit !== '' ? index : -1).filter(index => index !== -1).pop()
        if (lastFilledIndex !== undefined && lastFilledIndex >= 0) {
            handleOtpChange(lastFilledIndex, '')
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const key = e.key

        // 👉 Move Right
        if (key === 'ArrowRight' && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
            next?.focus()
        }

        // 👉 Move Left
        if (key === 'ArrowLeft' && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
            prev?.focus()
        }

        // 👉 Backspace behavior
        if (key === 'Backspace') {
            if (otp[index]) {
                // just clear current
                handleOtpChange(index, '')
            } else if (index > 0) {
                // move to previous
                const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
                prev?.focus()
                handleOtpChange(index - 1, '')
            }
        }
    }

    return (
        <div className="flex flex-col  lg:items-end   ">


            {/* OTP Content */}
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col mb-8">
                    <p className="font-light text-4xl text-white mb-2">Verify <span className="font-bold">OTP</span></p>
                    <p className="text-white font-light text-xl">Please enter the OTP we just sent to email</p>
                </div>

                {/* OTP Input Fields */}
                <div className="grid grid-cols-6 gap-2 md:gap-2 mb-8 ">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onPaste={handlePaste}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            containerClassName={` w-11 sm:w-12 md:w-14 h-11 sm:h-12 md:h-14  p-0 rounded-full flex items-center justify-center ${digit ? 'bg-white ' : 'text-black! bg-[#2C2C2C6E]'}`}
                            className={`w-full h-full text-center  outline-0  bg-transparent ${digit ? 'text-black!' : 'text-white!'}`}
                            maxLength={1}
                            paddingClass="px-0!"
                        />
                    ))}
                </div>

                {/* Resend OTP Timer */}
                <div className="flex justify-center mb-8">
                    <p className="w-fit text-[#DDDDDD]">

                        <span
                            onClick={handleResendOtp}
                            className={`border-b border-transparent transition-all duration-300 ${
                                timeLeft === 0 && !isResending
                                    ? "text-[#5FDA78] hover:border-[#5FDA78] cursor-pointer"
                                    : "text-[#DDDDDD] cursor-default"
                            }`}
                        >
                            {isResending ? "Resending..." : "Resend OTP"}
                        </span>

                        {timeLeft > 0 && (
                            <>
                                <span className="ms-1">in</span>
                                <span className="text-white ms-1">
                                    {formatTime(timeLeft)}
                                </span>
                            </>
                        )}

                    </p>
                </div>

                {/* Continue Button */}
                <div className="mb-8  ">
                    <Button type="submit" onClick={handleVerifyOtp} disabled={isPending} className="px-10 py-3! disabled:opacity-60">
                        Continue
                    </Button>
                </div>

                {/* Numeric Keypad */}
                <div className="mt-auto md:hidden">
                    <div className="grid grid-cols-3 place-items-center gap-1 max-w-xs mx-auto ">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''].map((key, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (key === '') {
                                        handleBackspace()
                                    } else if (key !== '.') {
                                        handleKeyPress(key)
                                    }
                                }}
                                className={`w-23 h-12 rounded-[36px] ${key === '' ? 'bg-white text-black!' : 'bg-[#2C2C2C6E]'} cursor-pointer text-white text-lg font-light hover:bg-[#3C3C3C8E] transition-colors flex items-center justify-center`}
                            >
                                {key === '' ? <Delete size={20} /> : key}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default VerifyOtpForm
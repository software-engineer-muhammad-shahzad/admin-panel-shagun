"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/app/shared/components/elements/Button"
import Input from "@/app/shared/components/elements/Input"
import { useForgotPassword } from "../hooks/useForgotPassword"

const ForgotPasswordform = () => {
    const [email, setEmail] = useState("")
    const router = useRouter()
    const { mutate: forgotPassword, isPending } = useForgotPassword()

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        forgotPassword(email, {
            onSuccess: () => router.push(`/verify-otp?source=forgot-password`),
        })
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-5 w-full">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="py-2! md:py-4! disabled:opacity-60"
                >
                    {isPending ? "Sending..." : "Next"}
                </Button>
            </div>
        </form>
    )
}

export default ForgotPasswordform

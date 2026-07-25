"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import LeftBannerText from "@/app/features/auth/LeftBannerText";
import Input from "@/app/shared/components/elements/Input";
import Checkbox from "@/app/shared/components/elements/Checkbox";
import Button from "@/app/shared/components/elements/Button";
import { useSignIn } from "@/app/features/auth/hooks/useSignIn";
import { showToast } from "@/app/lib/toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { mutate: signIn, isPending } = useSignIn();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    signIn(
      { email, password },
      {
        onSuccess: () => {
          showToast.success("Logged in successfully", "Welcome back!")
          router.push("/dashboard")
        },
        onError: () => {
          setError("Invalid email or password. Please try again.")
          showToast.error("Login failed", "Invalid email or password.")
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#350366] text-white">
      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="bg-[#350366] px-1 py-18 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:gap-6 lg:gap-8 rounded-lg">

          {/* Left */}
          <div className="flex-1 flex flex-col justify-center">
            <LeftBannerText />
          </div>

          {/* Right */}
          <form className="flex-1 space-y-5 sm:space-y-6 mt-14" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="border border-[#5FDA78] rounded-[147px] glass-card">
              <div className="py-2 md:py-3 px-5 md:px-6 flex flex-col gap-1">
                <label className="text-white text-[14px]">Password</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-none outline-none font-normal text-[#989898] placeholder:text-[#989898] text-sm bg-transparent w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#989898] hover:text-white transition-colors shrink-0"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-200">
              <Checkbox label="Remember me" />
              <Link
                href="/forgot-password"
                className="hover:text-white cursor-pointer border-b border-transparent transition-all duration-300 hover:border-white"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-10 w-full z-50">
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 w-full z-50 disabled:opacity-60"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed -top-22.5 right-0 md:top-10 md:left-0 md:right-auto">
        <Image
          src="/images/auth-images/left-rainbow.png"
          alt="Rainbow"
          width={700}
          height={700}
          className="object-contain scale-x-[-1] md:scale-x-100"
        />
      </div>
    </div>
  );
}

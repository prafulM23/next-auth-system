"use client"
import { useContext, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
export default function Login() {
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useRouter()

    const context = useContext(AuthContext)
    if (!context) return null
    const { screen, setScreen } = context


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            const res = await axios.post("/api/login", {
                email, password
            }, { withCredentials: true }
            )

            if (res.status === 200) {
                setLoading(false)
                toast.success("Logged in successfully!")
                navigate.replace("/dashboard")
            }
            setEmail("")
            setPassword("")
        } catch (error: any) {
            setLoading(false)
            return toast.error(error.response.data.msg || "something Wrong")
        }
    }

    return (
        <div className="w-full max-w-md">

            {/* Card */}
            <div className="w-full bg-[#111827]/90 border border-cyan-500/20 backdrop-blur-xl rounded-[28px] p-5 sm:p-8 shadow-2xl shadow-cyan-500/10">


                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-7">

                    <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight flex items-center gap-4">
                            Welcome Back
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            Login Account
                        </p>
                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-400 flex items-center justify-center text-black font-bold text-xl sm:text-2xl shrink-0">
                        A
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleLogin}>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                            Email Address
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Enter your email"
                            className="w-full h-12 sm:h-14 bg-[#0b1120] text-white border border-cyan-500/20 rounded-xl px-4 text-sm sm:text-base outline-none focus:border-cyan-400 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder="Enter your password"
                            className="w-full h-12 sm:h-14 bg-[#0b1120] text-white border border-cyan-500/20 rounded-xl px-4 text-sm sm:text-base outline-none focus:border-cyan-400 transition-all"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full h-12 sm:h-14 bg-cyan-400 hover:bg-cyan-300 text-black rounded-xl text-sm sm:text-base font-bold transition-all duration-300"
                    >
                        {loading ? "Logging in..." : "Login Account"}
                    </button>

                    <div className="flex items-center justify-between text-sm mt-2">

                        <button
                            type="button"

                            onClick={() => setScreen("forgot")}

                            className="text-cyan-400 hover:text-cyan-300 transition-all"
                        >
                            Forgot Password?
                        </button>

                        <button
                            type="button"
                            onClick={() => setScreen("signup")}
                            className="text-cyan-400 hover:text-cyan-300 transition-all"
                        >
                            Create Account
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
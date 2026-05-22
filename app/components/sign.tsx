"use client"
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function Sign() {
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await axios.post("/api/sign", {
                name, email, password
            })
            toast.success("Account created successfully!")
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.msg || "Something went wrong!")
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
                            Create Account
                        </h2>


                        <p className="text-gray-400 text-sm mt-2">
                            Sign up to continue
                        </p>
                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-400 flex items-center justify-center text-black font-bold text-xl sm:text-2xl shrink-0">
                        A
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                            Your Name
                        </label>

                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder="Enter your name"
                            className="w-full h-12 sm:h-14 bg-[#0b1120] text-white border border-cyan-500/20 rounded-xl px-4 text-sm sm:text-base outline-none focus:border-cyan-400 transition-all"
                        />
                    </div>

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
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

            </div>
        </div>
    );
}
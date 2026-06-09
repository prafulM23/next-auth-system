"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function VerifyOtp() {

    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem("email");
    const context = useContext(AuthContext)
    if (!context) return null;
    const { screen, setScreen } = context


    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
    ]);

    const navigate = useRouter();

    const handleChange = (
        value: string,
        index: number
    ) => {

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);

        setOtp(newOtp);

        if (value && index < 5) {
            const next = document.getElementById(
                `otp-${index + 1}`
            );
            next?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {

        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            const prev = document.getElementById(
                `otp-${index - 1}`
            );

            prev?.focus();
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        try {
            e.preventDefault();
            setLoading(true)
            const otpValue = otp.join("");

            if (otpValue.length !== 4) {
                return toast.error(
                    "Enter complete OTP"
                );
            }

            const res = await axios.post("/api/verifyOtp", {
                user,
                otpValue

            })
            setOtp(["", "", "", ""])

            toast.success(res.data.msg)
            setLoading(false)
            setScreen("reset")

        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.msg || "something Wrong")

        }

    };

    return (
        <div className="w-full max-w-md">

            <div className="w-full bg-[#111827]/90 border border-cyan-500/20 backdrop-blur-xl rounded-[28px] p-5 sm:p-8 shadow-2xl shadow-cyan-500/10">

                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-7">

                    <div className="flex-1">

                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                            Verify OTP
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            Enter the 4-digit code sent to your email
                        </p>

                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-400 flex items-center justify-center text-black font-bold text-xl">
                        A
                    </div>

                </div>

                {/* Form */}
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label className="text-sm text-gray-400 mb-4 block">
                            Enter OTP
                        </label>

                        <div className="flex justify-between gap-2">

                            {otp.map(
                                (
                                    digit,
                                    index
                                ) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(
                                                e,
                                                index
                                            )
                                        }
                                        className="
                                            w-12 h-12
                                            sm:w-14 sm:h-14
                                            bg-[#0b1120]
                                            border border-cyan-500/20
                                            rounded-xl
                                            text-center
                                            text-white
                                            text-xl
                                            font-bold
                                            outline-none
                                            focus:border-cyan-400
                                        "
                                    />
                                )
                            )}

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="
                            w-full
                            h-12 sm:h-14
                            bg-cyan-400
                            hover:bg-cyan-300
                            text-black
                            rounded-xl
                            font-bold
                            transition-all
                        "
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Didn't receive the code?
                        <button
                            type="button"
                            className="ml-2 text-cyan-400 hover:text-cyan-300"
                        >
                            Resend OTP
                        </button>
                    </p>

                </form>

            </div>

        </div>
    );
}
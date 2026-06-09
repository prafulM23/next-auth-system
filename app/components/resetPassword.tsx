"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem("email")
    const context = useContext(AuthContext)
    if (!context) return null;
    const {setScreen } = context

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        try {
            e.preventDefault();
            setLoading(true);
            if (password !== confirmPassword) {
                return toast.error(
                    "Passwords do not match!"
                );
            }

            const res = await axios.post(
                "/api/resetPassword",
                {
                    user,
                    password
                }
            );

            if (res.status === 200) {
                toast.success(
                    "Password updated successfully!"
                );
                setScreen("login")
            }

        } catch (error: any) {
            setLoading(false)
            toast.error(
                error.response?.data?.msg ||
                "Something went wrong"
            );

        }
    };

    return (
        <div className="w-full max-w-md">

            <div className="w-full bg-[#111827]/90 border border-cyan-500/20 backdrop-blur-xl rounded-[28px] p-5 sm:p-8 shadow-2xl shadow-cyan-500/10">

                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-7">

                    <div className="flex-1">

                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                            Reset Password
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            Create your new password
                        </p>

                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-400 flex items-center justify-center text-black font-bold text-xl">
                        A
                    </div>

                </div>

                {/* Form */}
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >

                    {/* New Password */}
                    <div>

                        <label className="text-sm text-gray-400 mb-2 block">
                            New Password
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter new password"
                            className="
                                w-full
                                h-12 sm:h-14
                                bg-[#0b1120]
                                text-white
                                border border-cyan-500/20
                                rounded-xl
                                px-4
                                outline-none
                                focus:border-cyan-400
                            "
                        />

                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className="text-sm text-gray-400 mb-2 block">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Confirm password"
                            className="
                                w-full
                                h-12 sm:h-14
                                bg-[#0b1120]
                                text-white
                                border border-cyan-500/20
                                rounded-xl
                                px-4
                                outline-none
                                focus:border-cyan-400
                            "
                        />

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
                            ? "Updating..."
                            : "Update Password"}
                    </button>

                </form>

            </div>

        </div>
    );
}
"use client"
import axios from "axios";
import { LogOut, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
export default function Dashboard() {
    const [loading, setLoading] = useState<{ LogOut: boolean; Delete: boolean }>({ LogOut: false, Delete: false })
    const navigate = useRouter()

    const handlelogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            setLoading({ ...loading, LogOut: true })
            const res = await axios.get("/api/logout")
            if (res.status === 200) {
                setLoading({ ...loading, LogOut: false })
                toast.success("Logged out successfully!")
                navigate.replace("/")
            }

        } catch (error: any) {
            setLoading({ ...loading, LogOut: false })
            return toast.error(error.response.data.msg || "something Wrong")
        }
    }

    const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            setLoading({ ...loading, Delete: true })
            const res = await axios.delete("/api/delete-account")
            if (res.status === 200) {
                setLoading({ ...loading, Delete: false })
                toast.success("Account Deleted Successfully!")
                navigate.replace("/")
            }

        } catch (error: any) {
            setLoading({ ...loading, Delete: false })
            return toast.error(error.response.data.msg || "something Wrong")
        }
    }

    return (
        <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">

            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-52 sm:w-72 h-52 sm:h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

            {/* Dashboard Card */}
            <div className="relative z-10 w-full max-w-4xl bg-[#111827]/80 backdrop-blur-xl border border-cyan-500/20 rounded-[25px] sm:rounded-[35px] p-5 sm:p-8 md:p-12 shadow-2xl shadow-cyan-500/10">

                {/* Top Section */}
                <div className="flex flex-col gap-5 mb-8 sm:mb-10">

                    <div>
                        <p className="text-cyan-400 uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm font-semibold mb-3">
                            Authentication System
                        </p>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 break-words">
                            Welcome <span className="text-2xl text-cyan-400"></span> 👋
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 max-w-2xl">
                            You have successfully logged into your account.
                            Your authentication system is working perfectly.
                        </p>
                    </div>
                </div>

                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-8">

                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-4">
                         <Rocket color="#ff0000" /> Login Successful
                    </h2>

                    <p className="text-gray-300 leading-7 sm:leading-8 text-sm sm:text-lg">
                        Welcome to your secure dashboard.
                        You can now access protected routes,
                        manage authentication, and continue
                        building your modern auth system.
                    </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row gap-4">

                    <button onClick={handlelogout} className="w-full sm:w-auto bg-red-500 hover:bg-red-400 px-6 sm:px-3 py-3 sm:py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-red-500/20">
                        {loading.LogOut ? "Logging out..." : "Logout"}
                    </button>

                    <button onClick={handleDeleteAccount} className="w-full sm:w-auto bg-red-500 hover:bg-red-400 px-6 sm:px-6 py-3 sm:py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-red-500/20">
                        {loading.Delete ? "Deleting account..." : "Delete Account"}
                    </button>

                </div>
            </div>
        </div>
    );
}
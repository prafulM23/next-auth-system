"use client";

import { useContext } from "react";
import Login from "./components/login";
import Sign from "./components/sign";
import { AuthContext } from "@/context/AuthContext";
import { LockKeyholeOpen, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const context = useContext(AuthContext)
  if (!context) return null
  const { mood, setMood } = context;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-5 border-b border-cyan-500/10 backdrop-blur-md">

        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-cyan-400">
            AuthFlow
          </h1>
        </div>

        <button
          className="bg-cyan-400 text-black px-4 sm:px-5 py-2 rounded-xl font-semibold hover:bg-cyan-300 transition-all duration-300 text-sm sm:text-base"
          onClick={() => setMood(!mood)}
        >
          {mood ? "Login" : "Sign Up"}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-14 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left">

          <p className="text-cyan-400 font-semibold mb-4 tracking-[3px] uppercase text-xs sm:text-sm">
            Secure Authentication System
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Modern
            <span className="text-cyan-400"> Authentication </span>
            <br />
            For Your App
          </h2>

          <p className="text-gray-400 text-sm sm:text-lg leading-7 sm:leading-8 max-w-xl mx-auto lg:mx-0 mb-8">
            Build secure login, signup, protected routes,
            JWT authentication, and modern user management
            with a beautiful UI.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

            <div className="bg-[#111827]/60 border border-cyan-500/10 rounded-2xl p-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400">
                99.9%
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Secure Login
              </p>
            </div>

            <div className="bg-[#111827]/60 border border-cyan-500/10 rounded-2xl p-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400">
                JWT
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Authentication
              </p>
            </div>

            <div className="bg-[#111827]/60 border border-cyan-500/10 rounded-2xl p-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400">
                24/7
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Protection
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="w-full flex justify-center">
          {mood ? <Sign /> : <Login />}
        </div>

      </section>

      {/* Features */}
      <section className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 pb-14 sm:pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-[#111827] border border-cyan-500/10 rounded-3xl p-6 hover:border-cyan-400/30 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 text-2xl mb-5">
              <LockKeyholeOpen color="#ff8800" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Secure Login
            </h3>

            <p className="text-gray-400 leading-7 text-sm sm:text-base">
              Advanced secure authentication system with
              password protection and encrypted sessions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111827] border border-cyan-500/10 rounded-3xl p-6 hover:border-cyan-400/30 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 text-2xl mb-5">
              <Zap color="#fff700" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Fast Authentication
            </h3>

            <p className="text-gray-400 leading-7 text-sm sm:text-base">
              Lightning fast login and signup flow using
              modern technologies and APIs.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111827] border border-cyan-500/10 rounded-3xl p-6 hover:border-cyan-400/30 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 text-2xl mb-5">
              <ShieldCheck color="#00ccff" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Protected Routes
            </h3>

            <p className="text-gray-400 leading-7 text-sm sm:text-base">
              Manage private routes and role-based access
              securely inside your application.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
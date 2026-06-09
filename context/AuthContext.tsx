
"use client";
import { createContext, Dispatch, useState } from "react";

type AuthContextType = {
    screen: Screen,
    setScreen: Dispatch<React.SetStateAction<Screen>>
    mood: boolean,
    setMood: Dispatch<React.SetStateAction<boolean>>,
    Forgotmood: boolean,
    setForgotMood: Dispatch<React.SetStateAction<boolean>>,
    Otpmood: boolean,
    setOtpMood: Dispatch<React.SetStateAction<boolean>>,
    Resetmood: boolean,
    setResetMood: Dispatch<React.SetStateAction<boolean>>
}
type Screen = | "login" | "signup" | "forgot" | "otp" | "reset";

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [mood, setMood] = useState<boolean>(false)
    const [Forgotmood, setForgotMood] = useState<boolean>(false)
    const [Otpmood, setOtpMood] = useState<boolean>(false)
    const [Resetmood, setResetMood] = useState<boolean>(false)
    const [screen, setScreen] = useState<Screen>("login");


    return (
        <AuthContext.Provider value={{ mood, setMood, Forgotmood, setForgotMood, Otpmood, setOtpMood, setResetMood, Resetmood, screen, setScreen }}>
            {children}
        </AuthContext.Provider>
    )

}






"use client";
import { createContext, Dispatch, useState } from "react";

type AuthContextType = {
    mood: boolean,
    setMood: Dispatch<React.SetStateAction<boolean>>,
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [mood, setMood] = useState<boolean>(false)

    return (

        <AuthContext.Provider value={{ mood, setMood }}>
            {children}
        </AuthContext.Provider>
    )

}





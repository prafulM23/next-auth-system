import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secretKey = process.env.auth_secret as string

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body
        const existUser = await prisma.user.findUnique({
            where: { email }
        })
        if (!existUser) {
            return NextResponse.json({ msg: "User Not Found !" }, { status: 404 })
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            return NextResponse.json({ msg: "Wrong Password !" }, { status: 400 })
        }
        const res = NextResponse.json({ msg: "Login SuccessFully", email: existUser.email }, { status: 200 })

        const token = jwt.sign({ email: existUser.email }, secretKey, { expiresIn: "1h" })

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60
        })
        return res
    } catch (error) {
        return NextResponse.json({ msg: "Somethhing went wrong !" }, { status: 500 })
    }
}
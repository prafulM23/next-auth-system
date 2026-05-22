import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, password } = body
        const existUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existUser) {
            return NextResponse.json({ msg: "User Already Exist !" }, { status: 400 })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({ data: { name, email, password: hashPassword } })
        return NextResponse.json({ msg: "Account created successfully!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 })
    }
}
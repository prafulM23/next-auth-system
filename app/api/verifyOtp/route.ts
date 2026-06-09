import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { user, otpValue } = body;

        const existUser = await prisma.user.findUnique({ where: { email: user } })

        if (!existUser) {
            return NextResponse.json({ msg: "User Not Found" }, { status: 404 })
        }

        if (!otpValue) {
            return NextResponse.json({ msg: "Otp Not Found" }, { status: 404 })
        }

        if (existUser.otpExpiry && Date.now() > existUser.otpExpiry.getTime()) {
            return NextResponse.json(
                { msg: "OTP has expired" },
                { status: 400 }
            );
        }

        if (existUser.otp !== otpValue) {
            return NextResponse.json(
                { msg: "OTP is Invalid" },
                { status: 400 }
            );
        }

        console.log(existUser)
        return NextResponse.json({ msg: "Verify Successfully" }, { status: 200 })

    } catch (error) {
        console.log("error backotp --------------------", error)
        return NextResponse.json({ msg: "Server Is Not Working" }, { status: 500 })
    }

}
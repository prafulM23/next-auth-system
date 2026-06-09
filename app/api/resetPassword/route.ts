import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { user, password } = body;

        if (!user || !password) {
            return NextResponse.json(
                { msg: "All fields are required" },
                { status: 400 }
            );
        }

        const existUser = await prisma.user.findUnique({
            where: { email: user },
        });

        if (!existUser) {
            return NextResponse.json(
                { msg: "User Not Found" },
                { status: 404 }
            );
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update Password
        await prisma.user.update({
            where: {
                email: user,
            },
            data: {
                password: hashedPassword,
                otp: null,
                otpExpiry: null,
            },
        });

        return NextResponse.json(
            {
                msg: "Password Reset Successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                msg: "Server Is Not Working",
            },
            {
                status: 500,
            }
        );
    }
}
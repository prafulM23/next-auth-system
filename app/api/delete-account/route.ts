import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma";
export async function DELETE(req: NextRequest) {
    try {
        const secretKey = process.env.auth_secret as string;

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ msg: "Unauthorized!" }, { status: 401 })
        }

        const decode = jwt.verify(
            token,
            secretKey
        ) as { email: string };

        await prisma.user.delete({
            where: { email: decode.email }
        })

        const res = NextResponse.json({ msg: "Account Deleted Successfully!" }, { status: 200 })
        res.cookies.set("token", "", { expires: new Date(0), path: "/" })
        return res

    } catch (error: any) {
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 })
    }

}
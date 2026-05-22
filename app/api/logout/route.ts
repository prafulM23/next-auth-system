import { NextResponse } from "next/server";

export async function GET() {

    const response = NextResponse.json({
        msg: "Logout Successfully"
    });

    response.cookies.set("token", "", {
        expires: new Date(0),
        path: "/"
    });

    return response;
}
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

    const token = req.cookies.get("token")?.value;

    const pathname = req.nextUrl.pathname;

    try {

        // Dashboard protect
        if (pathname === "/dashboard") {

            if (!token) {
                return NextResponse.redirect(
                    new URL("/", req.url)
                );
            }

            await jwtVerify(
                token,
                new TextEncoder().encode(process.env.auth_secret)
            );
        }

        // Login page protect
        if (pathname === "/" && token) {

            await jwtVerify(
                token,
                new TextEncoder().encode(process.env.auth_secret)
            );

            return NextResponse.redirect(
                new URL("/dashboard", req.url)
            );
        }

        return NextResponse.next();

    } catch (error) {

        const response = NextResponse.redirect(
            new URL("/", req.url)
        );

        response.cookies.delete("token");

        return response;
    }
}

export const config = {
    matcher: ["/", "/dashboard"]
}
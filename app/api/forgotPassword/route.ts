import { transporter } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { generateOtp } from "@/utils/generateOtp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { email } = data
    if (!email) {
      return NextResponse.json({ msg: "Email Not Found" }, { status: 404 })
    }
    const existUser = await prisma.user.findUnique({ where: { email } })
    if (!existUser) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 404 })
    }

    const otp = generateOtp()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f4f7fb;padding:30px;">

      <div style="background:#111827;padding:20px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:#22d3ee;margin:0;">AuthFlow</h1>
        <p style="color:#9ca3af;margin-top:8px;">
          Secure Authentication System
        </p>
      </div>

      <div style="background:white;padding:30px;border-radius:0 0 12px 12px;">

        <h2 style="color:#111827;">
          Password Reset Request
        </h2>

        <p style="color:#4b5563;font-size:15px;line-height:24px;">
          We received a request to reset the password for your account.
          Use the verification code below to continue.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <span
            style="
              display:inline-block;
              padding:14px 30px;
              background:#22d3ee;
              color:#111827;
              font-size:32px;
              font-weight:bold;
              letter-spacing:8px;
              border-radius:10px;
            "
          >
            ${otp}
          </span>
        </div>

        <p style="color:#ef4444;font-weight:600;">
          This OTP will expire in 5 minutes.
        </p>

        <p style="color:#4b5563;font-size:14px;line-height:22px;">
          If you did not request a password reset, you can safely ignore this email.
          No changes have been made to your account.
        </p>

        <div style="margin-top:25px;padding:15px;background:#f9fafb;border-radius:8px;">
          <p style="margin:0;color:#6b7280;font-size:13px;">
            <strong>Security Tip:</strong> Never share this OTP with anyone.
            AuthFlow support will never ask for your verification code.
          </p>
        </div>

        <hr style="margin:25px 0;border:none;border-top:1px solid #e5e7eb;" />

        <p style="color:#6b7280;font-size:12px;text-align:center;">
          © 2026 AuthFlow. All rights reserved.
        </p>

      </div>
    </div>
  `,

    })

    const otpUser = await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
    });


    console.log("users-------------------", otpUser)
    return NextResponse.json({ msg: "OTP Send To Your Email", user: email }, { status: 200 })

  } catch (error) {
    console.log("errror------------------", error)
    return NextResponse.json({ msg: "Server Not Working" }, { status: 500 })
  }
}
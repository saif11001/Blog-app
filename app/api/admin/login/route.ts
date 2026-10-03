import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminPassword && password === adminPassword) {
        const response = NextResponse.json({ success: true });
        response.cookies.set("admin_auth", adminPassword, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return response;
    }

    return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
}
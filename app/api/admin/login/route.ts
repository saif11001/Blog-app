import { NextRequest, NextResponse } from "next/server";
import {
    SESSION_COOKIE,
    SESSION_MAX_AGE,
    createSessionToken,
    getSessionSecret,
    passwordMatches,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
    let password: unknown;
    try {
        ({ password } = await request.json());
    } catch {
        return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }

    const secret = getSessionSecret();

    if (secret && (await passwordMatches(password, process.env.ADMIN_PASSWORD))) {
        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE, await createSessionToken(secret), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: SESSION_MAX_AGE,
            path: "/",
        });
        return response;
    }

    // small delay to slow down password guessing
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
}

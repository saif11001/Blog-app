import { NextRequest, NextResponse } from "next/server";

const PROTECTED_API_RULES: { path: string; methods: string[] }[] = [
    { path: "/api/blog", methods: ["POST", "DELETE"] },
    { path: "/api/email", methods: ["GET", "DELETE"] },
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const isLoggedIn = !!adminPassword && request.cookies.get("admin_auth")?.value === adminPassword;

    if (isLoggedIn) {
        return NextResponse.next();
    }

    const isProtectedApi = PROTECTED_API_RULES.some(
        (rule) => pathname.startsWith(rule.path) && rule.methods.includes(request.method)
    );

    if (isProtectedApi) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/blog/:path*", "/api/email/:path*"],
};
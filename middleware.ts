import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ADMIN_COOKIE_NAME, getAdminSessionSecret, verifyAdminSessionToken } from "@/lib/admin-session"

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value

    // Protect admin routes (except login) and admin API routes (except auth)
    const isProtected =
        (path.startsWith("/admin") && !path.startsWith("/admin/login")) ||
        (path.startsWith("/api/admin") && !path.startsWith("/api/admin/auth"))

    if (isProtected) {
        // The signature is verified against the server secret; a hand-made cookie fails here.
        const session = await verifyAdminSessionToken(token, getAdminSessionSecret())
        if (session) return NextResponse.next()

        if (path.startsWith("/api/admin")) {
            const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            if (token) response.cookies.delete(ADMIN_COOKIE_NAME)
            return response
        }
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        if (token) response.cookies.delete(ADMIN_COOKIE_NAME)
        return response
    }

    // If accessing login while already authenticated, redirect to admin dashboard
    if (path === "/admin/login" && token) {
        const session = await verifyAdminSessionToken(token, getAdminSessionSecret())
        if (session) return NextResponse.redirect(new URL("/admin", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
}

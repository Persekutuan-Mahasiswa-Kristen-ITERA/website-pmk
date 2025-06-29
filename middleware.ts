import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Protect admin routes (except login) and admin API routes (except auth)
    if (
        (path.startsWith("/admin") && !path.startsWith("/admin/login")) ||
        (path.startsWith("/api/admin") && !path.startsWith("/api/admin/auth"))
    ) {
        const token = request.cookies.get("admin-token")?.value

        if (!token) {
            // For API routes, return 401
            if (path.startsWith("/api/admin")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            }
            // For admin pages, redirect to login
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }

        try {
            // For now, we'll do basic token validation
            // In production, properly verify JWT signature
            const tokenParts = token.split(".")
            if (tokenParts.length !== 3) {
                throw new Error("Invalid token format")
            }

            // Decode payload without verification (for demo)
            const payload = JSON.parse(atob(tokenParts[1]))

            // Check if token is expired
            if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
                throw new Error("Token expired")
            }

            // Check if user is admin
            if (!payload.isAdmin) {
                throw new Error("Not admin")
            }
        } catch (error) {
            // For API routes, return 401
            if (path.startsWith("/api/admin")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            }
            // For admin pages, redirect to login
            const response = NextResponse.redirect(new URL("/admin/login", request.url))
            response.cookies.delete("admin-token")
            return response
        }
    }

    // If accessing login while already authenticated, redirect to admin dashboard
    if (path === "/admin/login") {
        const token = request.cookies.get("admin-token")?.value

        if (token) {
            try {
                const tokenParts = token.split(".")
                if (tokenParts.length === 3) {
                    const payload = JSON.parse(atob(tokenParts[1]))

                    // Check if token is still valid
                    if (payload.exp && payload.exp > Math.floor(Date.now() / 1000) && payload.isAdmin) {
                        return NextResponse.redirect(new URL("/admin", request.url))
                    }
                }
            } catch (error) {
                // Invalid token, let them access login page
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
}

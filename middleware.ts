import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Gate for /admin and /api/admin (PI-CORE D-16). Only checks that a PI-CORE session exists (JWT
 * verified locally by getClaims) and refreshes it. Which menus the person may use is decided by
 * requireWebAccess() in each API route and by /api/admin/me for the admin shell.
 * Without the PI-CORE env everything here is refused (fail closed).
 */
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isProtected = (path.startsWith("/admin") && !path.startsWith("/admin/login")) || path.startsWith("/api/admin")
    if (!isProtected) return NextResponse.next()

    const deny = () =>
        path.startsWith("/api/admin")
            ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            : NextResponse.redirect(new URL("/admin/login", request.url))

    const url = process.env.NEXT_PUBLIC_PICORE_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_PICORE_SUPABASE_PUBLISHABLE_KEY
    if (!url || !key) return deny()

    const response = NextResponse.next({ request })
    const supabase = createServerClient(url, key, {
        cookies: {
            getAll() {
                return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
            },
        },
    })

    let userId: string | undefined
    try {
        const { data } = await supabase.auth.getClaims()
        userId = data?.claims.sub
    } catch {
        userId = undefined
    }
    if (!userId) {
        const denied = deny()
        for (const cookie of response.cookies.getAll()) denied.cookies.set(cookie)
        return denied
    }
    return response
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
}

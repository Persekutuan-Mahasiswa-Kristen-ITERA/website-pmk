import { NextRequest, NextResponse } from "next/server"
import { createHash, timingSafeEqual } from "node:crypto"
import {
    ADMIN_COOKIE_NAME,
    ADMIN_SESSION_TTL_SECONDS,
    createAdminSessionToken,
    getAdminSessionSecret,
} from "@/lib/admin-session"

export const runtime = "nodejs"

/** Constant-time string comparison (hashing first makes the lengths equal). */
function safeEqual(a: string, b: string): boolean {
    const ha = createHash("sha256").update(a).digest()
    const hb = createHash("sha256").update(b).digest()
    return timingSafeEqual(ha, hb)
}

export async function POST(request: NextRequest) {
    try {
        const expectedUsername = process.env.ADMIN_USERNAME
        const expectedPassword = process.env.ADMIN_PASSWORD
        const secret = getAdminSessionSecret()

        // Fail closed: never fall back to built-in credentials.
        if (!expectedUsername || !expectedPassword || !secret) {
            console.error("Admin login is not configured: set ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET")
            return NextResponse.json({ error: "Login admin belum dikonfigurasi" }, { status: 503 })
        }

        const body = await request.json().catch(() => null)
        const username = typeof body?.username === "string" ? body.username : ""
        const password = typeof body?.password === "string" ? body.password : ""

        if (!username || !password) {
            return NextResponse.json({ error: "Username dan password harus diisi" }, { status: 400 })
        }

        // Evaluate both comparisons so timing does not reveal which one failed.
        const usernameOk = safeEqual(username, expectedUsername)
        const passwordOk = safeEqual(password, expectedPassword)
        if (!usernameOk || !passwordOk) {
            return NextResponse.json({ error: "Username atau password salah" }, { status: 401 })
        }

        const token = await createAdminSessionToken(username, secret)

        const response = NextResponse.json({ success: true })
        response.cookies.set(ADMIN_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: ADMIN_SESSION_TTL_SECONDS,
        })

        return response
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
    }
}

export async function DELETE() {
    // Logout - clear the cookie
    const response = NextResponse.json({ success: true })
    response.cookies.delete(ADMIN_COOKIE_NAME)
    return response
}

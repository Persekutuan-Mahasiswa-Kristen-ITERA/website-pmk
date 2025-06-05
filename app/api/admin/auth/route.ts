import { NextRequest, NextResponse } from "next/server"

// Simple in-memory credentials - in production, use a database
const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || "defaultusername",
    password: process.env.ADMIN_PASSWORD || "defaultpassword",
}

// Simple JWT-like token creation (for demo purposes)
function createToken(payload: { username: string; isAdmin: boolean; exp: number }): string {
    const header = { alg: "HS256", typ: "JWT" }
    const encodedHeader = btoa(JSON.stringify(header))
    const encodedPayload = btoa(JSON.stringify(payload))
    const signature = btoa(`${encodedHeader}.${encodedPayload}.secret`)
    return `${encodedHeader}.${encodedPayload}.${signature}`
}

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json({ error: "Username dan password harus diisi" }, { status: 400 })
        }

        // Check credentials
        if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
            return NextResponse.json({ error: "Username atau password salah" }, { status: 401 })
        }

        // Create token
        const token = createToken({
            username: username,
            isAdmin: true,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        })

        // Set cookie
        const response = NextResponse.json({ success: true })
        response.cookies.set("admin-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 24 hours in seconds
        })

        return response
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    // Logout - clear the cookie
    const response = NextResponse.json({ success: true })
    response.cookies.delete("admin-token")
    return response
}

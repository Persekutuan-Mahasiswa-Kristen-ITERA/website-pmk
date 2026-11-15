/**
 * Signed admin session tokens (HMAC-SHA256, JWT compact format).
 *
 * Uses only the Web Crypto API so the same code runs in the Edge middleware
 * and in Node route handlers. A token is accepted only when its signature
 * matches the server secret, so a cookie crafted by hand is rejected.
 */

export const ADMIN_COOKIE_NAME = "admin-token"
export const ADMIN_SESSION_TTL_SECONDS = 24 * 60 * 60

export interface AdminSessionPayload {
    sub: string
    isAdmin: true
    iat: number
    exp: number
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

/**
 * The signing secret. ADMIN_SESSION_SECRET is preferred; ADMIN_PASSWORD is the
 * fallback so an existing deployment keeps working until the new variable is set.
 * Returns null when neither is configured: callers must then refuse access.
 */
export function getAdminSessionSecret(): string | null {
    const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
    return secret && secret.length > 0 ? secret : null
}

function base64UrlEncode(bytes: Uint8Array): string {
    let binary = ""
    for (const byte of bytes) binary += String.fromCharCode(byte)
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(input: string): Uint8Array<ArrayBuffer> {
    if (!/^[A-Za-z0-9_-]*$/.test(input)) throw new Error("Invalid base64url")
    const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (input.length % 4)) % 4)
    const binary = atob(padded)
    const bytes = new Uint8Array(new ArrayBuffer(binary.length))
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return bytes
}

async function importKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
        "sign",
        "verify",
    ])
}

const HEADER = base64UrlEncode(encoder.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })))

export async function createAdminSessionToken(
    username: string,
    secret: string,
    nowSeconds: number = Math.floor(Date.now() / 1000)
): Promise<string> {
    const payload: AdminSessionPayload = {
        sub: username,
        isAdmin: true,
        iat: nowSeconds,
        exp: nowSeconds + ADMIN_SESSION_TTL_SECONDS,
    }
    const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)))
    const signingInput = `${HEADER}.${body}`
    const signature = await crypto.subtle.sign("HMAC", await importKey(secret), encoder.encode(signingInput))
    return `${signingInput}.${base64UrlEncode(new Uint8Array(signature))}`
}

/** Returns the payload of a valid, unexpired token, or null for anything else. */
export async function verifyAdminSessionToken(
    token: string | undefined | null,
    secret: string | null,
    nowSeconds: number = Math.floor(Date.now() / 1000)
): Promise<AdminSessionPayload | null> {
    if (!token || !secret) return null
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const [header, body, signature] = parts
    if (header !== HEADER) return null

    try {
        // crypto.subtle.verify compares in constant time.
        const valid = await crypto.subtle.verify(
            "HMAC",
            await importKey(secret),
            base64UrlDecode(signature),
            encoder.encode(`${header}.${body}`)
        )
        if (!valid) return null

        const payload = JSON.parse(decoder.decode(base64UrlDecode(body))) as Partial<AdminSessionPayload>
        if (payload.isAdmin !== true || typeof payload.sub !== "string") return null
        if (typeof payload.exp !== "number" || payload.exp <= nowSeconds) return null
        if (typeof payload.iat !== "number" || payload.iat > nowSeconds + 60) return null
        return payload as AdminSessionPayload
    } catch {
        return null
    }
}

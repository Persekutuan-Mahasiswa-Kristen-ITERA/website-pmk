import { randomBytes, timingSafeEqual } from "node:crypto"
import { PICORE_URL, WEB_APP_KEY } from "@/lib/picore/config"

/**
 * "Masuk dengan Google" through PI-CORE (PI-CORE D-14). The website never talks to Google:
 *   /auth/google          random `handoff` -> httpOnly cookie, browser -> PI-CORE
 *   /auth/google/finish   PI-CORE returns `handoff` + a one-time token; `handoff` must equal the cookie
 *                         (stops login CSRF), then the token becomes a session on this domain.
 */
export const HANDOFF_COOKIE = "pmk_web_google"
export const HANDOFF_COOKIE_PATH = "/auth/google"
export const HANDOFF_COOKIE_MAX_AGE = 10 * 60

export function newHandoff(): string {
    return randomBytes(32).toString("base64url")
}

export function picoreGoogleUrl(handoff: string): string {
    const url = new URL("/auth/google", PICORE_URL)
    url.searchParams.set("app", WEB_APP_KEY)
    url.searchParams.set("handoff", handoff)
    return url.toString()
}

export function handoffMatches(expected: string | undefined, received: string | null): boolean {
    if (!expected || !received) return false
    const a = Buffer.from(expected)
    const b = Buffer.from(received)
    return a.length === b.length && timingSafeEqual(a, b)
}

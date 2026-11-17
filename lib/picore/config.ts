/**
 * The website admin signs people in with their PI-CORE account (PI-CORE D-14/D-16). Accounts,
 * passwords and Google sign-in live in PI-CORE; the website reads the caller's roles from PI-CORE's
 * `my_app_roles('web')` (one role per admin menu). Site content stays in Firestore.
 *
 * Env (public, safe in the browser): NEXT_PUBLIC_PICORE_URL, NEXT_PUBLIC_PICORE_SUPABASE_URL,
 * NEXT_PUBLIC_PICORE_SUPABASE_PUBLISHABLE_KEY.
 */
export const PICORE_URL = (process.env.NEXT_PUBLIC_PICORE_URL || "https://core.pmkitera.web.id").replace(/\/+$/, "")

/** The app key the website has in PI-CORE (apps.key, Google handoff list). */
export const WEB_APP_KEY = "web"

export function picoreSupabaseEnv(): { url: string; key: string } {
    const url = process.env.NEXT_PUBLIC_PICORE_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_PICORE_SUPABASE_PUBLISHABLE_KEY
    if (!url || !key) {
        throw new Error("Set NEXT_PUBLIC_PICORE_SUPABASE_URL dan NEXT_PUBLIC_PICORE_SUPABASE_PUBLISHABLE_KEY.")
    }
    return { url, key }
}

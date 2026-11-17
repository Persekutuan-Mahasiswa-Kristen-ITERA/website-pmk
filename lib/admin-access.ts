import { cache } from "react"
import { NextResponse } from "next/server"
import type { AdminWritableCollection } from "@/lib/admin-crud-codec"
import { WEB_APP_KEY } from "@/lib/picore/config"
import { createPicoreServerClient } from "@/lib/picore/server"

/**
 * Website admin access from PI-CORE (D-16). One role per menu; "admin" covers every menu and the
 * history. Pure helpers are exported for tests; getWebAccess() talks to PI-CORE.
 */
export type WebRole = "admin" | "artikel" | "renungan" | "acara" | "dokumentasi"
const WEB_ROLES: readonly WebRole[] = ["admin", "artikel", "renungan", "acara", "dokumentasi"]

/** Which role manages which Firestore collection. */
export const ROLE_FOR_COLLECTION: Record<AdminWritableCollection, WebRole> = {
    articles: "artikel",
    devotionals: "renungan",
    events: "acara",
    documentations: "dokumentasi",
}

export function webRolesFrom(appRoles: readonly string[] | null | undefined): WebRole[] {
    return (appRoles ?? []).filter((r): r is WebRole => (WEB_ROLES as readonly string[]).includes(r))
}

export function canManageCollection(roles: readonly WebRole[], collection: AdminWritableCollection): boolean {
    return roles.includes("admin") || roles.includes(ROLE_FOR_COLLECTION[collection])
}

export type WebAccess =
    | { kind: "signed_out" }
    | { kind: "no_access"; email: string; reason: "no_role" | "temporary_password" | "inactive" }
    | { kind: "ok"; email: string; name: string; roles: WebRole[] }

/** One evaluation per request. */
export const getWebAccess = cache(async (): Promise<WebAccess> => {
    const supabase = await createPicoreServerClient()
    const { data: auth } = await supabase.auth.getUser()
    const user = auth.user
    if (!user?.email) return { kind: "signed_out" }
    const email = user.email.toLowerCase()

    const [{ data: appRoles, error }, { data: member }] = await Promise.all([
        supabase.rpc("my_app_roles", { p_app: WEB_APP_KEY }),
        supabase.from("members").select("full_name, is_active, must_change_password").eq("user_id", user.id).maybeSingle(),
    ])
    if (error) throw new Error(`PI-CORE my_app_roles: ${error.message}`)

    const roles = webRolesFrom(appRoles as string[] | null)
    if (roles.length === 0) {
        const reason = !member || !member.is_active ? "inactive" : member.must_change_password ? "temporary_password" : "no_role"
        return { kind: "no_access", email, reason }
    }
    return { kind: "ok", email, name: (member?.full_name as string | undefined) ?? email, roles }
})

export type WebCaller = { email: string; name: string; roles: WebRole[] }

/**
 * API guard. `collection` = the caller needs that menu's role (or admin); "admin" = Admin Website
 * only; "any" = any website role. 401 without access, 403 without the right role.
 */
export async function requireWebAccess(
    need: AdminWritableCollection | "admin" | "any"
): Promise<{ ok: true; caller: WebCaller } | { ok: false; response: NextResponse }> {
    const access = await getWebAccess()
    if (access.kind !== "ok") {
        return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
    }
    const allowed =
        need === "any" ? true : need === "admin" ? access.roles.includes("admin") : canManageCollection(access.roles, need)
    if (!allowed) {
        return {
            ok: false,
            response: NextResponse.json({ error: "Akun Anda tidak punya akses ke menu ini." }, { status: 403 }),
        }
    }
    return { ok: true, caller: { email: access.email, name: access.name, roles: access.roles } }
}

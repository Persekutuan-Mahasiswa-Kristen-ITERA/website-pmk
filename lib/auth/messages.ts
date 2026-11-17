import { PICORE_URL } from "@/lib/picore/config"

/** Safe for the browser: messages for the login page. */
export type AccessReason = "no_role" | "temporary_password" | "inactive"
export function accessReason(raw: string | null | undefined): AccessReason {
    return raw === "temporary_password" || raw === "inactive" ? raw : "no_role"
}
export const ACCESS_MESSAGES: Record<AccessReason, string> = {
    no_role: "Akun PI-CORE Anda belum punya akses ke admin website. Akses diatur super admin PI-CORE di menu Integrasi.",
    temporary_password: `Akun Anda masih memakai kata sandi sementara. Ganti dulu di PI-CORE (${PICORE_URL.replace(/^https?:\/\//, "")}), lalu masuk lagi.`,
    inactive: "Akun PI-CORE Anda tidak aktif. Hubungi admin PI-CORE.",
}

export type GoogleLoginError = "notRegistered" | "inactive" | "failed"
export function googleLoginError(raw: string | null | undefined): GoogleLoginError {
    return raw === "notRegistered" || raw === "inactive" ? raw : "failed"
}
export const GOOGLE_LOGIN_MESSAGES: Record<GoogleLoginError, string> = {
    notRegistered: "Akun Google ini belum punya akun PI-CORE. Minta admin PI-CORE membuatkan akun dengan email ini.",
    inactive: "Akun PI-CORE Anda tidak aktif. Hubungi admin PI-CORE.",
    failed: "Masuk dengan Google gagal. Silakan coba lagi.",
}

import { LoginForm } from "./login-form"
import { ACCESS_MESSAGES, GOOGLE_LOGIN_MESSAGES, accessReason, googleLoginError } from "@/lib/auth/messages"

/**
 * /admin/login. `?google=<code>`: back from a failed "Masuk dengan Google".
 * `?access=<reason>`: signed in to PI-CORE but without website access.
 */
export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ google?: string | string[]; access?: string | string[] }>
}) {
    const { google, access } = await searchParams
    const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : null)
    const message = one(access)
        ? ACCESS_MESSAGES[accessReason(one(access))]
        : one(google)
          ? GOOGLE_LOGIN_MESSAGES[googleLoginError(one(google))]
          : undefined
    return <LoginForm initialError={message} signOutFirst={Boolean(one(access))} />
}

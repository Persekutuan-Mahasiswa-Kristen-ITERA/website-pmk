import { NextResponse } from "next/server"
import { getWebAccess } from "@/lib/admin-access"

export const runtime = "nodejs"

/** The admin shell asks who is signed in and which menus they have. `access` explains a refusal. */
export async function GET() {
    const access = await getWebAccess()
    if (access.kind === "ok") {
        return NextResponse.json({ user: { email: access.email, name: access.name, roles: access.roles } })
    }
    return NextResponse.json({ user: null, access: access.kind === "no_access" ? access.reason : null })
}

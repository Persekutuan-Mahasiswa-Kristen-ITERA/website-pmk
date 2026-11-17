import { NextResponse } from "next/server"
import { createPicoreServerClient } from "@/lib/picore/server"

export const runtime = "nodejs"

/** Ends the PI-CORE session on this site only (other PMK apps keep theirs). */
export async function POST() {
    const supabase = await createPicoreServerClient()
    await supabase.auth.signOut({ scope: "local" })
    return NextResponse.json({ success: true })
}

import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { requireWebAccess } from "@/lib/admin-access"
import { AUDIT_COLLECTION } from "@/lib/admin-audit"

export const runtime = "nodejs"

/** GET /api/admin/audit?before=<ms>: latest history rows, 50 per page (Admin Website only). */
export async function GET(request: NextRequest) {
    const guard = await requireWebAccess("admin")
    if (!guard.ok) return guard.response

    const before = Number(request.nextUrl.searchParams.get("before"))
    try {
        let query = firestore.collection(AUDIT_COLLECTION).orderBy("createdAt", "desc").limit(50)
        if (Number.isFinite(before) && before > 0) query = query.startAfter(new Date(before))
        const snap = await query.get()
        const items = snap.docs.map((d) => {
            const v = d.data()
            return {
                id: d.id,
                actorEmail: v.actorEmail,
                actorName: v.actorName,
                action: v.action,
                collection: v.collection,
                docId: v.docId,
                title: v.title,
                createdAt: v.createdAt?.toMillis?.() ?? null,
            }
        })
        return NextResponse.json({ items })
    } catch (error) {
        console.error("Error reading admin history:", error)
        return NextResponse.json({ error: "Gagal memuat riwayat." }, { status: 500 })
    }
}

import { NextRequest, NextResponse } from "next/server"
import { FieldValue, Timestamp } from "firebase-admin/firestore"
import { firestore } from "@/app/api/firebaseAdmin"
import { DOC_ID_PATTERN, decodeDates, isAdminWritableCollection, isPlainObject } from "@/lib/admin-crud-codec"
import { requireWebAccess } from "@/lib/admin-access"
import { recordAudit, titleOf } from "@/lib/admin-audit"

export const runtime = "nodejs"

// Session: middleware.ts. Role per collection (PI-CORE D-16): requireWebAccess below.

type Params = { params: Promise<{ collection: string; id: string }> }

async function resolve(params: Params["params"]) {
    const { collection, id } = await params
    if (!isAdminWritableCollection(collection) || !DOC_ID_PATTERN.test(id)) return null
    return { collection, docRef: firestore.collection(collection).doc(id) }
}

/** Update a document. Mirrors the old client-side FirebaseService.update. */
export async function PUT(request: NextRequest, { params }: Params) {
    const target = await resolve(params)
    if (!target) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    const { collection, docRef } = target
    const guard = await requireWebAccess(collection)
    if (!guard.ok) return guard.response

    const body = await request.json().catch(() => null)
    if (!isPlainObject(body)) {
        return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 })
    }

    try {
        const data = decodeDates(body, (ms) => Timestamp.fromMillis(ms)) as Record<string, unknown>
        delete data.id
        await docRef.update({ ...data, updatedAt: FieldValue.serverTimestamp() })
        const after = await docRef.get()
        await recordAudit(guard.caller, { action: "update", collection, docId: docRef.id, title: titleOf(after.data()) })
        return NextResponse.json({ success: true, id: docRef.id })
    } catch (error) {
        console.error(`Error updating ${docRef.path}:`, error)
        return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 })
    }
}

/** Delete a document. Mirrors the old client-side FirebaseService.delete. */
export async function DELETE(_request: NextRequest, { params }: Params) {
    const target = await resolve(params)
    if (!target) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    const { collection, docRef } = target
    const guard = await requireWebAccess(collection)
    if (!guard.ok) return guard.response

    try {
        const before = await docRef.get()
        await docRef.delete()
        await recordAudit(guard.caller, { action: "delete", collection, docId: docRef.id, title: titleOf(before.data()) })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(`Error deleting ${docRef.path}:`, error)
        return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 })
    }
}

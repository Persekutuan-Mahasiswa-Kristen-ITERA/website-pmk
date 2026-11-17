import { NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { firestore } from "@/app/api/firebaseAdmin"
import { decodeDates, isAdminWritableCollection, isPlainObject } from "@/lib/admin-crud-codec"
import { requireWebAccess } from "@/lib/admin-access"
import { recordAudit, titleOf } from "@/lib/admin-audit"

export const runtime = "nodejs"

// Session: middleware.ts. Role per collection (PI-CORE D-16): requireWebAccess below.

/** Create a document. Mirrors the old client-side FirebaseService.create. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ collection: string }> }) {
    const { collection } = await params
    if (!isAdminWritableCollection(collection)) {
        return NextResponse.json({ success: false, error: "Unknown collection" }, { status: 404 })
    }
    const guard = await requireWebAccess(collection)
    if (!guard.ok) return guard.response

    const body = await request.json().catch(() => null)
    if (!isPlainObject(body)) {
        return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 })
    }

    try {
        const data = decodeDates(body, (ms) => admin.firestore.Timestamp.fromMillis(ms)) as Record<string, unknown>
        delete data.id
        const docRef = await firestore.collection(collection).add({
            ...data,
            createdAt: data.createdAt ?? admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
        await recordAudit(guard.caller, { action: "create", collection, docId: docRef.id, title: titleOf(data) })
        return NextResponse.json({ success: true, id: docRef.id })
    } catch (error) {
        console.error(`Error creating ${collection} document:`, error)
        return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 })
    }
}

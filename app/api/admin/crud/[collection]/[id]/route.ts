import { NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { firestore } from "@/app/api/firebaseAdmin"
import { DOC_ID_PATTERN, decodeDates, isAdminWritableCollection, isPlainObject } from "@/lib/admin-crud-codec"

export const runtime = "nodejs"

// Access is enforced by middleware.ts (signed admin session required for /api/admin/*).

type Params = { params: Promise<{ collection: string; id: string }> }

async function resolve(params: Params["params"]) {
    const { collection, id } = await params
    if (!isAdminWritableCollection(collection) || !DOC_ID_PATTERN.test(id)) return null
    return firestore.collection(collection).doc(id)
}

/** Update a document. Mirrors the old client-side FirebaseService.update. */
export async function PUT(request: NextRequest, { params }: Params) {
    const docRef = await resolve(params)
    if (!docRef) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })

    const body = await request.json().catch(() => null)
    if (!isPlainObject(body)) {
        return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 })
    }

    try {
        const data = decodeDates(body, (ms) => admin.firestore.Timestamp.fromMillis(ms)) as Record<string, unknown>
        delete data.id
        await docRef.update({ ...data, updatedAt: admin.firestore.FieldValue.serverTimestamp() })
        return NextResponse.json({ success: true, id: docRef.id })
    } catch (error) {
        console.error(`Error updating ${docRef.path}:`, error)
        return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 })
    }
}

/** Delete a document. Mirrors the old client-side FirebaseService.delete. */
export async function DELETE(_request: NextRequest, { params }: Params) {
    const docRef = await resolve(params)
    if (!docRef) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })

    try {
        await docRef.delete()
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(`Error deleting ${docRef.path}:`, error)
        return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 })
    }
}

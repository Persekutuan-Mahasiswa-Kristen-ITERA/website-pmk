import { NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { firestore } from "@/app/api/firebaseAdmin"
import { decodeDates, isAdminWritableCollection, isPlainObject } from "@/lib/admin-crud-codec"

export const runtime = "nodejs"

// Access is enforced by middleware.ts (signed admin session required for /api/admin/*).

/** Create a document. Mirrors the old client-side FirebaseService.create. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ collection: string }> }) {
    const { collection } = await params
    if (!isAdminWritableCollection(collection)) {
        return NextResponse.json({ success: false, error: "Unknown collection" }, { status: 404 })
    }

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
        return NextResponse.json({ success: true, id: docRef.id })
    } catch (error) {
        console.error(`Error creating ${collection} document:`, error)
        return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 })
    }
}

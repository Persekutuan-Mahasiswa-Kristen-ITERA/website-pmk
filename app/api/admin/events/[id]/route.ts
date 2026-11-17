import { requireWebAccess } from "@/lib/admin-access"
import { recordAudit, titleOf } from "@/lib/admin-audit"
import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { serializeFirestoreDoc } from "@/lib/firestore-utils"
import admin from "firebase-admin"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const guard = await requireWebAccess("events")
    if (!guard.ok) return guard.response
    try {
        const { id } = await params
        const docRef = firestore.collection("events").doc(id)
        const doc = await docRef.get()

        if (!doc.exists) {
            return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(doc),
        })
    } catch (error) {
        console.error("Error fetching event:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch event" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const guard = await requireWebAccess("events")
    if (!guard.ok) return guard.response
    try {
        const { id } = await params
        const data = await request.json()

        const cleanData = { ...data }
        delete cleanData.id
        delete cleanData.createdAt
        delete cleanData.updatedAt

        const updateData = {
            ...cleanData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }

        const docRef = firestore.collection("events").doc(id)
        await docRef.update(updateData)

        const updatedDoc = await docRef.get()
        await recordAudit(guard.caller, { action: "update", collection: "events", docId: docRef.id, title: titleOf(updatedDoc.data()) })

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(updatedDoc),
        })
    } catch (error) {
        console.error("Error updating event:", error)
        return NextResponse.json({ success: false, error: "Failed to update event" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const guard = await requireWebAccess("events")
    if (!guard.ok) return guard.response
    try {
        const { id } = await params
        const ref = firestore.collection("events").doc(id)
        const before = await ref.get()
        await ref.delete()
        await recordAudit(guard.caller, { action: "delete", collection: "events", docId: id, title: titleOf(before.data()) })

        return NextResponse.json({
            success: true,
            message: "Event deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting event:", error)
        return NextResponse.json({ success: false, error: "Failed to delete event" }, { status: 500 })
    }
}

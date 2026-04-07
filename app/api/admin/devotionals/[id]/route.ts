import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { serializeFirestoreDoc } from "@/lib/firestore-utils"
import admin from "firebase-admin"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const docRef = firestore.collection("devotionals").doc(id)
        const doc = await docRef.get()

        if (!doc.exists) {
            return NextResponse.json({ success: false, error: "Devotional not found" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(doc),
        })
    } catch (error) {
        console.error("Error fetching devotional:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch devotional" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

        const docRef = firestore.collection("devotionals").doc(id)
        await docRef.update(updateData)

        const updatedDoc = await docRef.get()

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(updatedDoc),
        })
    } catch (error) {
        console.error("Error updating devotional:", error)
        return NextResponse.json({ success: false, error: "Failed to update devotional" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await firestore.collection("devotionals").doc(id).delete()

        return NextResponse.json({
            success: true,
            message: "Devotional deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting devotional:", error)
        return NextResponse.json({ success: false, error: "Failed to delete devotional" }, { status: 500 })
    }
}

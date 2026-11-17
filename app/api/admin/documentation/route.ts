import { requireWebAccess } from "@/lib/admin-access"
import { recordAudit, titleOf } from "@/lib/admin-audit"
import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { serializeFirestoreDocs, serializeFirestoreDoc } from "@/lib/firestore-utils"
import { FieldValue } from "firebase-admin/firestore"

export async function GET(request: NextRequest) {
    const guard = await requireWebAccess("documentations")
    if (!guard.ok) return guard.response
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "10")
        const sort = searchParams.get("sort") || "createdAt"
        const order = searchParams.get("order") || "desc"

        const offset = (page - 1) * limit

        const documentationRef = firestore.collection("documentations")
        let query = documentationRef.orderBy(sort, order as "asc" | "desc")

        if (offset > 0) {
            query = query.offset(offset)
        }

        const snapshot = await query.limit(limit).get()
        const countSnapshot = await documentationRef.count().get()

        const documentation = serializeFirestoreDocs(snapshot.docs)

        return NextResponse.json({
            success: true,
            data: documentation,
            pagination: {
                page,
                limit,
                total: countSnapshot.data().count,
                totalPages: Math.ceil(countSnapshot.data().count / limit),
            },
        })
    } catch (error) {
        console.error("Error fetching documentation:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch documentation" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const guard = await requireWebAccess("documentations")
    if (!guard.ok) return guard.response
    try {
        const data = await request.json()

        const documentationData = {
            ...data,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        }

        const docRef = await firestore.collection("documentations").add(documentationData)
        const newDoc = await docRef.get()
        await recordAudit(guard.caller, { action: "create", collection: "documentations", docId: docRef.id, title: titleOf(newDoc.data()) })

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(newDoc),
        })
    } catch (error) {
        console.error("Error creating documentation:", error)
        return NextResponse.json({ success: false, error: "Failed to create documentation" }, { status: 500 })
    }
}

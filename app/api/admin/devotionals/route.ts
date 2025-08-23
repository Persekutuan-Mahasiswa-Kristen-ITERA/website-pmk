import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { serializeFirestoreDocs, serializeFirestoreDoc } from "@/lib/firestore-utils"
import admin from "firebase-admin"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "10")
        const sort = searchParams.get("sort") || "createdAt"
        const order = searchParams.get("order") || "desc"

        const offset = (page - 1) * limit

        const devotionalsRef = firestore.collection("devotionals")
        let query = devotionalsRef.orderBy(sort, order as "asc" | "desc")

        if (offset > 0) {
            query = query.offset(offset)
        }

        const snapshot = await query.limit(limit).get()
        const countSnapshot = await devotionalsRef.count().get()

        const devotionals = serializeFirestoreDocs(snapshot.docs)

        return NextResponse.json({
            success: true,
            data: devotionals,
            pagination: {
                page,
                limit,
                total: countSnapshot.data().count,
                totalPages: Math.ceil(countSnapshot.data().count / limit),
            },
        })
    } catch (error) {
        console.error("Error fetching devotionals:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch devotionals" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const devotionalData = {
            ...data,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }

        const docRef = await firestore.collection("devotionals").add(devotionalData)
        const newDoc = await docRef.get()

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(newDoc),
        })
    } catch (error) {
        console.error("Error creating devotional:", error)
        return NextResponse.json({ success: false, error: "Failed to create devotional" }, { status: 500 })
    }
}

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

        const eventsRef = firestore.collection("events")
        let query = eventsRef.orderBy(sort, order as "asc" | "desc")

        if (offset > 0) {
            query = query.offset(offset)
        }

        const snapshot = await query.limit(limit).get()
        const countSnapshot = await eventsRef.count().get()

        const events = serializeFirestoreDocs(snapshot.docs)

        return NextResponse.json({
            success: true,
            data: events,
            pagination: {
                page,
                limit,
                total: countSnapshot.data().count,
                totalPages: Math.ceil(countSnapshot.data().count / limit),
            },
        })
    } catch (error) {
        console.error("Error fetching events:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const now = new Date()
        const eventData = {
            ...data,
            createdAt: admin.firestore.Timestamp.fromDate(now),
            updatedAt: admin.firestore.Timestamp.fromDate(now),
        }

        const docRef = await firestore.collection("events").add(eventData)
        const newDoc = await docRef.get()

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(newDoc),
        })
    } catch (error) {
        console.error("Error creating event:", error)
        return NextResponse.json({ success: false, error: "Failed to create event" }, { status: 500 })
    }
}

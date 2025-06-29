import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { Article } from "@/types/article"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "10")
        const sort = searchParams.get("sort") || "createdAt"
        const order = searchParams.get("order") || "desc"

        const offset = (page - 1) * limit

        const articlesRef = firestore.collection("articles")
        let query = articlesRef.orderBy(sort, order as "asc" | "desc")

        if (offset > 0) {
            query = query.offset(offset)
        }

        const snapshot = await query.limit(limit).get()
        const countSnapshot = await articlesRef.count().get()

        const articles = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Article[]

        return NextResponse.json({
            success: true,
            data: articles,
            pagination: {
                page,
                limit,
                total: countSnapshot.data().count,
                totalPages: Math.ceil(countSnapshot.data().count / limit),
            },
        })
    } catch (error) {
        console.error("Error fetching articles:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const articleData = {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        const docRef = await firestore.collection("articles").add(articleData)
        const newDoc = await docRef.get()

        return NextResponse.json({
            success: true,
            data: { id: docRef.id, ...newDoc.data() },
        })
    } catch (error) {
        console.error("Error creating article:", error)
        return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 500 })
    }
}

import { requireWebAccess } from "@/lib/admin-access"
import { recordAudit, titleOf } from "@/lib/admin-audit"
import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { serializeFirestoreDocs, serializeFirestoreDoc } from "@/lib/firestore-utils"
import { Article } from "@/types/article"
import admin from "firebase-admin"

export async function GET(request: NextRequest) {
    const guard = await requireWebAccess("articles")
    if (!guard.ok) return guard.response
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

        const articles = serializeFirestoreDocs(snapshot.docs)

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
    const guard = await requireWebAccess("articles")
    if (!guard.ok) return guard.response
    try {
        const data = await request.json()

        // Ensure author is properly structured as a map
        let authorData = data.author
        if (typeof authorData === "string") {
            // If author is a string, convert it to proper structure
            authorData = {
                name: authorData,
                image: data.authorImage || "",
                bio: data.authorBio || "",
            }
        } else if (authorData && typeof authorData === "object") {
            // Ensure all required fields exist
            authorData = {
                name: authorData.name || "",
                image: authorData.image || "",
                bio: authorData.bio || "",
            }
        } else {
            // If author is undefined or null, provide default structure
            authorData = {
                name: data["author.name"] || "",
                image: data["author.image"] || "",
                bio: data["author.bio"] || "",
            }
        }

        // Remove individual author fields from data if they exist
        const cleanData = { ...data }
        delete cleanData["author.name"]
        delete cleanData["author.image"]
        delete cleanData["author.bio"]
        delete cleanData.authorImage
        delete cleanData.authorBio

        const articleData = {
            ...cleanData,
            author: authorData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }

        const docRef = await firestore.collection("articles").add(articleData)
        const newDoc = await docRef.get()
        await recordAudit(guard.caller, { action: "create", collection: "articles", docId: docRef.id, title: titleOf(newDoc.data()) })

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(newDoc),
        })
    } catch (error) {
        console.error("Error creating article:", error)
        return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 500 })
    }
}

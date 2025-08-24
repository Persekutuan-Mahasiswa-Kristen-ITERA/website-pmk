import { NextRequest, NextResponse } from "next/server"
import { firestore } from "@/app/api/firebaseAdmin"
import { serializeFirestoreDoc } from "@/lib/firestore-utils"
import admin from "firebase-admin"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const docRef = firestore.collection("articles").doc(id)
        const doc = await docRef.get()

        if (!doc.exists) {
            return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(doc),
        })
    } catch (error) {
        console.error("Error fetching article:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch article" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
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

        const now = new Date()
        const updateData = {
            ...cleanData,
            author: authorData,
            updatedAt: admin.firestore.Timestamp.fromDate(now),
        }

        const docRef = firestore.collection("articles").doc(id)
        await docRef.update(updateData)

        // Wait a bit and get fresh document to ensure timestamp is properly set
        await new Promise(resolve => setTimeout(resolve, 100))
        const updatedDoc = await docRef.get()

        return NextResponse.json({
            success: true,
            data: serializeFirestoreDoc(updatedDoc),
        })
    } catch (error) {
        console.error("Error updating article:", error)
        return NextResponse.json({ success: false, error: "Failed to update article" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await firestore.collection("articles").doc(id).delete()

        return NextResponse.json({
            success: true,
            message: "Article deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting article:", error)
        return NextResponse.json({ success: false, error: "Failed to delete article" }, { status: 500 })
    }
}

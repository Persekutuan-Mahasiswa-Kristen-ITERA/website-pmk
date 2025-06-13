"use server"

import { Devotional } from "@/types/devotional"
import { firestore } from "../../firebaseAdmin"
import { FieldValue, Timestamp } from "firebase-admin/firestore"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateObject, generateText } from "ai"
import { z } from "zod"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const prepareDatesForFirestore = async (data: any): Promise<any> => {
    if (!data) return data

    const newData = { ...data }

    Object.keys(newData).forEach((key) => {
        if (newData[key] instanceof Date) {
            newData[key] = Timestamp.fromDate(newData[key])
        } else if (typeof newData[key] === "object" && newData[key] !== null) {
            newData[key] = prepareDatesForFirestore(newData[key])
        }
    })

    return newData
}

export async function uploadDevotional(message: string) {
    const formattedDevotional = await formatDevotionalGemini(message)

    if (!formattedDevotional) {
        console.error("Failed to format devotional content")
        return null
    }

    const result = await addDevotional(formattedDevotional)
    return result
}

export async function addDevotional(devotional: Devotional): Promise<Devotional | null> {
    try {
        const collection = firestore.collection("devotionals")
        const dataWithTimestamps = {
            ...(await prepareDatesForFirestore(devotional)),
            createdAt: devotional.createdAt ?? FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        }

        const docRef = await collection.add(dataWithTimestamps)

        // Exclude 'id' from devotional to avoid duplicate property
        const { id, ...devotionalWithoutId } = devotional
        return {
            id: docRef.id,
            ...devotionalWithoutId,
            createdAt: devotional.createdAt ?? new Date(),
            updatedAt: new Date(),
        }
    } catch (error) {
        console.error("Error adding document:", error)
        throw error
    }
}

export async function formatDevotionalGemini(message: string): Promise<Devotional | null> {
    "use server"

    console.log("Formatting devotional content with Gemini AI...")

    const prompt = `Teks:
    ${message}

    Tolong ubah teks berikut dalam bahasa Indonesia menjadi objek JSON dengan struktur berikut:
    {
      "createdAt": string,
      "updatedAt": string,
      "title": string,
      "verse": string,
      "preview": string,
      "content": string,
      "author": string,
      "category": string
    }

    Silakan perbaiki copywriting sedikit agar lebih menarik dan lebih rapi tanpa mengubah isi secara signifikan, Jika hanya ada 1 ayat, tuliskan isi ayat tersebut di awal content, jika lebih dari 1, cukup tuliskan ayat tanpa isi saja.boleh lebih panjang, tidak boleh lebih pendek, pastikan menggunakan whitespace seperti paragraf dan tab dengan benar. namun tetap mempertahankan makna asli. Pastikan tidak mengandung kata-kata berbahaya seperti SARA dan pornografi. Author sudah pasti "PMK ITERA", category sesuaikan dengan tema utama dari content, title dalam bentuk Capitalized, verse hanya mengandung perikop tanpa perlu isinya, created_at dan updated_at adalah tanggal dari konten tersebut dalam format: "2025-04-26T12:00:00Z"`

    const devotionalSchema = z.object({
        createdAt: z.string(),
        updatedAt: z.string(),
        title: z.string(),
        verse: z.string(),
        preview: z.string(),
        content: z.string(),
        author: z.string(),
        category: z.string(),
    })

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        
    })

    try {
        const { object } = await generateObject({
            model: google("gemini-2.0-flash"),
            prompt: prompt,
            schema: devotionalSchema,
        })

        const devotionalJson = {
            ...object,
            createdAt: new Date(object.createdAt),
            updatedAt: new Date(object.updatedAt),
        } as Devotional

        devotionalJson.title =
            devotionalJson.title.charAt(0).toUpperCase() + devotionalJson.title.slice(1).toLowerCase()

        devotionalJson.content = devotionalJson.content.replace(/tuhan/gi, 'TUHAN')

        return devotionalJson
    } catch (error) {
        console.error("Error processing devotional:", error)
        return null
    }
}

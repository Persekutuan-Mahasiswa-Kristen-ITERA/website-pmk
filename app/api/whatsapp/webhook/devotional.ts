import { Devotional } from "@/types/devotional"
import { GoogleGenAI } from "@google/genai"
import { firestore } from "../../firebaseAdmin"
import { FieldValue, Timestamp } from "firebase-admin/firestore"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const prepareDatesForFirestore = (data: any): any => {
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

const responseSchema = {
    type: "object",
    properties: {
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        title: { type: "string" },
        verse: { type: "string" },
        preview: { type: "string" },
        content: { type: "string" },
        author: { type: "string" },
        category: { type: "string" },
    },
    required: ["title", "verse", "preview", "content", "author", "category", "createdAt", "updatedAt"],
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
            ...prepareDatesForFirestore(devotional),
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
    console.log("Formatting devotional content with Gemini AI...")
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" })

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

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                responseSchema: responseSchema,
                responseMimeType: "application/json",
            },
        })

        if (!response.text) {
            console.error("Failed to format devotional content:")
            return null
        }

        const devotionalJson = JSON.parse(response.text) as Devotional

        devotionalJson.createdAt = new Date(devotionalJson.createdAt as unknown as string)
        devotionalJson.updatedAt = new Date(devotionalJson.updatedAt as unknown as string)

        devotionalJson.title =
            devotionalJson.title.charAt(0).toUpperCase() + devotionalJson.title.slice(1).toLowerCase()

        return devotionalJson
    } catch (error) {
        console.error("Error processing devotional:", error)
        return null
    }
}

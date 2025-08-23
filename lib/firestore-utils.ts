import admin from "firebase-admin"

type FirestoreData = string | number | boolean | null | undefined | FirestoreData[] | { [key: string]: FirestoreData }

// Type for Firestore Timestamp object structure
interface FirestoreTimestampObject {
    _seconds: number
    _nanoseconds: number
}

/**
 * Serializes Firestore data to convert Timestamps to proper timestamps
 */
export function serializeFirestoreData(data: unknown): FirestoreData {
    if (data === null || data === undefined) {
        return data
    }

    if (data instanceof admin.firestore.Timestamp) {
        // Convert to ISO string timestamp for consistent format
        return data.toDate().toISOString()
    }

    // Handle Firestore Timestamp objects that come as plain objects with _seconds and _nanoseconds
    if (typeof data === 'object' && data && '_seconds' in data && '_nanoseconds' in data) {
        const timestampObj = data as FirestoreTimestampObject
        const timestamp = new admin.firestore.Timestamp(
            timestampObj._seconds, 
            timestampObj._nanoseconds
        )
        return timestamp.toDate().toISOString()
    }

    if (Array.isArray(data)) {
        return data.map(item => serializeFirestoreData(item))
    }

    if (typeof data === 'object' && data && data.constructor === Object) {
        const serialized: { [key: string]: FirestoreData } = {}
        for (const [key, value] of Object.entries(data)) {
            serialized[key] = serializeFirestoreData(value)
        }
        return serialized
    }

    return data as FirestoreData
}

/**
 * Serializes a Firestore document with its ID
 */
export function serializeFirestoreDoc(doc: admin.firestore.DocumentSnapshot): { id: string; [key: string]: FirestoreData } | null {
    if (!doc.exists) {
        return null
    }

    const data = doc.data()
    return {
        id: doc.id,
        ...serializeFirestoreData(data) as { [key: string]: FirestoreData }
    }
}

/**
 * Serializes multiple Firestore documents
 */
export function serializeFirestoreDocs(docs: admin.firestore.DocumentSnapshot[]): Array<{ id: string; [key: string]: FirestoreData }> {
    return docs.map(doc => serializeFirestoreDoc(doc)).filter((doc): doc is { id: string; [key: string]: FirestoreData } => doc !== null)
}

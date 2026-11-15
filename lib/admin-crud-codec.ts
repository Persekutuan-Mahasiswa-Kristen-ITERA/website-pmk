/**
 * Wire format for admin writes sent from the browser to /api/admin/crud.
 *
 * JSON cannot carry Date objects, so each Date is sent as { "$date": <ms> } and
 * turned back into a Firestore Timestamp on the server. This keeps the stored
 * data identical to what the old client-side Firestore writes produced.
 */

/** Collections the admin panel may write. Anything else is rejected by the API. */
export const ADMIN_WRITABLE_COLLECTIONS = ["articles", "devotionals", "events", "documentations"] as const
export type AdminWritableCollection = (typeof ADMIN_WRITABLE_COLLECTIONS)[number]

export function isAdminWritableCollection(value: string): value is AdminWritableCollection {
    return (ADMIN_WRITABLE_COLLECTIONS as readonly string[]).includes(value)
}

export const DOC_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/

export interface EncodedDate {
    $date: number
}

export function isEncodedDate(value: unknown): value is EncodedDate {
    return (
        typeof value === "object" &&
        value !== null &&
        Object.keys(value).length === 1 &&
        typeof (value as EncodedDate).$date === "number" &&
        Number.isFinite((value as EncodedDate).$date)
    )
}

/** Browser side: replace every Date with { $date: ms }. */
export function encodeDates(value: unknown): unknown {
    if (value instanceof Date) return { $date: value.getTime() }
    if (Array.isArray(value)) return value.map(encodeDates)
    if (typeof value === "object" && value !== null) {
        const out: Record<string, unknown> = {}
        for (const [key, inner] of Object.entries(value)) {
            if (inner !== undefined) out[key] = encodeDates(inner)
        }
        return out
    }
    return value
}

/** Server side: replace every { $date: ms } using the given factory (e.g. Timestamp.fromMillis). */
export function decodeDates<D>(value: unknown, toDate: (ms: number) => D): unknown {
    if (isEncodedDate(value)) return toDate(value.$date)
    if (Array.isArray(value)) return value.map((v) => decodeDates(v, toDate))
    if (typeof value === "object" && value !== null) {
        const out: Record<string, unknown> = {}
        for (const [key, inner] of Object.entries(value)) {
            if (key === "__proto__" || key === "constructor" || key === "prototype") continue
            out[key] = decodeDates(inner, toDate)
        }
        return out
    }
    return value
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

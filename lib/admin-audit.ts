import admin from "firebase-admin"
import { firestore } from "@/app/api/firebaseAdmin"
import type { WebCaller } from "@/lib/admin-access"

export const AUDIT_COLLECTION = "admin_audit_log"

/**
 * One history row per admin change (owner request 2026-11-18), written with the Admin SDK.
 * Firestore rules deny this collection to browsers; Admin Website reads it through /api/admin/audit.
 * Runs right after the change; a failure is logged loudly but does not undo the change.
 */
export async function recordAudit(
    caller: WebCaller,
    entry: { action: "create" | "update" | "delete"; collection: string; docId: string; title?: string | null }
) {
    try {
        await firestore.collection(AUDIT_COLLECTION).add({
            actorEmail: caller.email,
            actorName: caller.name,
            actorRoles: caller.roles,
            action: entry.action,
            collection: entry.collection,
            docId: entry.docId,
            title: entry.title ?? null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        })
    } catch (error) {
        console.error("AUDIT LOG WRITE FAILED", entry.action, entry.collection, entry.docId, error)
    }
}

/** Best-effort title of a document, for history rows of deletes and updates. */
export function titleOf(data: Record<string, unknown> | undefined | null): string | null {
    if (!data) return null
    for (const key of ["title", "judul", "name", "nama"]) {
        if (typeof data[key] === "string" && data[key]) return (data[key] as string).slice(0, 200)
    }
    return null
}

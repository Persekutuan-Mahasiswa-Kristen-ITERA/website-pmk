/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore as clientFirestore } from "@/lib/firebase"
import { BaseEntity, PaginationState, SortOption } from "@/types/common"
import { encodeDates } from "@/lib/admin-crud-codec"
import {
    collection,
    doc,
    DocumentData,
    Firestore,
    getDoc,
    getDocs,
    limit,
    orderBy,
    OrderByDirection,
    Query,
    query,
    QueryDocumentSnapshot,
    startAfter,
    Timestamp,
    where,
} from "firebase/firestore"

// Convert Firestore timestamp to Date
const convertTimestampToDate = (data: any): any => {
    if (!data) return data

    if (data instanceof Timestamp) {
        return data.toDate()
    }

    if (typeof data === "object") {
        Object.keys(data).forEach((key) => {
            data[key] = convertTimestampToDate(data[key])
        })
    }

    return data
}

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

export class FirebaseService<T extends BaseEntity> {
    collectionName: string
    firestore: Firestore

    constructor(collectionName: string, firestore: Firestore = clientFirestore) {
        this.collectionName = collectionName
        this.firestore = firestore
    }

    async getAll(
        sortOption?: SortOption<T>,
        pagination?: PaginationState
    ): Promise<{ items: T[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
        try {
            const collectionRef = collection(this.firestore, this.collectionName)
            let queryRef: Query<DocumentData> = collectionRef

            // Apply sorting if provided
            if (sortOption) {
                queryRef = query(queryRef, orderBy(sortOption.field.toString(), sortOption.direction))
            }

            // Apply pagination if provided
            if (pagination && pagination.pageSize) {
                queryRef = query(queryRef, limit(pagination.pageSize))
            }

            const querySnapshot = await getDocs(queryRef)
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            const items: T[] = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...convertTimestampToDate(data),
                } as T
            })
            return { items, lastDoc }
        } catch (error) {
            console.error("Error getting documents:", error)
            throw error
        }
    }

    async getWithCount(
        n: number,
        fieldName: string = "createdAt",
        direction: OrderByDirection = "desc"
    ): Promise<{ items: T[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
        try {
            const collectionRef = collection(this.firestore, this.collectionName)
            const queryRef = query(collectionRef, limit(n), orderBy(fieldName, direction))
            const querySnapshot = await getDocs(queryRef)
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            const items: T[] = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...convertTimestampToDate(data),
                } as T
            })

            return { items, lastDoc }
        } catch (error) {
            console.error("Error getting documents:", error)
            throw error
        }
    }

    async getNextPage(
        lastDoc: QueryDocumentSnapshot<DocumentData>,
        pageSize: number,
        sortOption?: SortOption<T>
    ): Promise<{ items: T[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
        try {
            const collectionRef = collection(this.firestore, this.collectionName)
            let queryRef: Query<DocumentData>

            if (sortOption) {
                queryRef = query(
                    collectionRef,
                    orderBy(sortOption.field.toString(), sortOption.direction),
                    startAfter(lastDoc),
                    limit(pageSize)
                )
            } else {
                queryRef = query(collectionRef, startAfter(lastDoc), limit(pageSize))
            }

            const querySnapshot = await getDocs(queryRef)
            const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            const items: T[] = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...convertTimestampToDate(data),
                } as T
            })

            return { items, lastDoc: newLastDoc }
        } catch (error) {
            console.error("Error getting next page:", error)
            throw error
        }
    }

    async getById(id: string): Promise<T> {
        try {
            const docRef = doc(this.firestore, this.collectionName, id)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                throw new Error(`Document with ID ${id} does not exist`)
            }

            const data = docSnap.data()
            return {
                id: docSnap.id,
                ...convertTimestampToDate(data),
            } as T
        } catch (error) {
            console.error("Error getting document:", error)
            throw error
        }
    }

    async getByField(field: keyof T, value: any): Promise<T[]> {
        try {
            const collectionRef = collection(this.firestore, this.collectionName)
            const q = query(collectionRef, where(field.toString(), "==", value))
            const querySnapshot = await getDocs(q)

            const items: T[] = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...convertTimestampToDate(data),
                } as T
            })

            return items
        } catch (error) {
            console.error("Error getting documents by field:", error)
            throw error
        }
    }

    /**
     * Writes go through the server (/api/admin/crud), which checks the signed admin
     * session and writes with the Admin SDK. The browser never writes to Firestore
     * directly, so Firestore rules can deny all client writes.
     */
    private async adminWrite(method: "POST" | "PUT" | "DELETE", id?: string, data?: unknown): Promise<{ id?: string }> {
        const path = id
            ? `/api/admin/crud/${encodeURIComponent(this.collectionName)}/${encodeURIComponent(id)}`
            : `/api/admin/crud/${encodeURIComponent(this.collectionName)}`
        const response = await fetch(path, {
            method,
            headers: data === undefined ? undefined : { "Content-Type": "application/json" },
            body: data === undefined ? undefined : JSON.stringify(encodeDates(data)),
            credentials: "same-origin",
        })
        const result = await response.json().catch(() => ({}))
        if (!response.ok || !result.success) {
            const message =
                response.status === 401 ? "Sesi admin berakhir, silakan login ulang" : result.error || "Request failed"
            throw new Error(message)
        }
        return result
    }

    async create(data: Omit<T, "id">): Promise<T> {
        try {
            const { id } = await this.adminWrite("POST", undefined, data)
            if (!id) throw new Error("Server did not return an id")

            return {
                id,
                ...data,
                createdAt: data.createdAt ?? new Date(),
                updatedAt: new Date(),
            } as T
        } catch (error) {
            console.error("Error adding document:", error)
            throw error
        }
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        try {
            await this.adminWrite("PUT", id, data)

            // Get the updated document
            const updatedDoc = await this.getById(id)
            return updatedDoc
        } catch (error) {
            console.error("Error updating document:", error)
            throw error
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.adminWrite("DELETE", id)
        } catch (error) {
            console.error("Error deleting document:", error)
            throw error
        }
    }

    async getCount(): Promise<number> {
        try {
            const querySnapshot = await getDocs(collection(this.firestore, this.collectionName))
            return querySnapshot.size
        } catch (error) {
            console.error("Error counting documents:", error)
            throw error
        }
    }
}

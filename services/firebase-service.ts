/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "@/lib/firebase"
import { BaseEntity, PaginationState, SortOption } from "@/types/common"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    limit,
    orderBy,
    Query,
    query,
    QueryDocumentSnapshot,
    serverTimestamp,
    startAfter,
    Timestamp,
    updateDoc,
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

// Convert dates to Firestore timestamp
const prepareDatesForFirestore = (data: any): any => {
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

    constructor(collectionName: string) {
        this.collectionName = collectionName
    }

    async getAll(
        sortOption?: SortOption<T>,
        pagination?: PaginationState
    ): Promise<{ items: T[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
        try {
            const collectionRef = collection(firestore, this.collectionName)
            let queryRef: Query<DocumentData> = collectionRef

            // Apply sorting if provided
            if (sortOption) {
                console.log("Sorting by:", sortOption)
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

            console.log("Query snapshot:", items)
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
            const collectionRef = collection(firestore, this.collectionName)
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
            const docRef = doc(firestore, this.collectionName, id)
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

    async create(data: Omit<T, "id">): Promise<T> {
        try {
            const dataWithTimestamps = {
                ...prepareDatesForFirestore(data),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }

            const docRef = await addDoc(collection(firestore, this.collectionName), dataWithTimestamps)

            return {
                id: docRef.id,
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            } as T
        } catch (error) {
            console.error("Error adding document:", error)
            throw error
        }
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        try {
            const docRef = doc(firestore, this.collectionName, id)
            const dataWithTimestamps = {
                ...prepareDatesForFirestore(data),
                updatedAt: serverTimestamp(),
            }

            await updateDoc(docRef, dataWithTimestamps)

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
            const docRef = doc(firestore, this.collectionName, id)
            await deleteDoc(docRef)
        } catch (error) {
            console.error("Error deleting document:", error)
            throw error
        }
    }

    async getCount(): Promise<number> {
        try {
            const querySnapshot = await getDocs(collection(firestore, this.collectionName))
            return querySnapshot.size
        } catch (error) {
            console.error("Error counting documents:", error)
            throw error
        }
    }
}

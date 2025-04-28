import { Documentation } from "@/types/documentation"
import { FirebaseService } from "@/services/firebase-service"

const collectionName = "documentations"
const documentationsService = new FirebaseService<Documentation>(collectionName)

export async function getDocumentations() {
    const response = (await documentationsService.getAll({ field: "createdAt", direction: "desc" })).items
    return response
}

export async function getLatestDocumentations(amount: number) {
    const response = (await documentationsService.getAll({ field: "createdAt", direction: "desc" })).items
    return response.slice(0, amount)
}

export async function getDocumentationById(id: string) {
    const response = await documentationsService.getById(id)
    return response
}

export async function addDocumentation(documentation: Documentation) {
    const response = await documentationsService.create(documentation)
    return response
}

export async function updateDocumentation(id: string, documentation: Partial<Documentation>) {
    const response = await documentationsService.update(id, documentation)
    return response
}

export async function deleteDocumentation(id: string) {
    const response = await documentationsService.delete(id)
    return response
}

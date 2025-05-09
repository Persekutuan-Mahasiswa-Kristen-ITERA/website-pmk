import { Devotional } from "@/types/devotional"
import { FirebaseService } from "@/services/firebase-service"

const collectionName = "devotionals"
const devotionalsService = new FirebaseService<Devotional>(collectionName)

export async function getDevotionals(count: number = 0) {
    if (count) {
        return (await devotionalsService.getWithCount(count)).items
    }

    const response = (await devotionalsService.getAll({ field: "createdAt", direction: "desc" })).items
    return response
}
export async function getLatestDevotionals(amount: number) {
    const response = (await devotionalsService.getAll({ field: "createdAt", direction: "desc" })).items
    return response.slice(0, amount)
}
export async function getDevotionalById(id: string) {
    const response = await devotionalsService.getById(id)
    return response
}

export async function addDevotional(devotional: Devotional) {
    const response = await devotionalsService.create(devotional)
    return response
}

export async function updateDevotional(id: string, devotional: Partial<Devotional>) {
    const response = await devotionalsService.update(id, devotional)
    return response
}

export async function deleteDevotional(id: string) {
    const response = await devotionalsService.delete(id)
    return response
}
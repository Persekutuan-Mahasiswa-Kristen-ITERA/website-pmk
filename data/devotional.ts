import { Devotional } from "@/types/devotional"
import { FirebaseService } from "@/services/firebase-service"

const collectionName = "devotionals"
const devotionalsService = new FirebaseService<Devotional>(collectionName)

async function getDevotionals() {
    const response = (await devotionalsService.getAll()).items
    return response
}

async function getDevotionalById(id: string) {
    const response = await devotionalsService.getById(id)
    return response
}

async function addDevotional(devotional: Devotional) {
    const response = await devotionalsService.create(devotional)
    return response
}

async function updateDevotional(id: string, devotional: Partial<Devotional>) {
    const response = await devotionalsService.update(id, devotional)
    return response
}

async function deleteDevotional(id: string) {
    const response = await devotionalsService.delete(id)
    return response
}

import { FirebaseService } from "@/services/firebase-service"
import { Event } from "@/types/event"

const collectionName = "events"
const eventsService = new FirebaseService<Event>(collectionName)

export async function getEvents(count: number = -1) {
    if (count > 0) {
        return await eventsService.getWithCount(count)
    }

    return await eventsService.getAll()
}

export async function getEventById(id: string) {
    const response = await eventsService.getById(id)
    return response
}

export async function addEvent(event: Event) {
    const response = await eventsService.create(event)
    return response
}

export async function updateEvent(id: string, event: Partial<Event>) {
    const response = await eventsService.update(id, event)
    return response
}

export async function deleteEvent(id: string) {
    const response = await eventsService.delete(id)
    return response
}

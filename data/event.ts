import { FirebaseService } from "@/services/firebase-service"
import { Event } from "@/types/event"
import { resourceLimits } from "worker_threads"

const collectionName = "events"
const eventsService = new FirebaseService<Event>(collectionName)

export async function getEvents(count: number = -1, dateToFilter: string = "") {
    if (count > 0) {
        if (dateToFilter) {
            const result = await eventsService.getAll({ field: "date", direction: "asc" })
            result.items = result.items.filter((event) => event.date >= dateToFilter).slice(0, count)
            return result
        } else {
            return await eventsService.getWithCount(count, "date", "asc")
        }
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

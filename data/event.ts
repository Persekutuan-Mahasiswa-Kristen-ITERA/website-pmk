import { FirebaseService } from "@/services/firebase-service"
import { Event } from "@/types/event"

const collectionName = "events"
const eventsService = new FirebaseService<Event>(collectionName)

async function getEvents() {
    const response = (await eventsService.getAll()).items
    return response
}

async function getEventById(id: string) {
    const response = await eventsService.getById(id)
    return response
}

async function addEvent(event: Event) {
    const response = await eventsService.create(event)
    return response
}

async function updateEvent(id: string, event: Partial<Event>) {
    const response = await eventsService.update(id, event)
    return response
}

async function deleteEvent(id: string) {
    const response = await eventsService.delete(id)
    return response
}
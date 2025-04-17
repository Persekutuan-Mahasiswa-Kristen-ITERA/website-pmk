"use client"

import React, { useState } from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { CrudTable } from "@/components/admin/CrudTable"
import { useToast } from "@/hooks/use-toast"
import { Event } from "@/types/event" // Update the import to Event
import { events } from "@/data/event" // Update the import to events

const EventAdmin = () => {
    const { toast } = useToast()
    const [event, setEvent] = useState<Event[]>(events) // Update state to Event

    const handleAdd = (newEvent: Partial<Event>) => {
        const newEventItem = {
            ...newEvent,
            id: Date.now(), // Change to number
        } as Event

        setEvent([...event, newEventItem])
        toast({
            title: "Berhasil menambahkan event",
            description: `Event "${newEvent.title}" telah ditambahkan`,
        })
    }

    const handleEdit = (id: number, data: Partial<Event>) => {
        setEvent(event.map((event) => (event.id === id ? { ...event, ...data } : event)))
        toast({
            title: "Berhasil mengubah event",
            description: `Event "${data.title}" telah diperbarui`,
        })
    }

    const handleDelete = (id: number) => {
        setEvent(event.filter((item) => item.id !== id))
        toast({
            title: "Berhasil menghapus event",
            description: "Event telah dihapus",
        })
    }

    const fields = [
        { name: "judul", label: "Judul", type: "text" as const },
        { name: "kategori", label: "Kategori", type: "text" as const },
        { name: "isi", label: "Isi", type: "textarea" as const },
        { name: "tanggal", label: "Tanggal", type: "date" as const },
        { name: "penulis", label: "Penulis", type: "text" as const },
        { name: "gambar", label: "Gambar", type: "image" as const },
    ]

    return (
        <div></div>
        // <AdminLayout>
        //     <CrudTable
        //         title="Event"
        //         data={event}
        //         fields={fields}
        //         onAdd={handleAdd}
        //         onEdit={handleEdit}
        //         onDelete={handleDelete}
        //         getItemId={(item) => item.id}
        //     />
        // </AdminLayout>
    )
}

export default EventAdmin

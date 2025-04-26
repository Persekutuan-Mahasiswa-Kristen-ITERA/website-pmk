import { z } from "zod"
import { BaseEntity } from "./common"
import Image from "next/image"
import { FieldConfig } from "@/components/crud/DataForm"

export interface Event extends BaseEntity {
    title: string
    date: string
    time: string
    location: string
    image?: string
    description: string
}

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    image: z.string().optional(),
    description: z.string(),
})

// Define the column configuration for the Event entity
export const eventColumns = [
    { key: "title" as keyof Event, header: "Title", sortable: true },
    { key: "date" as keyof Event, header: "Date", sortable: true },
    { key: "time" as keyof Event, header: "Time", sortable: true },
    { key: "location" as keyof Event, header: "Location", sortable: true },
    {
        key: "image" as keyof Event,
        header: "Image",
        sortable: false,
        render: (value: string) =>
            value ? <Image src={value} alt="Event" className="w-48 h-48 object-cover" width={512} height={512} /> : null,
    },
    { key: "description" as keyof Event, header: "Description", sortable: false },
]

// Define the form fields configuration for the Event entity
export const eventFields: FieldConfig[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
        validation: z.string().min(1, { message: "Title is required" }),
    },
    {
        name: "date",
        label: "Date",
        type: "text",
        required: true,
        validation: z.string().nonempty({ message: "Date is required" }),
    },
    {
        name: "time",
        label: "Time",
        type: "text",
        required: true,
        validation: z.string().nonempty({ message: "Time is required" }),
    },
    {
        name: "location",
        label: "Location",
        type: "text",
        required: true,
        validation: z.string().min(1, { message: "Location is required" }),
    },
    {
        name: "image",
        label: "Image URL",
        type: "text",
        required: false,
        validation: z.string().url({ message: "Must be a valid URL" }).optional(),
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        validation: z.string().min(10, { message: "Description must be at least 10 characters" }),
    },
]

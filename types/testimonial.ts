import { z } from "zod"
import { BaseEntity } from "./common"
import { FieldConfig } from "@/components/crud/DataForm"

export interface Testimonial extends BaseEntity {
    name: string
    role: string
    quote: string
    image: string
}

export const testimonialSchema = z.object({
    id: z.number(),
    name: z.string(),
    role: z.string(),
    quote: z.string(),
    image: z.string().url(),
})

export const testimonialFields: FieldConfig[] = [
    {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        validation: z.string().min(2, { message: "Name must be at least 2 characters" }),
    },
    {
        name: "role",
        label: "Role",
        type: "text",
        required: true,
        validation: z.string().min(2, { message: "Role must be at least 2 characters" }),
    },
    {
        name: "quote",
        label: "Quote",
        type: "textarea",
        required: true,
        validation: z.string().min(10, { message: "Quote must be at least 10 characters" }),
    },
    {
        name: "image",
        label: "Image URL",
        type: "text",
        required: true,
        validation: z.string().url({ message: "Invalid URL" }),
    },
]

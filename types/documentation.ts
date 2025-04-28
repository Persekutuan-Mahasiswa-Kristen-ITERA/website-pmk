import { z } from "zod"
import { BaseEntity } from "./common"
import { FieldConfig } from "@/components/crud/DataForm"

export interface Documentation extends BaseEntity {
    title: string
    description: string
    link: string
    imageUrl: string
}

export const documentationSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    link: z.string(),
    imageUrl: z.string(),
})

// Define the column configuration for the Documentation entity
export const documentationColumns = [
    { key: "title" as keyof Documentation, header: "Title", sortable: true },
    { key: "description" as keyof Documentation, header: "Description", sortable: true },
    { key: "link" as keyof Documentation, header: "Link", sortable: true },
    { key: "imageUrl" as keyof Documentation, header: "Image", sortable: true },
    { key: "createdAt" as keyof Documentation, header: "Date", sortable: true },
]

// Define the form fields configuration for the Documentation entity
export const documentationFields: FieldConfig[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
        validation: z.string().min(1, { message: "Title is required" }),
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        validation: z.string().min(1, { message: "Description is required" }),
    },
    {
        name: "link",
        label: "Link",
        type: "text",
        required: true,
        validation: z.string().url({ message: "Please enter a valid URL" }),
    },
    {
        name: "imageUrl",
        label: "Image URL",
        type: "text",
        required: true,
        validation: z.string().url({ message: "Please enter a valid image URL" }),
    },
    {
        name: "createdAt",
        label: "Date",
        type: "date",
        required: true,
        validation: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
    },
]

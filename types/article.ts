import { z } from "zod"
import { BaseEntity } from "./common"
import { FieldConfig } from "@/components/crud/DataForm"

export interface Article extends BaseEntity {
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    author: Author
    tags: string
    readTime: number
    imageUrl: string
}

export interface Author {
    name: string
    image: string
}

export const authorSchema = z.object({
    name: z.string().min(1),
    image: z.string().url(),
})

export const articleSchema = z.object({
    id: z.number().int(),
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().min(1),
    content: z.string().min(1),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    author: authorSchema,
    tags: z.string(),
    readTime: z.number().int().nonnegative(),
    imageUrl: z.string().url(),
})

// Define the column configuration for the Article entity
export const articleColumns = [
    { key: "title" as keyof Article, header: "Title", sortable: true },
    { key: "slug" as keyof Article, header: "Slug", sortable: true },
    { key: "excerpt" as keyof Article, header: "Excerpt", sortable: true },
    { key: "content" as keyof Article, header: "Content", sortable: false },
    {
        key: "date" as keyof Article,
        header: "Date",
        sortable: true,
        render: (value: string) => new Date(value).toLocaleDateString(),
    },
    { key: "author.name" as keyof Article, header: "Author", sortable: true },
    { key: "tags" as keyof Article, header: "Tags", sortable: true },
    { key: "readTime" as keyof Article, header: "Read Time (min)", sortable: true },
    { key: "imageUrl" as keyof Article, header: "Image URL", sortable: false },
]

// Define the form fields configuration for the Article entity
export const articleFields: FieldConfig[] = [
    {
        name: "title",
        label: "Judul",
        type: "text",
        required: true,
        validation: z.string().min(1, { message: "Title is required" }),
    },
    {
        name: "slug",
        label: "Slug (isi sembarang saja)",
        type: "text",
        required: true,
        validation: z.string().min(1, { message: "Slug is required" }),
    },
    {
        name: "excerpt",
        label: "Excerpt",
        type: "textarea",
        required: true,
        validation: z.string().min(1, { message: "Excerpt is required" }),
    },
    {
        name: "content",
        label: "Konten (Markdown)",
        type: "textarea",
        required: true,
        validation: z.string().min(1, { message: "Content is required" }),
    },
    {
        name: "date",
        label: "Tanggal",
        type: "date",
        required: true,
        validation: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
    },
    {
        name: "author.name",
        label: "Nama Penulis",
        type: "text",
        required: true,
        validation: z.string().min(1, { message: "Author name is required" }),
    },
    {
        name: "author.image",
        label: "Gambar Author",
        type: "text",
        required: true,
        validation: z.string().url({ message: "Invalid URL format" }),
    },
    {
        name: "tags",
        label: "Tags",
        type: "text",
        required: true,
        validation: z.string().optional(),
    },
    {
        name: "readTime",
        label: "Waktu Baca (menit)",
        type: "number",
        required: true,
        validation: z.number().int().nonnegative({ message: "Read time must be a non-negative integer" }),
    },
    {
        name: "imageUrl",
        label: "Gambar URL",
        type: "text",
        required: true,
        validation: z.string().url({ message: "Invalid URL format" }),
    },
]

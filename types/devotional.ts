import { z } from 'zod';
import { BaseEntity } from './common';
import { FieldConfig } from '@/components/crud/DataForm';

export interface Devotional extends BaseEntity {
    title: string
    verse: string
    preview: string
    content: string
    date: string
    author: string
    category: string
}

export const devotionalSchema = z.object({
    id: z.number(),
    title: z.string(),
    verse: z.string(),
    preview: z.string(),
    content: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
});

// Define the column configuration for the Devotional entity
export const devotionalColumns = [
    { key: 'title' as keyof Devotional, header: 'Title', sortable: true },
    { key: 'verse' as keyof Devotional, header: 'Verse', sortable: true },
    { key: 'preview' as keyof Devotional, header: 'Preview', sortable: true },
    { key: 'content' as keyof Devotional, header: 'Content', sortable: true },
    { key: 'date' as keyof Devotional, header: 'Date', sortable: true },
    { key: 'author' as keyof Devotional, header: 'Author', sortable: true },
    { key: 'category' as keyof Devotional, header: 'Category', sortable: true },
];

// Define the form fields configuration for the Devotional entity
export const devotionalConfig: FieldConfig[] = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        validation: z.string().min(1, { message: "Title is required" })
    },
    {
        name: 'verse',
        label: 'Verse',
        type: 'text',
        required: true,
        validation: z.string().min(1, { message: "Verse is required" })
    },
    {
        name: 'preview',
        label: 'Preview',
        type: 'text',
        required: true,
        validation: z.string().min(1, { message: "Preview is required" })
    },
    {
        name: 'content',
        label: 'Content',
        type: 'textarea',
        required: true,
        validation: z.string().min(1, { message: "Content is required" })
    },
    {
        name: 'date',
        label: 'Date',
        type: 'date',
        required: true,
        validation: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date" })
    },
    {
        name: 'author',
        label: 'Author',
        type: 'text',
        required: true,
        validation: z.string().min(1, { message: "Author is required" })
    },
    {
        name: 'category',
        label: 'Category',
        type: 'text',
        required: true,
        validation: z.string().min(1, { message: "Category is required" })
    }
];
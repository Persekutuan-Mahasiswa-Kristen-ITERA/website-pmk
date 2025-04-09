import { z } from 'zod';
import { BaseEntity } from './common';
import Image from 'next/image';
import { FieldConfig } from '@/components/crud/DataForm';

export interface Management extends BaseEntity {
    name: string
    position: string
    department: string
    image: string
    description: string
}

export const managementSchema = z.object({
    id: z.number(),
    name: z.string(),
    position: z.string(),
    department: z.string(),
    image: z.string().url(),
    description: z.string(),
});

// Define the column configuration for the Management entity
const managementColumns = [
    { key: 'name' as keyof Management, header: 'Name', sortable: true },
    { key: 'position' as keyof Management, header: 'Position', sortable: true },
    { key: 'department' as keyof Management, header: 'Department', sortable: true },
    { 
      key: 'image' as keyof Management, 
      header: 'Image', 
      render: (value: string) => (
        <Image src={value} alt="Management" style={{ width: '50px', height: '50px' }} />
      )
    },
    { key: 'description' as keyof Management, header: 'Description', sortable: true },
    { 
      key: 'createdAt' as keyof Management, 
      header: 'Created',
      render: (value: Date) => value ? new Date(value).toLocaleDateString() : ''
    },
];

// Define the form fields configuration for the Management entity
export const managementFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    validation: z.string().min(2, { message: "Name must be at least 2 characters" })
  },
  {
    name: 'position',
    label: 'Position',
    type: 'text',
    required: true,
    validation: z.string().min(2, { message: "Position must be at least 2 characters" })
  },
  {
    name: 'department',
    label: 'Department',
    type: 'text',
    required: true,
    validation: z.string().min(2, { message: "Department must be at least 2 characters" })
  },
  {
    name: 'image',
    label: 'Image URL',
    type: 'text',
    required: true,
    validation: z.string().url({ message: "Invalid image URL" })
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: true,
    validation: z.string().min(10, { message: "Description must be at least 10 characters" })
  }
];
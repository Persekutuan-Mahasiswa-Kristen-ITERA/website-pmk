/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react"
import { BaseEntity } from "@/types/common"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export type FieldType = "text" | "number" | "date" | "boolean" | "select" | "textarea"

export interface FieldConfig {
    name: string
    label: string
    type: FieldType
    required?: boolean
    options?: { label: string; value: string }[]
    validation?: z.ZodTypeAny // For custom Zod validation
    hidden?: boolean // For fields like id that shouldn't be displayed
}

interface DataFormProps<T extends BaseEntity> {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => Promise<void>
    item?: T | null // If provided, we're in edit mode
    fields: FieldConfig[]
    title: string
}

function DataForm<T extends BaseEntity>({ isOpen, onClose, onSubmit, item, fields, title }: DataFormProps<T>) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Dynamically generate Zod schema based on fields
    const generateSchema = () => {
        const schemaMap: Record<string, any> = {}

        fields.forEach((field) => {
            if (field.hidden) return

            // Use provided custom validation or generate default validation
            if (field.validation) {
                schemaMap[field.name] = field.validation
                return
            }

            let baseValidation

            switch (field.type) {
                case "text":
                    baseValidation = z.string().trim()
                    break
                case "number":
                    baseValidation = z.number()
                    break
                case "date":
                    baseValidation = z.string().refine((val) => !isNaN(Date.parse(val)), {
                        message: "Invalid date format",
                    })
                    break
                case "boolean":
                    baseValidation = z.boolean().optional()
                    break
                case "select":
                    baseValidation = z.string().trim()
                    break
                default:
                    baseValidation = z.string().optional()
            }

            if (field.required) {
                if (field.type === "text" || field.type === "select") {
                    if (baseValidation instanceof z.ZodString) {
                        schemaMap[field.name] = baseValidation.min(1, { message: `${field.label} is required` })
                    } else {
                        schemaMap[field.name] = baseValidation
                    }
                } else {
                    schemaMap[field.name] = baseValidation
                }
            } else {
                if (field.type === "number") {
                    schemaMap[field.name] = z.number().optional()
                } else if (field.type === "boolean") {
                    schemaMap[field.name] = z.boolean().optional()
                } else {
                    schemaMap[field.name] = baseValidation.optional()
                }
            }
        })

        return z.object(schemaMap)
    }

    const schema = generateSchema()

    const generateDefaultValues = useCallback(() => {
        const defaultValues: Record<string, any> = {}

        fields.forEach((field) => {
            if (item && Object.prototype.hasOwnProperty.call(item, field.name)) {
                // Handle date fields - convert to string format for input
                if (field.type === "date" && item[field.name as keyof T] instanceof Date) {
                    const date = item[field.name as keyof T] as unknown as Date
                    defaultValues[field.name] = date.toISOString().split("T")[0]
                } else {
                    defaultValues[field.name] = item[field.name as keyof T]
                }
            } else {
                // Set default values for new items
                switch (field.type) {
                    case "boolean":
                        defaultValues[field.name] = false
                        break
                    case "number":
                        defaultValues[field.name] = 0
                        break
                    case "date":
                        defaultValues[field.name] = new Date().toISOString().split("T")[0]
                        break
                    case "text":
                    case "textarea":
                    case "select":
                        defaultValues[field.name] = ""
                        break
                }
            }
        })

        return defaultValues
    }, [fields, item])

    const form = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: generateDefaultValues(),
    })

    useEffect(() => {
        if (isOpen) {
            // Reset form with new values when dialog opens or item changes
            form.reset(generateDefaultValues())
        }
    }, [isOpen, item, form, generateDefaultValues])

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)

        try {
            // Convert string dates to Date objects
            fields.forEach((field) => {
                if (field.type === "date" && data[field.name]) {
                    data[field.name] = new Date(data[field.name])
                }

                // Convert string numbers to actual numbers
                if (field.type === "number" && typeof data[field.name] === "string") {
                    data[field.name] = Number(data[field.name])
                }
            })

            await onSubmit(data)
            onClose()
        } catch (error) {
            console.error("Form submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderField = (field: FieldConfig) => {
        if (field.hidden) {
            return null
        }

        return (
            <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                    <FormItem className="mb-4">
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                            <div>
                                {(field.type === "text" || field.type === "textarea") && <Input {...formField} />}

                                {field.type === "number" && (
                                    <Input
                                        type="number"
                                        {...formField}
                                        onChange={(e) => formField.onChange(Number(e.target.value))}
                                    />
                                )}

                                {field.type === "date" && <Input type="date" {...formField} />}

                                {field.type === "boolean" && (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox checked={formField.value} onCheckedChange={formField.onChange} />
                                    </div>
                                )}

                                {field.type === "select" && field.options && (
                                    <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={isSubmitting ? undefined : onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="space-y-2">{fields.map(renderField)}</div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default DataForm

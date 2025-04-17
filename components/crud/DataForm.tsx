/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useMemo } from "react"
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

export type FieldType = "text" | "number" | "date" | "boolean" | "select" | "textarea" | "string-array"

export interface FieldConfig {
    name: string
    label: string
    type: FieldType
    required?: boolean
    options?: { label: string; value: string }[]
    validation?: z.ZodTypeAny // For custom Zod validation
    hidden?: boolean // For fields like id that shouldn't be displayed
    arrayItemLabel?: string // Label for array items (used when type is "string-array")
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
    const [stringArrays, setStringArrays] = useState<Record<string, string[]>>({})
    const [arrayInputs, setArrayInputs] = useState<Record<string, string>>({})

    // Memoize the schema generation
    const schema = useMemo(() => {
        const schemaMap: Record<string, any> = {}

        fields.forEach((field) => {
            if (field.hidden) return

            const fieldParts = field.name.split(".")
            let currentSchema = schemaMap

            for (let i = 0; i < fieldParts.length - 1; i++) {
                const part = fieldParts[i]
                if (!currentSchema[part]) {
                    currentSchema[part] = z.object({})
                }
                currentSchema = currentSchema[part].shape || currentSchema[part]
            }

            const fieldName = fieldParts[fieldParts.length - 1]

            if (field.validation) {
                currentSchema[fieldName] = field.validation
                return
            }

            let baseValidation

            switch (field.type) {
                case "text":
                case "textarea":
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

            if (field.required && field.type !== "string-array") {
                if (field.type === "text" || field.type === "select" || field.type === "textarea") {
                    if (baseValidation instanceof z.ZodString) {
                        currentSchema[fieldName] = baseValidation.min(1, { message: `${field.label} is required` })
                    } else {
                        currentSchema[fieldName] = baseValidation
                    }
                } else {
                    currentSchema[fieldName] = baseValidation
                }
            } else {
                if (field.type === "number") {
                    currentSchema[fieldName] = z.number().optional()
                } else if (field.type === "boolean") {
                    currentSchema[fieldName] = z.boolean().optional()
                } else if (field.type === "string-array") {
                    currentSchema[fieldName] = z.array(z.string().trim()).optional()
                } else {
                    currentSchema[fieldName] = baseValidation.optional()
                }
            }
        })

        return z.object(schemaMap)
    }, [fields])

    const getNestedValue = (obj: any, path: string) => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj)
    }

    const setNestedValue = (obj: any, path: string, value: any) => {
        const parts = path.split(".")
        const last = parts.pop()
        let current = obj

        for (const part of parts) {
            if (!current[part]) {
                current[part] = {}
            }
            current = current[part]
        }

        if (last) {
            current[last] = value
        }
    }

    // Memoize the default values generation
    const defaultValues = useMemo(() => {
        const values: Record<string, any> = {}
        const initialArrays: Record<string, string[]> = {}

        fields.forEach((field) => {
            if (field.type === "string-array") {
                const value = item ? getNestedValue(item, field.name) || [] : []
                initialArrays[field.name] = Array.isArray(value) ? value : []
                return
            }

            if (item && getNestedValue(item, field.name) !== undefined) {
                const value = getNestedValue(item, field.name)

                if (field.type === "date" && value instanceof Date) {
                    setNestedValue(values, field.name, value.toISOString().split("T")[0])
                } else {
                    setNestedValue(values, field.name, value)
                }
            } else {
                switch (field.type) {
                    case "boolean":
                        setNestedValue(values, field.name, false)
                        break
                    case "number":
                        setNestedValue(values, field.name, 0)
                        break
                    case "date":
                        setNestedValue(values, field.name, new Date().toISOString().split("T")[0])
                        break
                    case "text":
                    case "textarea":
                    case "select":
                        setNestedValue(values, field.name, "")
                        break
                }
            }
        })

        setStringArrays(initialArrays)
        return values
    }, [fields, item])

    const form = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    useEffect(() => {
        if (isOpen) {
            form.reset(defaultValues)
        }
    }, [isOpen, defaultValues, form])

    const handleAddToArray = (fieldName: string) => {
        const currentInput = arrayInputs[fieldName] || ""
        if (!currentInput.trim()) return

        const newArray = [...(stringArrays[fieldName] || []), currentInput.trim()]

        setStringArrays((prev) => ({
            ...prev,
            [fieldName]: newArray,
        }))

        setArrayInputs((prev) => ({ ...prev, [fieldName]: "" }))

        // Update the form value
        form.setValue(fieldName, newArray)

        // Trigger validation
        form.trigger(fieldName)
    }

    const handleRemoveFromArray = (fieldName: string, index: number) => {
        const newArray = [...(stringArrays[fieldName] || [])]
        newArray.splice(index, 1)

        setStringArrays((prev) => ({ ...prev, [fieldName]: newArray }))

        // Update the form value
        form.setValue(fieldName, newArray)

        // Trigger validation
        form.trigger(fieldName)
    }

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)

        try {
            // Process all fields before submission
            fields.forEach((field) => {
                if (field.type === "date" && getNestedValue(data, field.name)) {
                    setNestedValue(data, field.name, new Date(getNestedValue(data, field.name)))
                }

                // Convert string numbers to actual numbers
                if (field.type === "number") {
                    const value = getNestedValue(data, field.name)
                    if (typeof value === "string") {
                        setNestedValue(data, field.name, Number(value))
                    }
                }

                // Ensure string arrays are properly set
                if (field.type === "string-array") {
                    setNestedValue(data, field.name, stringArrays[field.name] || [])
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
                    <FormItem className="mb-4 font-sans">
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
            <DialogContent className="sm:max-w-[500px] h-10/12 overflow-scroll bg-white font-sans">
                <DialogHeader>
                    <DialogTitle>
                        <span className="font-bold text-lg">{title}</span>
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="space-y-2">{fields.map(renderField)}</div>

                        <DialogFooter className="flex gap-2 w-full">
                            <Button
                                type="button"
                                className="grow"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="grow" disabled={isSubmitting}>
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

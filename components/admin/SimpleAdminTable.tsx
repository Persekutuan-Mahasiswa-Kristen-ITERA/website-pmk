import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Edit3, Trash2, Save, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"
import { useApiCrud } from "@/hooks/use-api-crud"
import Image from "next/image"

interface Field {
    key: string
    label: string
    type: "text" | "textarea" | "date" | "number" | "image"
    required?: boolean
}

interface SimpleAdminTableProps<T extends { id: string }> {
    title: string
    endpoint: string
    fields: Field[]
    displayFields: (keyof T)[]
    imageFields?: (keyof T)[] // Fields that contain image URLs
    formatValue?: (key: keyof T, value: unknown) => React.ReactNode
}

export function SimpleAdminTable<T extends { id: string }>({
    title,
    endpoint,
    fields,
    displayFields,
    imageFields = [],
    formatValue,
}: SimpleAdminTableProps<T>) {
    const { data, loading, pagination, fetchData, createItem, updateItem, deleteItem } = useApiCrud<T>(endpoint)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [formData, setFormData] = useState<Record<string, unknown>>({})

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleEdit = (item: T) => {
        setEditingId(item.id)
        setFormData(item as Record<string, unknown>)
        setIsCreating(false)
    }

    const handleCreate = () => {
        setIsCreating(true)
        setEditingId(null)
        const defaultData: Record<string, unknown> = {}
        fields.forEach((field) => {
            defaultData[field.key] = field.type === "date" ? new Date().toISOString().split("T")[0] : ""
        })
        setFormData(defaultData)
    }

    const handleSave = async () => {
        try {
            if (isCreating) {
                await createItem(formData as Omit<T, "id">)
            } else if (editingId) {
                await updateItem(editingId, formData as Partial<T>)
            }
            setEditingId(null)
            setIsCreating(false)
            setFormData({})
        } catch (error) {
            // Error is handled in the hook
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setIsCreating(false)
        setFormData({})
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            await deleteItem(id)
        }
    }

    const handleInputChange = (key: string, value: unknown) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const renderField = (field: Field, value: unknown, onChange: (value: unknown) => void) => {
        const inputProps = {
            value: String(value || ""),
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
            className: "w-full",
        }

        switch (field.type) {
            case "textarea":
                return <Textarea {...inputProps} rows={3} />
            case "date": {
                let dateValue = ""
                if (value) {
                    let d: Date
                    if (typeof value === "number") {
                        d = new Date(value > 100000000000 ? value : value * 1000)
                    } else if (typeof value === "string" && !isNaN(Number(value))) {
                        d = new Date(Number(value) > 100000000000 ? Number(value) : Number(value) * 1000)
                    } else {
                        d = new Date(value as string)
                    }
                    if (!isNaN(d.getTime())) {
                        dateValue = d.toISOString().split("T")[0]
                    }
                }
                return <Input {...inputProps} value={dateValue} type="date" />
            }
            case "number":
                return <Input {...inputProps} type="number" />
            case "image":
                return (
                    <div className="space-y-2">
                        <Input {...inputProps} type="url" placeholder="Enter image URL" />
                        {!!value && typeof value === "string" && value.trim() && (
                            <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                                <Image
                                    src={value}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    onError={() => {
                                        // Handle error silently
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )
            default:
                return <Input {...inputProps} type="text" />
        }
    }

    const renderValue = (key: keyof T, value: unknown): React.ReactNode => {
        // Check if this field is an image field
        if (imageFields.includes(key) && value && typeof value === "string" && value.trim()) {
            return (
                <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 border rounded-md overflow-hidden">
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                            onError={() => {
                                // Handle error silently
                            }}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{String(value)}</div>
                        <div className="text-xs text-muted-foreground">Image URL</div>
                    </div>
                </div>
            )
        }

        if (formatValue) {
            return formatValue(key, value)
        }

        if (typeof value === "string" && value.length > 100) {
            return value.substring(0, 100) + "..."
        }

        return String(value || "")
    }

    const handlePageChange = (newPage: number) => {
        if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
            fetchData(newPage)
        }
    }

    return (
        <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <Button onClick={handleCreate} disabled={isCreating || editingId !== null}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Create Form */}
                    {isCreating && (
                        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-700">
                            <CardHeader>
                                <CardTitle className="text-lg">Create New {title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {fields.map((field) => (
                                        <div key={field.key} className="space-y-2">
                                            <Label htmlFor={field.key}>
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </Label>
                                            {renderField(field, formData[field.key], (value) =>
                                                handleInputChange(field.key, value)
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleSave} disabled={loading}>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Data List */}
                    {loading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : (
                        <div className="space-y-4">
                            {data.map((item) => (
                                <Card
                                    key={item.id}
                                    className={
                                        editingId === item.id
                                            ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-700"
                                            : "bg-white dark:bg-slate-800"
                                    }
                                >
                                    <CardContent className="pt-6">
                                        {editingId === item.id ? (
                                            // Edit Form
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {fields.map((field) => (
                                                        <div key={field.key} className="space-y-2">
                                                            <Label htmlFor={`edit-${field.key}`}>
                                                                {field.label}
                                                                {field.required && (
                                                                    <span className="text-red-500 ml-1">*</span>
                                                                )}
                                                            </Label>
                                                            {renderField(field, formData[field.key], (value) =>
                                                                handleInputChange(field.key, value)
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2 pt-4">
                                                    <Button onClick={handleSave} disabled={loading}>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Save
                                                    </Button>
                                                    <Button variant="outline" onClick={handleCancel}>
                                                        <X className="h-4 w-4 mr-2" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Display Data
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {displayFields.map((key) => (
                                                        <div key={String(key)} className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-600">
                                                                {fields.find((f) => f.key === key)?.label ||
                                                                    String(key)}
                                                            </Label>
                                                            <div className="text-sm">{renderValue(key, item[key])}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Separator />
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(item)}
                                                        disabled={editingId !== null || isCreating}
                                                    >
                                                        <Edit3 className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(item.id)}
                                                        disabled={editingId !== null || isCreating}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <Card className="bg-white dark:bg-slate-800">
                                    <CardContent className="py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-600">
                                                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                                                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                                                {pagination.total} items
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(pagination.page - 1)}
                                                    disabled={pagination.page <= 1}
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Button>
                                                <Badge variant="secondary">
                                                    {pagination.page} / {pagination.totalPages}
                                                </Badge>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(pagination.page + 1)}
                                                    disabled={pagination.page >= pagination.totalPages}
                                                >
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

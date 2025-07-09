import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"

interface Field {
    name: string
    label: string
    type: "text" | "number" | "date" | "textarea" | "select" | "image"
    options?: { value: string; label: string }[]
}

interface CrudTableProps<T> {
    title: string
    data: T[]
    fields: Field[]
    onAdd: (data: Partial<T>) => void
    onEdit: (id: string, data: Partial<T>) => void
    onDelete: (id: string) => void
    getItemId: (item: T) => string
}

export function CrudTable<T>({ title, data, fields, onAdd, onEdit, onDelete, getItemId }: CrudTableProps<T>) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<T | null>(null)
    const [formData, setFormData] = useState<Partial<T>>({})

    const handleAdd = () => {
        setFormData({})
        setIsAddDialogOpen(true)
    }

    const handleEdit = (item: T) => {
        setSelectedItem(item)
        setFormData(item)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (item: T) => {
        setSelectedItem(item)
        setIsDeleteDialogOpen(true)
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmitAdd = () => {
        onAdd(formData)
        setIsAddDialogOpen(false)
    }

    const handleSubmitEdit = () => {
        if (selectedItem) {
            onEdit(getItemId(selectedItem), formData)
        }
        setIsEditDialogOpen(false)
    }

    const handleSubmitDelete = () => {
        if (selectedItem) {
            onDelete(getItemId(selectedItem))
        }
        setIsDeleteDialogOpen(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brown-800">{title}</h2>
                <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Baru
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {fields.map((field) => (
                            <TableHead key={field.name}>{field.label}</TableHead>
                        ))}
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={getItemId(item)}>
                            {fields.map((field) => (
                                <TableCell key={field.name}>
                                    {field.type === "image" ? (
                                        item[field.name as keyof T] ? (
                                            <Image
                                                src={item[field.name as keyof T] as string}
                                                alt={`${field.name} | PMK ITERA`}
                                                className="h-10 w-10 object-cover rounded-md"
                                                width={40}
                                                height={40}
                                            />
                                        ) : (
                                            "No image"
                                        )
                                    ) : (
                                        String(item[field.name as keyof T] || "")
                                    )}
                                </TableCell>
                            ))}
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Add Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah {title}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label htmlFor={field.name} className="text-sm font-medium">
                                    {field.label}
                                </label>
                                {field.type === "textarea" ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={(formData[field.name as keyof T] as string) || ""}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border rounded-md"
                                        rows={4}
                                    />
                                ) : field.type === "select" ? (
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={(formData[field.name as keyof T] as string) || ""}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">Select...</option>
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        value={(formData[field.name as keyof T] as string) || ""}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                                className="mr-2"
                            >
                                Batal
                            </Button>
                            <Button type="button" onClick={handleSubmitAdd}>
                                Simpan
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit {title}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label htmlFor={`edit-${field.name}`} className="text-sm font-medium">
                                    {field.label}
                                </label>
                                {field.type === "textarea" ? (
                                    <textarea
                                        id={`edit-${field.name}`}
                                        name={field.name}
                                        value={(formData[field.name as keyof T] as string) || ""}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border rounded-md"
                                        rows={4}
                                    />
                                ) : field.type === "select" ? (
                                    <select
                                        id={`edit-${field.name}`}
                                        name={field.name}
                                        value={(formData[field.name as keyof T] as string) || ""}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">Select...</option>
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={`edit-${field.name}`}
                                        name={field.name}
                                        type={field.type}
                                        value={(formData[field.name as keyof T] as string) || ""}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                                className="mr-2"
                            >
                                Batal
                            </Button>
                            <Button type="button" onClick={handleSubmitEdit}>
                                Simpan
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus {title}</DialogTitle>
                    </DialogHeader>
                    <p>Apakah Anda yakin ingin menghapus item ini?</p>
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="mr-2"
                        >
                            Batal
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleSubmitDelete}>
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

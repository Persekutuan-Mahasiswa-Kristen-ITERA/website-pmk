/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react"
import { BaseEntity, CrudConfig } from "@/types/common"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import DataForm, { FieldConfig } from "./DataForm"
import { useCrud } from "@/hooks/use-crud"
import DataTable from "./DataTable"
import DeleteConfirmation from "./DeleteConfirmation"

export interface CrudProviderProps<T extends BaseEntity> {
    config: CrudConfig<T>
    fields: FieldConfig[]
    columns: {
        key: keyof T
        header: string
        sortable?: boolean
        render?: (value: any, item: T) => React.ReactNode
    }[]
    entityName: string
}

function CrudProvider<T extends BaseEntity>({ config, fields, columns, entityName }: CrudProviderProps<T>) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const {
        items,
        loading,
        pagination,
        sort,
        selectedItem,
        fetchItems,
        changePage,
        changePageSize,
        changeSort,
        createItem,
        updateItem,
        deleteItem,
        selectItem,
    } = useCrud<T>(config)

    useEffect(() => {
        fetchItems()
    }, [])

    const handleCreate = () => {
        selectItem(null)
        setIsFormOpen(true)
    }

    const handleEdit = (item: T) => {
        selectItem(item)
        setIsFormOpen(true)
    }

    const handleDelete = (item: T) => {
        selectItem(item)
        setIsDeleteDialogOpen(true)
    }

    const handleFormSubmit = async (data: any) => {
        if (selectedItem) {
            await updateItem(selectedItem.id, data)
        } else {
            await createItem(data)
        }
    }

    const handleConfirmDelete = async () => {
        if (selectedItem) {
            await deleteItem(selectedItem.id)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Button onClick={handleCreate} variant="default">
                    <Plus className="mr-2 h-4 w-4" />
                    {entityName} Baru
                </Button>
            </div>

            <DataTable<T>
                data={items}
                columns={columns}
                isLoading={loading}
                totalItems={pagination.total}
                pageSize={pagination.pageSize}
                currentPage={pagination.page}
                sortConfig={sort}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={changePage}
                onPageSizeChange={changePageSize}
                onSortChange={changeSort}
            />

            <DataForm<T>
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                item={selectedItem}
                fields={fields}
                title={selectedItem ? `Edit ${entityName}` : `Buat ${entityName} Baru`}
            />

            <DeleteConfirmation
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title={`Hapus ${entityName}`}
                description={`Yakin ingin menghapus ${entityName.toLowerCase()}?`}
            />
        </div>
    )
}

export default CrudProvider

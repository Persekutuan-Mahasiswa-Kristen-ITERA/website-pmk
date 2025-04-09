/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react"
import { toast } from "sonner"
import { BaseEntity, PaginationState, SortOption, CrudConfig } from "@/types/common"
import { FirebaseService } from "@/services/firebase-service"

export function useCrud<T extends BaseEntity>(config: CrudConfig<T>) {
    const [items, setItems] = useState<T[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [selectedItem, setSelectedItem] = useState<T | null>(null)
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        pageSize: config.defaultPageSize || 10,
        total: 0,
    })
    const [sort, setSort] = useState<SortOption<T> | undefined>(config.defaultSort)
    const [lastDoc, setLastDoc] = useState<any>(null)

    const service = useMemo(() => new FirebaseService<T>(config.collection), [config.collection])

    const fetchItems = useCallback(async () => {
        setLoading(true)
        try {
            const response = await service.getAll(sort, {
                page: 1,
                pageSize: pagination.pageSize,
                total: 0,
            })

            setItems(response.items)
            setLastDoc(response.lastDoc)

            // Get total count
            const total = await service.getCount()
            setPagination({
                ...pagination,
                page: 1,
                total,
            })

            setError(null)
        } catch (err: any) {
            setError(err)
            toast.error(`Error loading data: ${err.message}`)
            console.error("Error fetching items:", err)
        } finally {
            setLoading(false)
            console.log("Items fetched:", items)
        }
    }, [sort, pagination])

    const fetchNextPage = useCallback(async () => {
        if (!lastDoc || items.length >= pagination.total) return

        setLoading(true)
        try {
            const response = await service.getNextPage(lastDoc, pagination.pageSize, sort)

            setItems([...items, ...response.items])
            setLastDoc(response.lastDoc)
            setPagination({
                ...pagination,
                page: pagination.page + 1,
            })

            setError(null)
        } catch (err: any) {
            setError(err)
            toast.error(`Error loading next page: ${err.message}`)
            console.error("Error fetching next page:", err)
        } finally {
            setLoading(false)
        }
    }, [service, lastDoc, pagination, items, sort])

    const fetchPreviousPage = useCallback(() => {
        if (pagination.page <= 1) return

        // Implement if needed - would require keeping track of previous page documents
        toast.info("Previous page functionality requires additional implementation")
    }, [pagination.page])

    const changePage = useCallback(
        (page: number) => {
            if (page === pagination.page) return

            if (page > pagination.page) {
                fetchNextPage()
            } else {
                fetchPreviousPage()
            }
        },
        [pagination.page, fetchNextPage, fetchPreviousPage]
    )

    const changePageSize = useCallback(
        (newSize: number) => {
            setPagination({
                ...pagination,
                pageSize: newSize,
            })
        },
        [pagination]
    )

    const changeSort = useCallback((newSort: SortOption<T>) => {
        setSort(newSort)
    }, [])

    const createItem = useCallback(
        async (data: Omit<T, "id">) => {
            setLoading(true)
            try {
                const created = await service.create(data)
                setItems([created, ...items])
                setPagination({
                    ...pagination,
                    total: pagination.total + 1,
                })
                toast.success("Item created successfully")
                return created
            } catch (err: any) {
                setError(err)
                toast.error(`Error creating item: ${err.message}`)
                console.error("Error creating item:", err)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [service, items, pagination]
    )

    const updateItem = useCallback(
        async (id: string, data: Partial<T>) => {
            setLoading(true)
            try {
                const updated = await service.update(id, data)
                setItems(items.map((item) => (item.id === id ? updated : item)))
                toast.success("Item updated successfully")
                return updated
            } catch (err: any) {
                setError(err)
                toast.error(`Error updating item: ${err.message}`)
                console.error("Error updating item:", err)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [service, items]
    )

    const deleteItem = useCallback(
        async (id: string) => {
            setLoading(true)
            try {
                await service.delete(id)
                setItems(items.filter((item) => item.id !== id))
                setPagination({
                    ...pagination,
                    total: pagination.total - 1,
                })
                toast.success("Item deleted successfully")
            } catch (err: any) {
                setError(err)
                toast.error(`Error deleting item: ${err.message}`)
                console.error("Error deleting item:", err)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [service, items, pagination]
    )

    const selectItem = useCallback((item: T | null) => {
        setSelectedItem(item)
    }, [])

    const refreshData = useCallback(() => {
        fetchItems()
    }, [fetchItems])

    return {
        items,
        loading,
        error,
        pagination,
        sort,
        selectedItem,
        fetchItems,
        fetchNextPage,
        fetchPreviousPage,
        changePage,
        changePageSize,
        changeSort,
        createItem,
        updateItem,
        deleteItem,
        selectItem,
        refreshData,
    }
}

import { useState, useCallback } from "react"
import { toast } from "sonner"

interface PaginationInfo {
    page: number
    limit: number
    total: number
    totalPages: number
}

interface UseApiCrudResult<T> {
    data: T[]
    loading: boolean
    pagination: PaginationInfo | null
    fetchData: (page?: number, limit?: number, sort?: string, order?: "asc" | "desc") => Promise<void>
    createItem: (item: Omit<T, "id">) => Promise<T>
    updateItem: (id: string, item: Partial<T>) => Promise<T>
    deleteItem: (id: string) => Promise<void>
    refreshData: () => Promise<void>
}

export function useApiCrud<T extends { id: string }>(endpoint: string): UseApiCrudResult<T> {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState<PaginationInfo | null>(null)
    const [currentParams, setCurrentParams] = useState<{
        page: number
        limit: number
        sort?: string
        order?: "asc" | "desc"
    }>({ page: 1, limit: 10 })

    const fetchData = useCallback(
        async (page = 1, limit = 10, sort = "createdAt", order: "asc" | "desc" = "desc") => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    sort,
                    order,
                })

                const response = await fetch(`/api/admin/${endpoint}?${params}`)
                const result = await response.json()

                if (result.success) {
                    setData(result.data)
                    setPagination(result.pagination)
                    setCurrentParams({ page, limit, sort, order })
                } else {
                    toast.error(result.error || "Failed to fetch data")
                }
            } catch (error) {
                console.error("Error fetching data:", error)
                toast.error("Failed to fetch data")
            } finally {
                setLoading(false)
            }
        },
        [endpoint]
    )

    const createItem = useCallback(
        async (item: Omit<T, "id">): Promise<T> => {
            setLoading(true)
            try {
                const response = await fetch(`/api/admin/${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item),
                })

                const result = await response.json()

                if (result.success) {
                    toast.success("Item created successfully")
                    await fetchData(currentParams.page, currentParams.limit, currentParams.sort, currentParams.order)
                    return result.data
                } else {
                    throw new Error(result.error || "Failed to create item")
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to create item"
                toast.error(message)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [endpoint, fetchData, currentParams]
    )

    const updateItem = useCallback(
        async (id: string, item: Partial<T>): Promise<T> => {
            setLoading(true)
            try {
                const response = await fetch(`/api/admin/${endpoint}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item),
                })

                const result = await response.json()

                if (result.success) {
                    toast.success("Item updated successfully")
                    await fetchData(currentParams.page, currentParams.limit, currentParams.sort, currentParams.order)
                    return result.data
                } else {
                    throw new Error(result.error || "Failed to update item")
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to update item"
                toast.error(message)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [endpoint, fetchData, currentParams]
    )

    const deleteItem = useCallback(
        async (id: string): Promise<void> => {
            setLoading(true)
            try {
                const response = await fetch(`/api/admin/${endpoint}/${id}`, {
                    method: "DELETE",
                })

                const result = await response.json()

                if (result.success) {
                    toast.success("Item deleted successfully")
                    await fetchData(currentParams.page, currentParams.limit, currentParams.sort, currentParams.order)
                } else {
                    throw new Error(result.error || "Failed to delete item")
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to delete item"
                toast.error(message)
                throw error
            } finally {
                setLoading(false)
            }
        },
        [endpoint, fetchData, currentParams]
    )

    const refreshData = useCallback(() => {
        return fetchData(currentParams.page, currentParams.limit, currentParams.sort, currentParams.order)
    }, [fetchData, currentParams])

    return {
        data,
        loading,
        pagination,
        fetchData,
        createItem,
        updateItem,
        deleteItem,
        refreshData,
    }
}

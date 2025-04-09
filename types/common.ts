// Base interface for all entities
export interface BaseEntity {
    id: string
    createdAt?: Date
    updatedAt?: Date
}

// Type for sorting options
export type SortDirection = "asc" | "desc"

export interface SortOption<T> {
    field: keyof T
    direction: SortDirection
}

// Type for pagination options
export interface PaginationState {
    page: number
    pageSize: number
    total: number
}

// Type for CRUD provider configuration
export interface CrudConfig<T extends BaseEntity> {
    collection: string
    defaultSort?: SortOption<T>
    defaultPageSize?: number
}

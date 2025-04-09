/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react"
import { BaseEntity, SortOption } from "@/types/common"



interface Column<T> {
    key: keyof T
    header: string
    sortable?: boolean
    render?: (value: any, item: T) => React.ReactNode
}

interface DataTableProps<T extends BaseEntity> {
    data: T[]
    columns: Column<T>[]
    isLoading: boolean
    totalItems: number
    pageSize: number
    currentPage: number
    sortConfig?: SortOption<T>
    onRowClick?: (item: T) => void
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
    onSortChange: (sortOption: SortOption<T>) => void
}

function DataTable<T extends BaseEntity>({
    data,
    columns,
    isLoading,
    totalItems,
    pageSize,
    currentPage,
    sortConfig,
    onRowClick,
    onEdit,
    onDelete,
    onPageChange,
    onPageSizeChange,
    onSortChange,
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredData, setFilteredData] = useState<T[]>(data)

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredData(data)
            return
        }

        const filtered = data.filter((item) => {
            return Object.keys(item).some((key) => {
                const value = (item as any)[key]
                if (value === null || value === undefined) return false
                return String(value).toLowerCase().includes(searchTerm.toLowerCase())
            })
        })

        setFilteredData(filtered)
    }, [data, searchTerm])

    const handleSort = (columnKey: keyof T) => {
        if (!sortConfig || sortConfig.field !== columnKey) {
            onSortChange({
                field: columnKey,
                direction: "asc",
            })
        } else {
            onSortChange({
                field: columnKey,
                direction: sortConfig.direction === "asc" ? "desc" : "asc",
            })
        }
    }

    const getSortIcon = (columnKey: keyof T) => {
        if (!sortConfig || sortConfig.field !== columnKey) {
            return null
        }

        return sortConfig.direction === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" />
        ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
        )
    }

    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        className="max-w-sm"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={String(pageSize)} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={String(column.key)}
                                    className={column.sortable ? "cursor-pointer" : ""}
                                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                                >
                                    <div className="flex items-center">
                                        {column.header}
                                        {column.sortable && getSortIcon(column.key)}
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className={onRowClick ? "cursor-pointer" : ""}
                                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={`${item.id}-${String(column.key)}`}>
                                            {column.render
                                                ? column.render((item as any)[column.key], item)
                                                : (item as any)[column.key]?.toString() || ""}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {onEdit && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onEdit(item)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onDelete(item)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} of{" "}
                    {totalItems}
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const page = i + 1
                            return (
                                <PaginationItem key={page}>
                                    <Button
                                        variant={page === currentPage ? "default" : "outline"}
                                        size="icon"
                                        onClick={() => onPageChange(page)}
                                    >
                                        {page}
                                    </Button>
                                </PaginationItem>
                            )
                        })}
                        {totalPages > 5 && (
                            <PaginationItem>
                                <Button variant="outline" size="icon" disabled>
                                    ...
                                </Button>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(currentPage + 1)}
                                className={
                                    currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default DataTable

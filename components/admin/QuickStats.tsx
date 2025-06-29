import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Plus } from "lucide-react"

interface QuickStatsProps {
    title: string
    description: string
    count: number
    href: string
    items?: { id: string; title: string; status?: string }[]
}

export function QuickStats({ title, description, count, href, items = [] }: QuickStatsProps) {
    return (
        <Card className="bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <Badge variant="secondary">{count}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Recent items preview */}
                {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                        <span className="text-sm truncate">{item.title}</span>
                        {item.status && (
                            <Badge variant="outline" className="text-xs">
                                {item.status}
                            </Badge>
                        )}
                    </div>
                ))}

                {items.length === 0 && <p className="text-sm text-muted-foreground">No items yet</p>}

                <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link href={href}>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View All
                        </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                        <Link href={href}>
                            <Plus className="h-3 w-3 mr-1" />
                            Add New
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

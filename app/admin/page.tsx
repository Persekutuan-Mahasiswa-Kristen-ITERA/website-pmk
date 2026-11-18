"use client"

import React, { useEffect, useState } from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, ImageIcon, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const DashboardCard = ({
    title,
    count,
    icon: Icon,
    href,
}: {
    title: string
    count: number | null
    icon: React.ElementType
    href: string
}) => (
    <Card className="bg-white dark:bg-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{count ?? "–"}</div>
            <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                <Link href={href}>Lihat {title}</Link>
            </Button>
        </CardContent>
    </Card>
)

// Each card shows the real number of items in its collection. A card is only
// shown when the signed-in role may open that menu (the API answers 403 otherwise).
const SECTIONS = [
    { title: "Renungan", api: "devotionals", icon: BookOpen, href: "/admin/devotional/simple" },
    { title: "Artikel", api: "articles", icon: FileText, href: "/admin/article/simple" },
    { title: "Dokumentasi", api: "documentation", icon: ImageIcon, href: "/admin/documentation/simple" },
    { title: "Event", api: "events", icon: Calendar, href: "/admin/event/simple" },
]

type Stat = (typeof SECTIONS)[number] & { count: number | null }

const Dashboard = () => {
    const [stats, setStats] = useState<Stat[] | null>(null)

    useEffect(() => {
        let cancelled = false
        Promise.all(
            SECTIONS.map(async (section) => {
                try {
                    const res = await fetch(`/api/admin/${section.api}?page=1&limit=1`, { cache: "no-store" })
                    if (res.status === 401 || res.status === 403) return null
                    const body = await res.json()
                    return { ...section, count: typeof body?.pagination?.total === "number" ? body.pagination.total : null }
                } catch {
                    return { ...section, count: null }
                }
            })
        ).then((rows) => {
            if (!cancelled) setStats(rows.filter((r): r is Stat => r !== null))
        })
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brown-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Selamat datang di panel admin PMK ITERA.</p>
            </div>

            {stats === null ? (
                <p className="text-gray-600">Memuat ringkasan…</p>
            ) : stats.length === 0 ? (
                <p className="text-gray-600">Belum ada menu konten untuk peranmu.</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <DashboardCard
                        key={stat.title}
                        title={stat.title}
                        count={stat.count}
                        icon={stat.icon}
                        href={stat.href}
                    />
                ))}
            </div>
            )}
        </AdminLayout>
    )
}

export default Dashboard

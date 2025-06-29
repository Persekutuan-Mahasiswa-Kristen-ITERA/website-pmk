import React from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, FileText, ImageIcon, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const DashboardCard = ({
    title,
    count,
    icon: Icon,
    href,
}: {
    title: string
    count: number
    icon: React.ElementType
    href: string
}) => (
    <Card className="bg-white dark:bg-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                <Link href={href}>Lihat {title}</Link>
            </Button>
        </CardContent>
    </Card>
)

const Dashboard = () => {
    // In a real app, this data would come from an API
    const stats = [
        { title: "Pengurus", count: 12, icon: Users, href: "/admin/management" },
        { title: "Renungan", count: 24, icon: BookOpen, href: "/admin/devotional/simple" },
        { title: "Artikel", count: 18, icon: FileText, href: "/admin/article/simple" },
        { title: "Dokumentasi", count: 45, icon: ImageIcon, href: "/admin/documentation/simple" },
        { title: "Event", count: 8, icon: CreditCard, href: "/admin/event/simple" },
    ]

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brown-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Selamat datang di panel admin PMK ITERA.</p>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">✨ Simplified CMS</h3>
                    <p className="text-sm text-blue-700">
                        Enjoy the new streamlined admin interface with inline editing, better design, and faster
                        performance using firebase-admin.
                    </p>
                </div>
            </div>

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
        </AdminLayout>
    )
}

export default Dashboard

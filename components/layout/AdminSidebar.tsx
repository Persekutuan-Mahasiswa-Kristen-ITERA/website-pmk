'use client'

import Link from "next/link"
import { FileText, Users, BookOpen, ImageIcon, CreditCard, Home, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Pengurus", path: "/admin/pengurus", icon: Users },
    { name: "Renungan", path: "/admin/renungan", icon: BookOpen },
    { name: "Artikel", path: "/admin/artikel", icon: FileText },
    { name: "Dokumentasi", path: "/admin/dokumentasi", icon: ImageIcon },
    { name: "Persembahan", path: "/admin/persembahan", icon: CreditCard },
    { name: "Pengaturan", path: "/admin/settings", icon: Settings },
]

export const Sidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="bg-white border-r w-64 min-h-screen hidden md:block">
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-brown-800">Admin Panel</h2>
            </div>
            <nav className="p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.path

                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                                isActive
                                    ? "bg-brown-100 text-brown-800 font-medium"
                                    : "text-gray-600 hover:bg-brown-50 hover:text-brown-800"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

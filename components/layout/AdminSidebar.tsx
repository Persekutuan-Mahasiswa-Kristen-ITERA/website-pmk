"use client"

import Link from "next/link"
import { FileText, BookOpen, ImageIcon, CreditCard, Home, Calendar, LogOut, History } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

/** `role`: the PI-CORE website role that shows the item (admin sees everything). No role = everyone. */
const NAV_ITEMS = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Renungan", path: "/admin/devotional/simple", icon: BookOpen, role: "renungan" },
    { name: "Event", path: "/admin/event/simple", icon: Calendar, role: "acara" },
    { name: "Artikel", path: "/admin/article/simple", icon: FileText, role: "artikel" },
    { name: "Dokumentasi", path: "/admin/documentation/simple", icon: ImageIcon, role: "dokumentasi" },
    { name: "Persembahan", path: "/admin/contribution", icon: CreditCard, role: "admin" },
    { name: "Riwayat", path: "/admin/history", icon: History, role: "admin" },
]

interface SidebarProps {
    onLogout: () => void
    user: { email: string; name: string; roles: string[] }
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, user }) => {
    const pathname = usePathname()
    const isAdmin = user.roles.includes("admin")
    const items = NAV_ITEMS.filter((item) => !item.role || isAdmin || user.roles.includes(item.role))

    return (
        <aside className="bg-brown-700 border-r w-64 min-h-screen hidden md:flex md:flex-col">
            <div className="p-8 border-b flex gap-2">
                <Image src="/logo-128.png" alt="logo" width={24} height={24} />
                <p className="text-xl font-bold text-white">Admin Panel</p>
            </div>
            <nav className="p-4 space-y-2 flex flex-col flex-1">
                <div className="flex-1">
                    {items.map((item) => {
                        const isActive = pathname === item.path

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                                    isActive
                                        ? "bg-white text-brown-800 font-medium"
                                        : "text-brown-50 hover:bg-brown-50 hover:text-brown-800"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Logout Button */}
                <div className="pt-4 border-t border-brown-600">
                    <p className="px-3 pb-2 text-xs text-brown-100 break-all">{user.email}</p>
                    <Button
                        onClick={onLogout}
                        variant="ghost"
                        className="w-full justify-start text-brown-50 hover:bg-brown-50 hover:text-brown-800"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Keluar
                    </Button>
                </div>
            </nav>
        </aside>
    )
}

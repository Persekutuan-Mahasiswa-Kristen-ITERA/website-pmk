"use client"

import Link from "next/link"
import { FileText, Users, BookOpen, ImageIcon, CreditCard, Home, Settings, Book, Calendar, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
    { name: "Dashboard", path: "/admin", icon: Home },
    // { name: "Pengurus", path: "/admin/management", icon: Users },
    { name: "Renungan", path: "/admin/devotional", icon: BookOpen },
    { name: "Event", path: "/admin/event", icon: Calendar },
    { name: "Artikel", path: "/admin/article", icon: FileText },
    { name: "Dokumentasi", path: "/admin/documentation", icon: ImageIcon },
    { name: "Persembahan", path: "/admin/contribution", icon: CreditCard },
    { name: "Pengaturan", path: "/admin/settings", icon: Settings },
]

interface SidebarProps {
    onLogout: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
    const pathname = usePathname()

    return (
        <aside className="bg-brown-700 border-r w-64 min-h-screen hidden md:block">
            <div className="p-8 border-b flex gap-2">
                <Image src="/logo-128.png" alt="logo" width={24} height={24} />
                <p className="text-xl font-bold text-white">Admin Panel</p>
            </div>
            <nav className="p-4 space-y-2 flex flex-col h-full">
                <div className="flex-1">
                    {NAV_ITEMS.map((item) => {
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

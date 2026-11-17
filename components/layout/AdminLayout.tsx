"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "./AdminSidebar"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export type AdminUser = { email: string; name: string; roles: string[] }

interface AdminLayoutProps {
    children: React.ReactNode
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/admin/logout", {
                method: "POST",
            })

            if (response.ok) {
                toast({
                    title: "Berhasil keluar",
                    description: "Anda telah keluar dari admin panel",
                })
                router.push("/admin/login")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Terjadi kesalahan saat keluar",
                variant: "destructive",
            })
        }
    }

    // Who is signed in and which menus they have (roles from PI-CORE, D-16).
    const [user, setUser] = useState<AdminUser | null>(null)
    useEffect(() => {
        let cancelled = false
        fetch("/api/admin/me")
            .then((r) => r.json())
            .then((data) => {
                if (cancelled) return
                if (data.user) setUser(data.user)
                else router.replace(data.access ? `/admin/login?access=${encodeURIComponent(data.access)}` : "/admin/login")
            })
            .catch(() => router.replace("/admin/login"))
        return () => {
            cancelled = true
        }
    }, [router])

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">Memuat…</div>
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 font-sans">
                <Sidebar onLogout={handleLogout} user={user} />
                <main className="flex-1 p-12 bg-[url(/img/bg-pattern.jpg)] bg-repeat bg-[length:25%] bg-blend-lighten bg-opacity-80">
                    {children}
                </main>
            </div>
        </div>
    )
}

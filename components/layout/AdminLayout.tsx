"use client"

import { Navbar } from "./Navbar"
import { Sidebar } from "./AdminSidebar"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AdminLayoutProps {
    children: React.ReactNode
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/admin/auth", {
                method: "DELETE",
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

    const { isAdmin, loading } = { isAdmin: true, loading: false } // Mocked data for demonstration

    // Show loading state
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 font-sans">
                <Sidebar onLogout={handleLogout} />
                <main className="flex-1 p-12 bg-[url(/img/bg-pattern.jpg)] bg-repeat bg-[length:25%] bg-blend-lighten bg-opacity-80">
                    {children}
                </main>
            </div>
        </div>
    )
}

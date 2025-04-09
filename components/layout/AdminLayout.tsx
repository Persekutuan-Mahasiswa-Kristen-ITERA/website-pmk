"use client"

import { Navbar } from "./Navbar"
import { Sidebar } from "./AdminSidebar"
import { useAuth } from "@/contexts/AuthContext"

interface AdminLayoutProps {
    children: React.ReactNode
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    // const { currentUser, isAdmin, loading } = useAuth()
    const { isAdmin, loading } = { isAdmin: true, loading: false } // Mocked data for demonstration

    // Show loading state
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    // Redirect if not logged in or not admin
    // if (!currentUser || !isAdmin) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
    //         </div>
    //     )
    // }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 font-sans">
                <Sidebar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}

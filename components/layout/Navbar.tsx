"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogIn } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import Image from "next/image"

const NAV_ITEMS = [
    { name: "Beranda", path: "/" },
    { name: "Profil", path: "/profile" },
    { name: "Kegiatan", path: "/event" },
    // { name: "Pengurus", path: "/management" },
    { name: "Renungan", path: "/devotional" },
    { name: "Artikel", path: "/article" },
    { name: "Dokumentasi", path: "/documentation" },
    { name: "Persembahan", path: "/contribution" },
]

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const isMobile = useIsMobile()

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolled])

    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen, isMobile])

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-white/90 shadow-md backdrop-blur" : "bg-white/90"
            }`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                        <div className="text-brown-800 font-bold text-xl flex gap-4 place-items-center font-serif">
                            <Image src="/logo-128.png" alt="PMK ITERA" className="w-8 h-8" width={128} height={128} />
                            PMK ITERA
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`transition-colors duration-200 text-sm font-medium hover:text-brown-800 ${
                                    pathname === item.path ? "text-brown-800 font-semibold" : "text-brown-600"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* <ModeToggle /> */}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            className="p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6 text-brown-800" />
                            ) : (
                                <Menu className="h-6 w-6 text-brown-800" />
                            )}
                        </Button>
                    </div>
                </div>{" "}
                {/* Mobile Navigation Overlay */}
                {isOpen && (
                    <div
                        className="md:hidden fixed inset-0 top-[72px] z-40 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                )}
                {/* Mobile Navigation Sidebar */}
                <div
                    className={`md:hidden fixed top-[72px] right-0 h-[calc(100vh-72px)] w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-brown-100">
                            <div className="flex items-center">
                                <Image
                                    src="/logo-128.png"
                                    alt="PMK ITERA"
                                    className="w-6 h-6 mr-2"
                                    width={128}
                                    height={128}
                                />
                                <span className="text-brown-800 font-bold text-lg font-serif">Menu</span>
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 text-base ${
                                            pathname === item.path
                                                ? "text-brown-800 font-semibold bg-brown-100 border-l-4 border-brown-600"
                                                : "text-brown-600 hover:text-brown-800 hover:bg-brown-50"
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

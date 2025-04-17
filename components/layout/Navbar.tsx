"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogIn } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ModeToggle } from "../ui/mode-toggle"

const NAV_ITEMS = [
    { name: "Beranda", path: "/" },
    { name: "Profil", path: "/profile" },
    { name: "Pengurus", path: "/management" },
    { name: "Renungan", path: "/devotional" },
    { name: "Artikel", path: "/article" },
    { name: "Persembahan", path: "/contribution" },
    { name: "Dokumentasi", path: "/documentation" },
]

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const isMobile = useIsMobile()
    const [isLoggedIn, setIsLoggedIn] = useState(false) // Replace with real auth state

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

                    {/* Auth Buttons - Desktop */}
                    {/* <div className="hidden md:flex items-center space-x-3">
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="rounded-full p-2">
                                        <User className="h-5 w-5 text-brown-700" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link href="/profilee" className="w-full">
                                            Profil
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/admin" className="w-full">
                                            Admin Panel
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Keluar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                onClick={() => setIsLoggedIn(true)}
                                variant="outline"
                                className="border-brown-300 text-brown-800 hover:bg-brown-100"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Masuk
                            </Button>
                        )}
                    </div> */}

                    <ModeToggle />

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
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden absolute top-[72px] left-0 right-0 min-h-screen overflow-hidden bg-white z-50 animate-fade-in">
                        <div className="flex flex-col px-4 pt-2 pb-6 space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`p-3 transition-colors duration-200 text-base ${
                                        pathname === item.path
                                            ? "text-brown-800 font-semibold bg-brown-50 rounded-md"
                                            : "text-brown-600"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {/* <div className="pt-4 border-t border-brown-100 mt-4">
                                {isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/profilee"
                                            className="block p-3 text-brown-700"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Profil
                                        </Link>
                                        <Link
                                            href="/admin"
                                            className="block p-3 text-brown-700"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Admin Panel
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                setIsLoggedIn(false)
                                                setIsOpen(false)
                                            }}
                                            variant="ghost"
                                            className="w-full justify-start p-3 hover:bg-brown-50 text-brown-700"
                                        >
                                            Keluar
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            setIsLoggedIn(true)
                                            setIsOpen(false)
                                        }}
                                        className="w-full bg-brown-700 hover:bg-brown-800 text-white"
                                    >
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Masuk
                                    </Button>
                                )}
                            </div> */}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

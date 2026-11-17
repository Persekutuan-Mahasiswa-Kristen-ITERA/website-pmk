"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { createPicoreBrowserClient } from "@/lib/picore/client"
import { PICORE_URL } from "@/lib/picore/config"
import { ACCESS_MESSAGES, accessReason } from "@/lib/auth/messages"

// Same wording whether the email or the password is wrong (does not reveal which accounts exist).
const SAFE_LOGIN_ERROR = "Email atau kata sandi salah."

/** Log in with a PI-CORE account (password here, or Google through PI-CORE). */
export function LoginForm({ initialError, signOutFirst }: { initialError?: string; signOutFirst?: boolean }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(initialError ?? "")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    // Signed in to PI-CORE but without website access: end that session here so the next try starts clean.
    useEffect(() => {
        if (signOutFirst) void fetch("/api/admin/logout", { method: "POST" })
    }, [signOutFirst])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const supabase = createPicoreBrowserClient()
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
            if (signInError) {
                setError(SAFE_LOGIN_ERROR)
                return
            }
            const me = await fetch("/api/admin/me").then((r) => r.json())
            if (!me.user) {
                await supabase.auth.signOut({ scope: "local" })
                setError(ACCESS_MESSAGES[accessReason(me.access)])
                return
            }
            toast({ title: "Berhasil masuk", description: "Selamat datang di admin panel PMK ITERA" })
            router.push("/admin")
            router.refresh()
        } catch {
            setError("Terjadi kesalahan saat masuk")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-brown-50 to-brown-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Image src="/logo-128.png" alt="PMK ITERA" width={64} height={64} className="w-16 h-16" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-brown-800">Admin Login</CardTitle>
                    <p className="text-brown-600">Masuk dengan akun PI-CORE Anda</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brown-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="email akun PI-CORE"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brown-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full bg-brown-700 hover:bg-brown-800" disabled={isLoading}>
                            {isLoading ? "Memproses..." : "Masuk"}
                        </Button>
                    </form>
                    <div className="my-5 flex items-center gap-3 text-xs text-brown-500" aria-hidden="true">
                        <span className="h-px flex-1 bg-brown-200" />
                        atau
                        <span className="h-px flex-1 bg-brown-200" />
                    </div>
                    {/* A Route Handler that redirects to PI-CORE: needs a full page load, not <Link>. */}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/auth/google"
                        className="flex w-full items-center justify-center gap-3 rounded-md border border-brown-300 bg-white py-2.5 text-sm font-semibold text-brown-800 shadow-sm transition-colors hover:bg-brown-50"
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                        </svg>
                        Masuk dengan Google
                    </a>
                    <p className="mt-4 text-center text-xs leading-relaxed text-brown-600">
                        Akun dan kata sandi dikelola di PI-CORE.{" "}
                        <a href={PICORE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                            Lupa kata sandi atau belum punya akun?
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}


"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, CreditCard, Gift, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const BankAccount = ({
    bank,
    accountNumber,
    accountName,
}: {
    bank: string
    accountNumber: string
    accountName: string
}) => {
    const { toast } = useToast()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountNumber)
        toast({
            title: "Berhasil disalin!",
            description: `Nomor rekening ${bank} telah disalin ke clipboard`,
        })
    }

    return (
        <div className="flex justify-between items-center p-4 border border-brown-200 rounded-md mb-3">
            <div>
                <p className="font-medium text-brown-800">{bank}</p>
                <p className="text-brown-700">{accountNumber}</p>
                <p className="text-sm text-brown-600">a.n. {accountName}</p>
            </div>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="border-brown-200">
                <Copy className="h-4 w-4 mr-2" />
                Salin
            </Button>
        </div>
    )
}

const Persembahan = () => {
    const [donationAmount, setDonationAmount] = useState<number | "">("")
    const [customAmount, setCustomAmount] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const { toast } = useToast()

    const handleSetAmount = (amount: number) => {
        setDonationAmount(amount)
        setCustomAmount(amount.toString())
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^\d*$/.test(value)) {
            setCustomAmount(value)
            setDonationAmount(value === "" ? "" : parseInt(value))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!donationAmount || donationAmount < 10000) {
            toast({
                title: "Nominal tidak valid",
                description: "Minimal persembahan adalah Rp 10.000",
                variant: "destructive",
            })
            return
        }

        if (!name || !email) {
            toast({
                title: "Data tidak lengkap",
                description: "Mohon isi nama dan email Anda",
                variant: "destructive",
            })
            return
        }

        toast({
            title: "Terima kasih atas persembahan Anda!",
            description: "Silakan lakukan transfer ke rekening yang tersedia.",
        })

        // In a real app, this would submit to a backend or payment gateway
        console.log({ donationAmount, name, email, message })
    }

    return (
        <MainLayout>
            <div className="bg-brown-100">
                <div className="bg-[url('/img/bg-article.webp')] bg-cover bg-center py-20 relative">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
                    <div className="container relative mx-auto px-4 z-10">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">
                            Persembahan Kasih
                        </h1>
                        <p className="text-center text-brown-100 mt-4 max-w-2xl mx-auto">
                            Mari berkontribusi melalui persembahan Anda untuk mendukung kegiatan kami dan pelayanan kami
                        </p>
                    </div>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Form Persembahan */}
                            <Card className="h-fit">
                                <CardContent>
                                    <iframe
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSf7gkjjAJimRmXVIa6H1WbZ9Yj7GEUBynXeyxL5SjxMyL8zgw/viewform?embedded=true"
                                        width="640"
                                        height="500"
                                        className="w-full"
                                    >
                                        Loading…
                                    </iframe>
                                </CardContent>
                            </Card>

                            {/* Informasi Rekening */}
                            <div className="space-y-6 max-lg:-order-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-serif text-brown-800">
                                            Informasi Rekening
                                        </CardTitle>
                                        <CardDescription>
                                            Silakan transfer ke salah satu rekening berikut
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <BankAccount
                                            bank="Bank Mandiri"
                                            accountNumber="1090023596695"
                                            accountName="JELLY CRISTIN MANURU"
                                        />
                                        <BankAccount
                                            bank="Seabank"
                                            accountNumber="901683034565"
                                            accountName="Jelly Cristin Manurung"
                                        />
                                        <BankAccount
                                            bank="DANA"
                                            accountNumber="0895384120105"
                                            accountName="Jelly Cristin Manurung"
                                        />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl font-serif text-brown-800">
                                            Catatan Penting
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <FileText className="h-5 w-5 text-brown-600 mr-3 mt-1" />
                                                <div>
                                                    <ul className="text-sm text-brown-600 space-y-3">
                                                        <li className="flex items-start">
                                                            <span className="mr-2">•</span>
                                                            Setelah melakukan transfer, silakan konfirmasi dengan
                                                            mengirimkan bukti transfer ke nomor WhatsApp: +62
                                                            895-3841-20105 (Jelly Cristin Manurung)
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="mr-2">•</span>
                                                            Sertakan informasi nama dan tujuan persembahan pada saat
                                                            transfer atau pada pesan konfirmasi
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="mr-2">•</span>
                                                            Semua persembahan akan dikelola dengan transparan dan
                                                            dipertanggungjawabkan
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Persembahan

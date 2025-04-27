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

const DonationOption = ({
    title,
    description,
    amount,
    onClick,
}: {
    title: string
    description: string
    amount: number
    onClick: () => void
}) => (
    <Card
        className="border-brown-200 hover:border-brown-400 hover:shadow-sm transition-all cursor-pointer"
        onClick={onClick}
    >
        <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif text-brown-800">{title}</CardTitle>
            <CardDescription className="text-brown-600">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="pt-2">
            <p className="text-lg font-medium text-brown-700">Rp {amount.toLocaleString("id-ID")}</p>
        </CardFooter>
    </Card>
)

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
                    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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
                    <div className="max-w-4xl mx-auto">
                        <Card>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="mt-6">
                                                <Label htmlFor="custom-amount">Nominal Kustom</Label>
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-brown-700">Rp</span>
                                                    <Input
                                                        id="custom-amount"
                                                        value={customAmount}
                                                        onChange={handleCustomAmountChange}
                                                        className="border-brown-200"
                                                        placeholder="Masukkan nominal persembahan"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Nama</Label>
                                                    <Input
                                                        id="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="border-brown-200"
                                                        placeholder="Nama lengkap"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="border-brown-200"
                                                        placeholder="Email Anda"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">Pesan (Opsional)</Label>
                                                <Textarea
                                                    id="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    className="border-brown-200"
                                                    placeholder="Ucapan atau doa"
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full mt-8 bg-brown-700 hover:bg-brown-800">
                                        <Gift className="mr-2 h-4 w-4" />
                                        Berikan Persembahan
                                    </Button>
                                </form>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-brown-800 mb-3">Rekening PMK ITERA</h3>
                                        <BankAccount
                                            bank="Bank BCA"
                                            accountNumber="1234567890"
                                            accountName="PMK ITERA"
                                        />
                                        <BankAccount
                                            bank="Bank Mandiri"
                                            accountNumber="0987654321"
                                            accountName="PMK ITERA"
                                        />
                                        <BankAccount
                                            bank="Bank BRI"
                                            accountNumber="1357924680"
                                            accountName="PMK ITERA"
                                        />
                                    </div>

                                    <div className="bg-brown-50 p-4 rounded-md">
                                        <div className="flex items-start">
                                            <FileText className="h-5 w-5 text-brown-600 mr-3 mt-1" />
                                            <div>
                                                <h4 className="font-medium text-brown-800">Catatan Penting</h4>
                                                <ul className="text-sm text-brown-600 mt-2 space-y-2">
                                                    <li>
                                                        Setelah melakukan transfer, silakan konfirmasi dengan
                                                        mengirimkan bukti transfer ke nomor WhatsApp:{" "}
                                                        <span className="font-medium">+62 812-3456-7890</span>
                                                    </li>
                                                    <li>
                                                        Sertakan informasi nama dan tujuan persembahan pada saat
                                                        transfer atau pada pesan konfirmasi
                                                    </li>
                                                    <li>
                                                        Semua persembahan akan dikelola dengan transparan dan
                                                        dipertanggungjawabkan
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Persembahan

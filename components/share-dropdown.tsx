"use client"

import { Share, Check, Copy } from "lucide-react"
import React, { useState } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props = {
    message: string
    shareUrl: string
    classNameButton?: string
    classNameCard?: string
}

export default function ShareDropdown({ message, shareUrl, classNameButton, classNameCard }: Props) {
    const [isCopied, setIsCopied] = useState(false)

    const shareOnTwitter = () => {
        let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
        if (shareUrl) {
            url += `&url=${encodeURIComponent(shareUrl)}`
        }
        window.open(url, "_blank", "width=600,height=400")
    }

    const shareOnWhatsApp = () => {
        const text = message
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(url, "_blank")
    }

    const shareOnTelegram = () => {
        const text = message
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`
        window.open(url, "_blank")
    }

    const shareOnFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        window.open(url, "_blank", "width=600,height=400")
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="bg-white">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center text-brown-600 hover:text-brown-800 hover:bg-brown-50"
                    >
                        <Share className="h-3 w-3" />
                        <span className="text-xs">Bagikan</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-brown-500">
                    <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
                        <div className="flex items-center">
                            <Image
                                src="/icon/facebook.svg"
                                alt="Facebook"
                                width={16}
                                height={16}
                                className="w-4 h-4 mr-2"
                            />
                            <span>Facebook</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
                        <div className="flex items-center">
                            <Image
                                src="/icon/x.svg"
                                alt="Twitter"
                                width={16}
                                height={16}
                                className="w-4 h-4 mr-2"
                            ></Image>
                            <span>Twitter / X</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareOnWhatsApp} className="cursor-pointer">
                        <div className="flex items-center">
                            <Image
                                src="/icon/whatsapp.svg"
                                alt="WhatsApp"
                                width={16}
                                height={16}
                                className="w-4 h-4 mr-2"
                            ></Image>
                            <span>WhatsApp</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareOnTelegram} className="cursor-pointer">
                        <div className="flex items-center">
                            <Image
                                src="/icon/telegram.svg"
                                alt="Telegram"
                                width={16}
                                height={16}
                                className="w-4 h-4 mr-2"
                            ></Image>
                            <span>Telegram</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                        <div className="flex items-center">
                            {isCopied ? (
                                <Check className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                                <Copy className="h-4 w-4 mr-2" />
                            )}
                            <span>{isCopied ? "Disalin!" : "Salin Link"}</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

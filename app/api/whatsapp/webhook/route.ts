export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "node:crypto"
import { PhoneUtils } from "@/utils/phone-utils"
import { WhatsappWebhook } from "@/types/whatsapp"
import { getCommandFromMessage } from "./parser"
import { sendMessage } from "./sender"
import { uploadDevotional } from "./devotional"

const greetings = `Halo! Selamat datang di bot PMK ITERA. Silakan forward renungan harian ke chat ini dan renungan akan otomatis dipublikasikan di website.`
const notAllowed = `Maaf, nomor ini belum terdaftar sebagai pengurus yang boleh mempublikasikan renungan. Hubungi admin website PMK ITERA.`

/**
 * go-whatsapp-web-multidevice signs every webhook with HMAC-SHA256 of the raw
 * body, sent as "X-Hub-Signature-256: sha256=<hex>". The key is the gateway's
 * --webhook-secret, which must equal WHATSAPP_WEBHOOK_SECRET here.
 */
function hasValidSignature(rawBody: string, header: string | null, secret: string): boolean {
    if (!header?.startsWith("sha256=")) return false
    const received = Buffer.from(header.slice("sha256=".length), "hex")
    const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest()
    return received.length === expected.length && timingSafeEqual(received, expected)
}

/** Phone numbers allowed to publish, from WHATSAPP_ADMIN_PHONES (comma separated). */
function adminPhones(): string[] {
    return (process.env.WHATSAPP_ADMIN_PHONES || "")
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
}

/** "... in 62812xxxx:3@s.whatsapp.net" -> "62812xxxx" */
function senderNumber(from: string): string {
    const jid = PhoneUtils.getNumber(from) ?? from
    return jid.split("@")[0].split(":")[0]
}

export async function POST(request: NextRequest) {
    console.log("Received WhatsApp bot webhook request")

    const secret = process.env.WHATSAPP_WEBHOOK_SECRET
    if (!secret) {
        console.error("WHATSAPP_WEBHOOK_SECRET is not set; refusing webhook")
        return NextResponse.json({ success: false, error: "Webhook not configured" }, { status: 503 })
    }

    const rawBody = await request.text()
    if (!hasValidSignature(rawBody, request.headers.get("x-hub-signature-256"), secret)) {
        return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 401 })
    }

    let message: WhatsappWebhook
    try {
        message = JSON.parse(rawBody)
    } catch {
        return NextResponse.json({ success: false, error: "Invalid body" }, { status: 400 })
    }
    if (typeof message?.from !== "string" || typeof message?.message?.text !== "string") {
        // Not a text message (receipts, media, group events): nothing to do.
        return NextResponse.json({ success: true, message: "Ignored" })
    }

    const address = PhoneUtils.getNumber(message.from)
    const command = getCommandFromMessage(message.message.text)

    try {
        if (!command) {
            const result = await sendMessage(address, greetings)
            if (!result.ok) {
                console.error("Failed to send greeting message:", await result.text())
                return NextResponse.json({ success: false, error: "Failed to send greeting message" }, { status: 500 })
            }
            console.log("Greeting message sent successfully")
            return NextResponse.json({ success: true, message: "Greeting message sent" })
        }

        try {
            switch (command) {
                case "devotional": {
                    const sender = senderNumber(message.from)
                    if (!PhoneUtils.isAdminPhone(sender, adminPhones())) {
                        // Logged so an admin can add the exact value to WHATSAPP_ADMIN_PHONES.
                        console.warn(`Devotional upload refused for unlisted sender ${sender}`)
                        await sendMessage(address, notAllowed).catch((error) =>
                            console.error("Failed to send refusal message:", error)
                        )
                        // 200 so the gateway does not retry and resend the refusal.
                        return NextResponse.json({ success: false, error: "Sender not allowed" })
                    }
                    sendMessage(address, "Bentar ya, renungan lagi diproses...")
                    const uploadedDevotional = await uploadDevotional(message.message.text)

                    if (!uploadedDevotional) {
                        console.error("Failed to upload devotional")
                        return NextResponse.json(
                            { success: false, error: "Failed to upload devotional" },
                            { status: 500 }
                        )
                    }
                    const successMessage = `Renungan berhasil dipublikasikan di website!\n\n*${uploadedDevotional.title}*\n\nhttps://www.pmkitera.com/devotional/${uploadedDevotional.id}\nhttps://pmk.ukm.itera.ac.id/devotional/${uploadedDevotional.id}`
                    await sendMessage(address, successMessage)
                    break
                }
            }
        } catch (error) {
            console.error("Error processing command:", error)
            return NextResponse.json({ success: false, error: "Failed to process command" }, { status: 500 })
        }

        console.log("Webhook processed successfully")
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Webhook error:", error)
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}

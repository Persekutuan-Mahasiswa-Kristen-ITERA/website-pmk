export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { PhoneUtils } from "@/utils/phone-utils"
import { WhatsappWebhook } from "@/types/whatsapp"
import { getCommandFromMessage } from "./parser"
import { sendMessage } from "./sender"
import { uploadDevotional } from "./devotional"

const greetings = `Halo! Selamat datang di bot PMK ITERA. Silakan forward renungan harian ke chat ini dan renungan akan otomatis dipublikasikan di website.`

export async function POST(request: NextRequest) {
    console.log("Received WhatsApp bot webhook request")

    const message: WhatsappWebhook = await request.json()
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
                case "devotional":
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
